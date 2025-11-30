import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { memberService, messagesService, presenceService } from '../../services/api';
import { getChatSocket } from '../../services/chatSocket';
import type { Member } from '@a11yguard/shared';

interface ChatMessage {
  _id: string;
  userId: string;
  type: 'group' | 'dm';
  fromMemberId: string;
  toMemberId?: string;
  conversationId?: string;
  content: string;
  createdAt: string | Date;
  readBy?: string[];
}

type ChatTarget = { kind: 'group' } | { kind: 'dm'; peerMemberId: string };

const ChatPage: React.FC = () => {
  const { user } = useAuthStore();
  const selfMemberId = user?.memberId || '';

  const [members, setMembers] = useState<Member[]>([]);
  const [online, setOnline] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<ChatTarget>({ kind: 'group' });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionIndex, setMentionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [typingPeers, setTypingPeers] = useState<Set<string>>(new Set()); // memberIds typing in current view
  const [viewKey, setViewKey] = useState(0);

  const socket = useMemo(() => getChatSocket(), []);
  const listRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<any>(null);
  const selectedRef = useRef<ChatTarget>(selected);
  const loadIdRef = useRef(0);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initial data load (once)
  useEffect(() => {
    const init = async () => {
      const [membersRes, presenceRes] = await Promise.all([
        memberService.getMembersByUser(),
        presenceService.getOnline(),
      ]);
      setMembers(membersRes.members || []);
      setOnline(new Set(presenceRes.online || []));
    };
    init().catch(console.error);
  }, []);

  // Socket listeners (rebind when selection changes to update scoping)
  useEffect(() => {
    const onPresenceList = (payload: { online: string[] }) => {
      setOnline(new Set(payload.online || []));
    };
    const onPresenceOnline = (p: { memberId: string }) => setOnline((prev) => new Set(prev).add(p.memberId));
    const onPresenceOffline = (p: { memberId: string }) => {
      setOnline((prev) => {
        const next = new Set(prev);
        next.delete(p.memberId);
        return next;
      });
    };
    const onGroupNew = (payload: { message: ChatMessage }) => {
      setMessages((prev) => (selected.kind === 'group' ? [...prev, payload.message] : prev));
      if (selected.kind === 'group') scrollToBottom();
    };
    const onDmNew = (payload: { message: ChatMessage }) => {
      const m = payload.message;
      if (selected.kind === 'dm') {
        if (m.type === 'dm' && (m.fromMemberId === selected.peerMemberId || m.toMemberId === selected.peerMemberId)) {
          setMessages((prev) => [...prev, m]);
          scrollToBottom();
        }
      }
    };

    const onTyping = (payload: { room: 'group' | 'dm'; memberId: string; typing: boolean; peerMemberId?: string }) => {
      setTypingPeers((prev) => {
        const next = new Set(prev);
        const inCurrentGroup = selected.kind === 'group' && payload.room === 'group';
        const inCurrentDm = selected.kind === 'dm' && payload.room === 'dm' && payload.peerMemberId === selected.peerMemberId;
        if (inCurrentGroup || inCurrentDm) {
          if (payload.typing) next.add(payload.memberId);
          else next.delete(payload.memberId);
        }
        return next;
      });
    };

    socket.on('presence:list', onPresenceList);
    socket.on('presence:online', onPresenceOnline);
    socket.on('presence:offline', onPresenceOffline);
    socket.on('group:new', onGroupNew);
    socket.on('dm:new', onDmNew);
    socket.on('typing', onTyping);
    socket.on('dm:read', (payload: { readerMemberId: string; lastCreatedAt: string; peerMemberId?: string }) => {
      // When peer reads my messages up to lastCreatedAt, mark them read locally
      const readerId = payload.readerMemberId;
      const cutoff = new Date(payload.lastCreatedAt).getTime();
      if (selected.kind === 'dm' && readerId === selected.peerMemberId) {
        setMessages((prev) =>
          prev.map((m) => {
            if (m.fromMemberId === selfMemberId && new Date(m.createdAt).getTime() <= cutoff) {
              const rb = m.readBy || [];
              if (!rb.includes(readerId)) return { ...m, readBy: [...rb, readerId] };
            }
            return m;
          })
        );
      }
    });

    return () => {
      socket.off('presence:list', onPresenceList);
      socket.off('presence:online', onPresenceOnline);
      socket.off('presence:offline', onPresenceOffline);
      socket.off('group:new', onGroupNew);
      socket.off('dm:new', onDmNew);
      socket.off('typing', onTyping);
      socket.off('dm:read');
      // do not disconnect globally (other pages may reuse), just remove listeners
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, selected.kind, (selected as any).peerMemberId]);

  // Keep a ref of current selection to avoid race conditions with async loads
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    // load messages when selection changes
    const load = async () => {
      setTypingPeers(new Set());
      setMessages([]); // immediate clear to avoid flicker
      setIsLoading(true);
      setHasMore(true);
      setViewKey((k) => k + 1); // force remount of list for clean switch
      const myLoadId = ++loadIdRef.current;
      if (selected.kind === 'group') {
        const res = await messagesService.getGroupMessages({ limit: 50 });
        if (loadIdRef.current === myLoadId) {
          setMessages((res.messages || []).reverse());
          setHasMore((res.messages || []).length >= 50);
        }
      } else {
        const res = await messagesService.getDmMessages(selected.peerMemberId, { limit: 50 });
        if (loadIdRef.current === myLoadId) {
          setMessages((res.messages || []).reverse());
          setHasMore((res.messages || []).length >= 50);
          // mark as read for messages sent to me
          const lastIncoming = [...(res.messages || [])]
            .filter((m: any) => m.toMemberId === selfMemberId)
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
          if (lastIncoming) {
            socket.emit('dm:read', { peerMemberId: selected.peerMemberId, lastCreatedAt: lastIncoming.createdAt });
          }
        }
      }
      scrollToBottom();
      setIsLoading(false);
    };
    load().catch((e) => {
      console.error(e);
      setMessages([]);
      setIsLoading(false);
    });
  }, [selected]);

  const handleSend = () => {
    const content = input.trim();
    if (!content) return;
    if (selected.kind === 'group') {
      socket.emit('group:send', { content });
    } else {
      socket.emit('dm:send', { toMemberId: selected.peerMemberId, content });
    }
    setInput('');
    setShowMentions(false);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // typing indicator
    if (selected.kind === 'group') {
      socket.emit('typing:start', { room: 'group' });
    } else {
      socket.emit('typing:start', { room: 'dm', peerMemberId: (selected as any).peerMemberId });
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (selected.kind === 'group') socket.emit('typing:stop', { room: 'group' });
      else socket.emit('typing:stop', { room: 'dm', peerMemberId: (selected as any).peerMemberId });
    }, 1200);

    if (selected.kind !== 'group') {
      setShowMentions(false);
      return;
    }
    const at = value.lastIndexOf('@');
    if (at >= 0) {
      if (at === 0 || /\s/.test(value[at - 1] || ' ')) {
        const rest = value.slice(at + 1);
        const space = rest.search(/\s/);
        const query = space === -1 ? rest : rest.slice(0, space);
        setMentionQuery(query);
        setShowMentions(true);
        return;
      }
    }
    setShowMentions(false);
  };

  const filteredMentions = members
    .filter((m) => m.memberId && m.memberId !== selfMemberId)
    .filter((m) =>
      mentionQuery.trim() === ''
        ? true
        : m.name.toLowerCase().includes(mentionQuery.toLowerCase())
    )
    .slice(0, 8);

  const pickMention = (m: Member) => {
    const at = input.lastIndexOf('@');
    if (at < 0) return;
    const rest = input.slice(at + 1);
    const space = rest.search(/\s/);
    const after = space === -1 ? '' : rest.slice(space);
    const before = input.slice(0, at);
    const inserted = `${before}@${m.name} ${after}`;
    setInput(inserted);
    setShowMentions(false);
  };

  const handleMentionNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showMentions || filteredMentions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setMentionIndex((i) => (i + 1) % filteredMentions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setMentionIndex((i) => (i - 1 + filteredMentions.length) % filteredMentions.length);
    } else if (e.key === 'Enter') {
      const m = filteredMentions[mentionIndex] || filteredMentions[0];
      if (m) {
        e.preventDefault();
        pickMention(m);
      }
    } else if (e.key === 'Escape') {
      setShowMentions(false);
    }
  };

  const onScrollList = async (e: React.UIEvent<HTMLDivElement>) => {
    if (!hasMore || isLoadingMore) return;
    const el = e.currentTarget;
    if (el.scrollTop < 60) {
      setIsLoadingMore(true);
      const earliest = messages[0]?.createdAt ? new Date(messages[0].createdAt).toISOString() : undefined;
      const prevHeight = el.scrollHeight;
      let older: any[] = [];
      if (selected.kind === 'group') {
        const res = await messagesService.getGroupMessages({ limit: 50, before: earliest });
        older = res.messages || [];
      } else {
        const res = await messagesService.getDmMessages(selected.peerMemberId, { limit: 50, before: earliest });
        older = res.messages || [];
      }
      if (older.length === 0) setHasMore(false);
      setMessages((prev) => [...older.reverse(), ...prev]);
      // maintain scroll position
      setTimeout(() => {
        const newHeight = el.scrollHeight;
        el.scrollTop = newHeight - prevHeight + el.scrollTop;
      }, 0);
      setIsLoadingMore(false);
    }
  };

  const renderMember = (m: Member) => {
    const isSelf = m.memberId === selfMemberId;
    const isOnline = online.has(m.memberId);
    return (
      <div
        key={m.memberId}
        onClick={() => {
          setSelected({ kind: 'dm', peerMemberId: m.memberId });
          setMessages([]);
          setIsLoading(true);
          setHasMore(true);
          setViewKey((k) => k + 1);
        }}
        className={`cursor-pointer px-3 py-2 rounded ${selected.kind === 'dm' && selected.peerMemberId === m.memberId ? 'bg-emerald-950' : 'hover:bg-emerald-950/60'}`}
      >
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-gray-600'}`} />
          <span className="text-sm">
            {m.name} {isSelf ? '(You)' : ''}
          </span>
        </div>
      </div>
    );
  };

  const selectedTitle = selected.kind === 'group' ? 'Group Chat' : `DM with ${members.find(m => m.memberId === selected.peerMemberId)?.name || selected.peerMemberId}`;

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = (d: Date) => d.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });

  const renderContentWithMentions = (text: string) => {
    // highlight @Name for any member
    const names = members.map((m) => m.name).sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (names.length === 0) return <span>{text}</span>;
    const pattern = new RegExp(`@(${names.join('|')})`, 'g');
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      const start = match.index;
      if (start > lastIndex) parts.push(<span key={lastIndex}>{text.slice(lastIndex, start)}</span>);
      parts.push(
        <span key={start} className="text-emerald-400 font-medium">@{match[1]}</span>
      );
      lastIndex = pattern.lastIndex;
    }
    if (lastIndex < text.length) parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    return <>{parts}</>;
  };

  return (
    <div className="flex h-[calc(100vh-64px)] mt-30 bg-[#0b1f17] text-gray-100">
      <aside className="w-72 border-r border-emerald-900/40 p-3 overflow-y-auto bg-[#0d261b]">
        <div className="mb-4">
          <div
            className={`cursor-pointer px-3 py-2 rounded ${selected.kind === 'group' ? 'bg-emerald-950' : 'hover:bg-emerald-950/60'}`}
            onClick={() => {
              setSelected({ kind: 'group' });
              setMessages([]);
              setIsLoading(true);
              setHasMore(true);
              setViewKey((k) => k + 1);
            }}
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-emerald-300">Group Chat</span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase text-emerald-400/80 mb-2">Members</div>
          <div className="space-y-1">
            {members
              .filter((m) => m.memberId && m.memberId !== selfMemberId)
              .map(renderMember)}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="border-b border-emerald-900/40 p-4 bg-[#0f2b1f]">
          <h2 className="font-semibold text-emerald-300">{selectedTitle}</h2>
          {typingPeers.size > 0 && (
            <div className="mt-1 text-xs text-emerald-400/80">
              {Array.from(typingPeers)
                .map((id) => members.find((m) => m.memberId === id)?.name || id)
                .join(', ')}{' '}
              is typing...
            </div>
          )}
        </header>

        <section key={viewKey} ref={listRef} onScroll={onScrollList} className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading && messages.length === 0 && (
            <div className="text-sm text-emerald-300/70">Loading messages...</div>
          )}
          {messages.map((m, idx) => {
            const mine = m.fromMemberId === selfMemberId;
            const current = new Date(m.createdAt);
            const prev = idx > 0 ? new Date(messages[idx - 1].createdAt) : null;
            const showDate = !prev || prev.toDateString() !== current.toDateString();
            return (
              <React.Fragment key={m._id}>
                {showDate && (
                  <div className="flex justify-center my-2">
                    <span className="text-xs text-emerald-300/70 bg-emerald-900/40 px-2 py-1 rounded-full">
                      {formatDate(current)}
                    </span>
                  </div>
                )}
                <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[72%] rounded px-3 py-2 border ${mine ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-[#10261d] text-gray-100 border-emerald-900/40'}`}>
                    <div className="text-xs opacity-70 mb-1">
                      {members.find((mm) => mm.memberId === m.fromMemberId)?.name || m.fromMemberId}
                    </div>
                    <div className="whitespace-pre-wrap break-words text-sm">
                      {selected.kind === 'group' ? renderContentWithMentions(m.content) : m.content}
                    </div>
                    <div className="text-xs mt-1 flex items-center gap-2 justify-end">
                      <span>{formatTime(current)}</span>
                      {selected.kind === 'dm' && mine && (
                        <span className={`inline-block text-lg font-bold ${m.readBy && m.readBy.includes((selected as any).peerMemberId) ? 'text-white' : 'text-emerald-400'}`}>
                          {m.readBy && m.readBy.includes((selected as any).peerMemberId) ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          <div ref={bottomRef} />
        </section>

        <footer className="border-t border-emerald-900/40 p-3 flex gap-2 bg-[#0f2b1f]">
          <div className="relative flex-1">
            <input
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (showMentions && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape')) {
                  handleMentionNav(e);
                  return;
                }
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message... (use @ to mention)"
              className="w-full bg-[#0b2018] border border-emerald-900/40 rounded px-3 py-2 outline-none"
            />
            {showMentions && selected.kind === 'group' && filteredMentions.length > 0 && (
              <div className="absolute bottom-full mb-2 left-0 w-full max-h-48 overflow-auto rounded border border-emerald-900/40 bg-[#0b2018] shadow-lg z-10">
                {filteredMentions.map((m, idx) => (
                  <div
                    key={m.memberId}
                    className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${idx === mentionIndex ? 'bg-emerald-900/50' : 'hover:bg-emerald-900/30'}`}
                    onClick={() => pickMention(m)}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full ${online.has(m.memberId) ? 'bg-emerald-500' : 'bg-gray-600'}`} />
                    <span className="text-sm">@{m.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleSend} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded">
            Send
          </button>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;
