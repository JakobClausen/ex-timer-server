import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = process.env.DB_NAME || "gym-postgres";
export const DB_TYPE = process.env.DB_TYPE || "postgresql";
export const __PROD__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
