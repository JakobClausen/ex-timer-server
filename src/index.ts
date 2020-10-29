import "reflect-metadata";
// server / apollo / typeORM / redis
import express from "express";
import session from "express-session";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { buildSchema } from "type-graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createConnection } from "typeorm";
// redis
import { pubsub, RedisStore, redis } from "./redis";
// resolvers
import { UserResolver } from "./resolvers/user";
import { WhiteboardResolver } from "./resolvers/Whiteboard";
// enteties
import { User } from "./entities/User";
import { Workout } from "./entities/Workout";
import { Whiteboard } from "./entities/Whiteboard";
import { Category } from "./entities/Category";
// other
import { COOKIE_NAME, DB_NAME, __PROD__ } from "./config/config";
import cors from "cors";
import chalk from "chalk";

const main = async () => {
  // typeORM
  await createConnection({
    type: "postgres",
    database: DB_NAME,
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [User, Whiteboard, Category, Workout],
  });

  const app = express();

  // cors
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // cookie
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __PROD__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "aefgsrtdyfjhtgfeadw",
      resave: false,
    })
  );

  // Apollo server
  const apolloSchema = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, WhiteboardResolver],
      validate: false,
      pubSub: pubsub,
    }),
    playground: true,

    context: ({ req, res }) => ({ req, res, redis, pubsub }),
  });

  // Middleware
  apolloSchema.applyMiddleware({
    app,
    cors: { origin: false },
  });

  // server with ws
  const server = createServer(app);
  server.listen(4000, async () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: await buildSchema({
          resolvers: [UserResolver, WhiteboardResolver],
          validate: false,
          pubSub: pubsub,
        }),
      },
      {
        server: server,
      }
    ),
      console.log(chalk.black.bgWhite.bold("Listening at port 4000"));
  });
};
main();
