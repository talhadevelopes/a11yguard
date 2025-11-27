import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
let socketOptions: any = undefined;
try {
  const parsed = new URL(redisUrl);
  if (parsed.protocol === 'rediss:') {
    socketOptions = {
      tls: true,
      rejectUnauthorized: false,
      servername: parsed.hostname,
    };
  }
} catch (err) {
  console.warn('Invalid REDIS_URL format:', process.env.REDIS_URL, err);
}

export const redisClient: RedisClientType = createClient({
  url: redisUrl,
  socket: socketOptions,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('✅ Connected to Redis');
  }
};
