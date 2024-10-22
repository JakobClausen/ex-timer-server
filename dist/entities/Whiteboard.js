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
exports.Whiteboard = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Workout_1 = require("./Workout");
let Whiteboard = class Whiteboard extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Whiteboard.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Whiteboard.prototype, "day", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Whiteboard.prototype, "order", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Whiteboard.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.whiteboards, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Whiteboard.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Workout_1.Workout]),
    typeorm_1.OneToMany(() => Workout_1.Workout, (workout) => workout.whiteboard),
    __metadata("design:type", Promise)
], Whiteboard.prototype, "workout", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Whiteboard.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Whiteboard.prototype, "updated_at", void 0);
Whiteboard = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Whiteboard);
exports.Whiteboard = Whiteboard;
//# sourceMappingURL=Whiteboard.js.map