import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = process.env.DB_NAME;
export const DB_TYPE = process.env.DB_TYPE || "postgres";
export const __PROD__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "Forget Password:";
