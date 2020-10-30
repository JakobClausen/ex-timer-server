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
exports.GymClass = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Category_1 = require("./Category");
const Schedule_1 = require("./Schedule");
let GymClass = class GymClass extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GymClass.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], GymClass.prototype, "start_time", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], GymClass.prototype, "end_time", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GymClass.prototype, "category_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GymClass.prototype, "schedule_id", void 0);
__decorate([
    type_graphql_1.Field(() => Schedule_1.Schedule),
    typeorm_1.ManyToOne(() => Schedule_1.Schedule, (schedule) => schedule.gymClass, {
        onDelete: "CASCADE",
    }),
    typeorm_1.JoinColumn({ name: "schedule_id" }),
    __metadata("design:type", Schedule_1.Schedule)
], GymClass.prototype, "schedule", void 0);
__decorate([
    type_graphql_1.Field(() => Category_1.Category),
    typeorm_1.ManyToOne(() => Category_1.Category, (category) => category.workouts, {
        onDelete: "CASCADE",
    }),
    typeorm_1.JoinColumn({ name: "category_id" }),
    __metadata("design:type", Promise)
], GymClass.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], GymClass.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], GymClass.prototype, "updated_at", void 0);
GymClass = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], GymClass);
exports.GymClass = GymClass;
//# sourceMappingURL=GymClass.js.map