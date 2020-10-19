"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
const type_graphql_1 = require("type-graphql");
const config_1 = require("../config/config");
const inputType_1 = require("./types/inputType");
const updateUser_1 = require("./types/updateUser");
const validateRegistration_1 = require("./validation/validateRegistration");
const validateUpdateUser_1 = require("./validation/validateUpdateUser");
const sendEmails_1 = require("../utils/sendEmails");
const uuid_1 = require("uuid");
const validateChangePassword_1 = require("./validation/validateChangePassword");
let LoginData = class LoginData {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginData.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginData.prototype, "password", void 0);
LoginData = __decorate([
    type_graphql_1.InputType()
], LoginData);
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    changePassword(token, newPassword, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = config_1.FORGET_PASSWORD_PREFIX + token;
            const userId = yield redis.get(key);
            if (!userId) {
                return {
                    errors: [
                        {
                            field: "token",
                            message: "Something went wrong!",
                        },
                    ],
                };
            }
            const errors = validateChangePassword_1.validateChangePassword(newPassword);
            if (errors) {
                return { errors };
            }
            const userIdNum = parseInt(userId);
            const user = yield User_1.User.findOne(userIdNum);
            if (!user) {
                return {
                    errors: [
                        {
                            field: "token",
                            message: "Something went wrong!",
                        },
                    ],
                };
            }
            yield User_1.User.update({ id: userIdNum }, { password: yield argon2_1.default.hash(newPassword) });
            yield redis.del(key);
            return { user };
        });
    }
    forgotPassword(email, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return true;
            }
            const token = uuid_1.v4();
            yield redis.set(config_1.FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60 * 24 * 3);
            const link = `<a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`;
            yield sendEmails_1.sendEmail(email, link);
            return true;
        });
    }
    me({ req }) {
        if (!req.session.userId) {
            return null;
        }
        return User_1.User.findOne(req.session.userId);
    }
    register(data, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validateRegistration_1.validateRegistration(data);
            if (errors) {
                return { errors };
            }
            const hash = yield argon2_1.default.hash(data.password);
            let user;
            try {
                user = yield User_1.User.create({
                    email: data.email,
                    password: hash,
                    username: data.username,
                }).save();
                req.session.userId = user.id;
            }
            catch (err) {
                if (err.code === "23505") {
                    return {
                        errors: [{ field: "email", message: "Email already exists" }],
                    };
                }
            }
            return { user };
        });
    }
    login(data, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email: data.email } });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "User not found!",
                        },
                    ],
                };
            }
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
            req.session.userId = user.id;
            return { user };
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => {
            req.session.destroy((err) => {
                res.clearCookie(config_1.COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }
    updateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(data.id);
            if (!user) {
                return { errors: [{ field: "id", message: "User not found" }] };
            }
            const updatedUser = validateUpdateUser_1.validateUpdateUser(data, user);
            return updatedUser;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Arg("newPassword")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputType_1.RegistrationData, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginData, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse, { nullable: true }),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUser_1.UpdateUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map