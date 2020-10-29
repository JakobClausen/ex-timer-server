import { Request, Response } from "express";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  pubsub: RedisPubSub;
};
