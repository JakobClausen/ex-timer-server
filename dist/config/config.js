"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.__PROD__ = exports.DB_TYPE = exports.DB_NAME = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_NAME = process.env.DB_NAME;
exports.DB_TYPE = process.env.DB_TYPE || "postgres";
exports.__PROD__ = process.env.NODE_ENV === "production";
exports.COOKIE_NAME = "qid";
exports.FORGET_PASSWORD_PREFIX = "Forget Password:";
//# sourceMappingURL=config.js.map