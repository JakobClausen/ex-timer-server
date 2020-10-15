"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const config_2 = require("./config/config");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [User_1.User],
    dbName: config_2.DB_NAME,
    type: config_2.DB_TYPE,
    debug: !config_1.__PROD__,
};
//# sourceMappingURL=mikro-orm.config.js.map