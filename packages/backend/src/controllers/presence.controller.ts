import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth';
import type { RedisClientType } from 'redis';

// We will pass a bound redis client accessor to avoid circular deps
let redis: RedisClientType | null = null;
export const bindPresenceRedis = (client: RedisClientType) => {
  redis = client;
};

export class PresenceController {
  //to get the online/offline status
  static async getOnline(req: AuthRequest, res: Response) {
    try {
      if (!redis) return res.status(500).json({ success: false, message: 'Presence not initialized' });
      const userId = req.userId!;
      const key = `online:${userId}`;
      const members = await redis.sMembers(key);
      return res.json({ success: true, data: { online: members } });
    } catch (err) {
      console.error('getOnline error', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
}
