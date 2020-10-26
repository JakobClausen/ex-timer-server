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
exports.Workout = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Category_1 = require("./Category");
const Whiteboard_1 = require("./Whiteboard");
let Workout = class Workout extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Workout.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Workout.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Workout.prototype, "workout", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Workout.prototype, "category_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Workout.prototype, "whiteboard_id", void 0);
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    typeorm_1.OneToMany(() => Whiteboard_1.Whiteboard, (whiteboard) => whiteboard.workout),
    typeorm_1.JoinColumn({ name: "whiteboard_id" }),
    __metadata("design:type", Promise)
], Workout.prototype, "whiteboard", void 0);
__decorate([
    type_graphql_1.Field(() => Category_1.Category),
    typeorm_1.ManyToOne(() => Category_1.Category, (category) => category.workouts),
    typeorm_1.JoinColumn({ name: "category_id" }),
    __metadata("design:type", Promise)
], Workout.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Workout.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Workout.prototype, "updated_at", void 0);
Workout = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Workout);
exports.Workout = Workout;
//# sourceMappingURL=Workout.js.map