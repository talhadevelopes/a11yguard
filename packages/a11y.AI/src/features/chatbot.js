function initializeChatbot() {
  console.log("Initializing Enhanced Chatbot feature...");

  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-message");
  const chatArea = document.getElementById("chat-area");
  const expertSelect = document.getElementById("expert-type");
  const charCount = document.getElementById("char-count");
  
  if (!chatInput || !sendButton || !chatArea || !expertSelect) {
    console.log("Chatbot elements not found, skipping initialization");
    return;
  }

  // Enhanced markdown-like formatting function
  function formatMessage(text) {
    // Remove welcome message when first real message is added
    const welcomeMsg = chatArea.querySelector('.welcome-message');
    if (welcomeMsg) {
      welcomeMsg.remove();
    }

    let formatted = text;
    
    // Format bold text (**text** or __text__)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Format italic text (*text* or _text_)
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Format links [text](url) or plain URLs
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    
    // Format code `code`
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Format line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Format Sources section specially
    formatted = formatted.replace(/Sources?:\s*/gi, '<div class="sources-section"><strong>Sources:</strong><br>');
    if (formatted.includes('<div class="sources-section">')) {
      formatted += '</div>';
    }
    
    return formatted;
  }

  function addMessage(text, isUser, isLoading = false) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", isUser ? "user-message" : "ai-message");
    
    if (isLoading) {
      messageContainer.classList.add("loading");
    }
    
    const message = document.createElement("div");
    message.classList.add("message-bubble");
    
    if (!isUser) {
      const avatar = document.createElement("div");
      avatar.classList.add("message-avatar");
      avatar.innerHTML = `
        <div class="ai-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
        </div>
      `;
      messageContainer.appendChild(avatar);
    }
    
    const content = document.createElement("div");
    content.classList.add("message-content");
    
    if (isLoading) {
      content.innerHTML = `
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
        <span>Analyzing page content...</span>
      `;
    } else {
      content.innerHTML = isUser ? text : formatMessage(text);
    }
    
    message.appendChild(content);
    messageContainer.appendChild(message);
    
    // Add timestamp
    const timestamp = document.createElement("div");
    timestamp.classList.add("message-timestamp");
    timestamp.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    messageContainer.appendChild(timestamp);
    
    chatArea.appendChild(messageContainer);
    chatArea.scrollTop = chatArea.scrollHeight;
    
    return messageContainer;
  }

  function updateSendButton() {
    const hasText = chatInput.value.trim().length > 0;
    sendButton.disabled = !hasText;
    sendButton.classList.toggle('active', hasText);
  }

  function updateCharCount() {
    const length = chatInput.value.length;
    charCount.textContent = `${length}/500`;
    charCount.classList.toggle('warning', length > 400);
    charCount.classList.toggle('error', length >= 500);
  }

  async function sendMessage() {
    const question = chatInput.value.trim();
    if (!question) return;
    
    // Add user message
    addMessage(question, true);
    chatInput.value = "";
    updateSendButton();
    updateCharCount();
    
    // Add loading message
    const loadingMessage = addMessage("", false, true);
    
    try {
      const tabs = await window.chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      
      if (!tabs || tabs.length === 0 || !tabs[0].id) {
        throw new Error("No active tab found");
      }

      const tabId = tabs[0].id;
      
      // Capture page content (only visible text for context)
      const results = await window.chrome.scripting.executeScript({
        target: { tabId },
        func: () => document.body.innerText,
      });
      
      const textContent = results[0].result;

      // Use apiManager with selected expert type
      const expertType = expertSelect.value;
      const { answer } = await window.apiManager.chat(question, textContent, tabs[0].url, expertType);
      
      // Remove loading message and add response
      loadingMessage.remove();
      addMessage(answer, false);
      
    } catch (error) {
      console.error("Chat error:", error);
      loadingMessage.remove();
      addMessage("❌ **Error:** Failed to process your question. Please check if the backend server is running and try again!", false);
    }
  }

  // Event listeners
  sendButton.addEventListener("click", sendMessage);
  
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  chatInput.addEventListener("input", () => {
    updateSendButton();
    updateCharCount();
  });
  
  // Initialize button state
  updateSendButton();
  updateCharCount();
}

// Make available globally
window.initializeChatbot = initializeChatbot;
