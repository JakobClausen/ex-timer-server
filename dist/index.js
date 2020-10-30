"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = require("http");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const typeorm_1 = require("typeorm");
const redis_1 = require("./redis");
const user_1 = require("./resolvers/user");
const Whiteboard_1 = require("./resolvers/Whiteboard");
const User_1 = require("./entities/User");
const Workout_1 = require("./entities/Workout");
const Whiteboard_2 = require("./entities/Whiteboard");
const Category_1 = require("./entities/Category");
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
const Schedule_1 = require("./entities/Schedule");
const GymClass_1 = require("./entities/GymClass");
const Schedule_2 = require("./resolvers/Schedule");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "postgres",
        database: config_1.DB_NAME,
        username: "postgres",
        password: "postgres",
        logging: true,
        synchronize: true,
        entities: [User_1.User, Whiteboard_2.Whiteboard, Category_1.Category, Workout_1.Workout, Schedule_1.Schedule, GymClass_1.GymClass],
    });
    const app = express_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: config_1.COOKIE_NAME,
        store: new redis_1.RedisStore({ client: redis_1.redis, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: config_1.__PROD__,
        },
        saveUninitialized: false,
        secret: "aefgsrtdyfjhtgfeadw",
        resave: false,
    }));
    const apolloSchema = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [user_1.UserResolver, Whiteboard_1.WhiteboardResolver, Schedule_2.ScheduleResolver],
            validate: false,
            pubSub: redis_1.pubsub,
        }),
        playground: true,
        context: ({ req, res }) => ({ req, res, redis: redis_1.redis, pubsub: redis_1.pubsub }),
    });
    apolloSchema.applyMiddleware({
        app,
        cors: { origin: false },
    });
    const server = http_1.createServer(app);
    server.listen(4000, () => __awaiter(void 0, void 0, void 0, function* () {
        new subscriptions_transport_ws_1.SubscriptionServer({
            execute: graphql_1.execute,
            subscribe: graphql_1.subscribe,
            schema: yield type_graphql_1.buildSchema({
                resolvers: [user_1.UserResolver, Whiteboard_1.WhiteboardResolver, Schedule_2.ScheduleResolver],
                validate: false,
                pubSub: redis_1.pubsub,
            }),
        }, {
            server: server,
        }),
            console.log(chalk_1.default.black.bgWhite.bold("Listening at port 4000"));
    }));
});
main();
//# sourceMappingURL=index.js.map