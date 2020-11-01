import Redis from "ioredis";
import ConnectRedis from "connect-redis";
import session from "express-session";

export const RedisStore = ConnectRedis(session);
export const redis = new Redis();
