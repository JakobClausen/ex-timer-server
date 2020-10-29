import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import ConnectRedis from "connect-redis";
import session from "express-session";

// Redis pubsub
const options: Redis.RedisOptions = {
  host: "127.0.0.1",
  port: 6379,
  retryStrategy: (times) => Math.max(times * 100, 3000),
};
export const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

export const RedisStore = ConnectRedis(session);
export const redis = new Redis();
