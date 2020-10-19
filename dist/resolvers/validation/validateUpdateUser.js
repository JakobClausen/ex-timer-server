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
exports.validateUpdateUser = void 0;
const argon2_1 = __importDefault(require("argon2"));
exports.validateUpdateUser = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof data.password !== "undefined") {
        const validate = yield argon2_1.default.verify(user.password, data.password);
        if (!validate) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Invalid password!",
                    },
                ],
            };
        }
        if (data.password.length <= 5) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Password needs to be greater than 5",
                    },
                ],
            };
        }
        const hash = yield argon2_1.default.hash(data.password);
        user.password = hash;
    }
    if (typeof data.username !== "undefined") {
        if (data.username === "") {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Invalid username",
                    },
                ],
            };
        }
        user.username = data.username;
    }
    if (typeof data.email !== "undefined") {
        if (!data.email.includes("@")) {
            return {
                errors: [{ field: "email", message: "Invalid email!" }],
            };
        }
        user.email = data.email;
    }
    return { user };
});
//# sourceMappingURL=validateUpdateUser.js.map