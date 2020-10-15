import { __PROD__ } from "./config/config";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { DB_TYPE, DB_NAME } from "./config/config";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [User],
  dbName: DB_NAME,
  type: DB_TYPE,
  debug: !__PROD__,
} as Parameters<typeof MikroORM.init>[0];
