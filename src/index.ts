import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __PROD__ } from "./config/config";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import ConnectRedis from "connect-redis";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  // await orm.getMigrator().up();

  const app = express();

  // Redis session store
  const RedisStore = ConnectRedis(session);
  const redisClient = redis.createClient();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
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
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  // Middleware
  apolloSchema.applyMiddleware({
    app,
    cors: { origin: false },
  });

  app.listen(4000, () => console.log("Listening at port 4000"));
};
main();
