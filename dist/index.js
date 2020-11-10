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
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const redis_1 = require("./redis");
const user_1 = require("./resolvers/user");
const Whiteboard_1 = require("./resolvers/Whiteboard");
const Schedule_1 = require("./resolvers/Schedule");
const User_1 = require("./entities/User");
const Workout_1 = require("./entities/Workout");
const Whiteboard_2 = require("./entities/Whiteboard");
const Category_1 = require("./entities/Category");
const Schedule_2 = require("./entities/Schedule");
const GymClass_1 = require("./entities/GymClass");
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
const CrossfitWorkout_1 = require("./resolvers/CrossfitWorkout");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "postgres",
        database: config_1.DB_NAME,
        username: "postgres",
        password: "postgres",
        logging: true,
        synchronize: true,
        entities: [User_1.User, Whiteboard_2.Whiteboard, Category_1.Category, Workout_1.Workout, Schedule_2.Schedule, GymClass_1.GymClass],
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
            resolvers: [
                user_1.UserResolver,
                Whiteboard_1.WhiteboardResolver,
                Schedule_1.ScheduleResolver,
                CrossfitWorkout_1.CrossfitWorkout,
            ],
            validate: false,
        }),
        playground: true,
        context: ({ req, res }) => ({ req, res, redis: redis_1.redis }),
    });
    apolloSchema.applyMiddleware({
        app,
        cors: { origin: false },
    });
    app.listen(4000, () => {
        console.log(chalk_1.default.black.bgWhite.bold("Listening at port 4000"));
    });
});
main();
//# sourceMappingURL=index.js.map