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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = exports.FieldError = exports.LoginData = exports.UpdateUser = exports.RegistrationData = void 0;
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
let RegistrationData = class RegistrationData {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegistrationData.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegistrationData.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegistrationData.prototype, "username", void 0);
RegistrationData = __decorate([
    type_graphql_1.InputType()
], RegistrationData);
exports.RegistrationData = RegistrationData;
let UpdateUser = class UpdateUser {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateUser.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateUser.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateUser.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateUser.prototype, "username", void 0);
UpdateUser = __decorate([
    type_graphql_1.InputType()
], UpdateUser);
exports.UpdateUser = UpdateUser;
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
exports.LoginData = LoginData;
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
exports.FieldError = FieldError;
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
exports.UserResponse = UserResponse;
//# sourceMappingURL=userTypes.js.map