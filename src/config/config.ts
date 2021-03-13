import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = process.env.DB_NAME;
export const DB_TYPE = process.env.DB_TYPE || "postgres";
export const __PROD__ = process.env.NODE_ENV === "production";
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_PORT = process.env.EMAIL_PORT || 587;
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "Forget Password:";
