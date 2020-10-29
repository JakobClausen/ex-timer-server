"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.RedisStore = exports.pubsub = void 0;
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const options = {
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: (times) => Math.max(times * 100, 3000),
};
exports.pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
    publisher: new ioredis_1.default(options),
    subscriber: new ioredis_1.default(options),
});
exports.RedisStore = connect_redis_1.default(express_session_1.default);
exports.redis = new ioredis_1.default();
//# sourceMappingURL=redis.js.map