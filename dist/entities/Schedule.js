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
exports.Schedule = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const GymClass_1 = require("./GymClass");
let Schedule = class Schedule extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Schedule.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Schedule.prototype, "day", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Schedule.prototype, "user_id", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.schedule, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Schedule.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [GymClass_1.GymClass]),
    typeorm_1.OneToMany(() => GymClass_1.GymClass, (gymClass) => gymClass.schedule),
    __metadata("design:type", Array)
], Schedule.prototype, "gymClass", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Schedule.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Schedule.prototype, "updated_at", void 0);
Schedule = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Schedule);
exports.Schedule = Schedule;
//# sourceMappingURL=Schedule.js.map