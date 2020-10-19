import "reflect-metadata";
import { COOKIE_NAME, __PROD__ } from "./config/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import ConnectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { User } from "./entities/User";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "gym-postgres2",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const app = express();

  // Redis session store
  const RedisStore = ConnectRedis(session);
  const redis = new Redis();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

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
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  // Middleware
  apolloSchema.applyMiddleware({
    app,
    cors: { origin: false },
  });

  app.listen(4000, () => console.log("Listening at port 4000"));
};
main();
