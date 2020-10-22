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
exports.ProgrammingRow = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Category_1 = require("./Category");
const Whiteboard_1 = require("./Whiteboard");
let ProgrammingRow = class ProgrammingRow extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProgrammingRow.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProgrammingRow.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProgrammingRow.prototype, "markdown", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProgrammingRow.prototype, "whiteboard_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProgrammingRow.prototype, "category_id", void 0);
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    typeorm_1.JoinColumn({ name: "whiteboard_id" }),
    typeorm_1.ManyToOne(() => Whiteboard_1.Whiteboard, (whiteboard) => whiteboard.programming_rows),
    __metadata("design:type", Whiteboard_1.Whiteboard)
], ProgrammingRow.prototype, "whiteboard", void 0);
__decorate([
    type_graphql_1.Field(() => Category_1.Category),
    typeorm_1.JoinColumn({ name: "category_id" }),
    typeorm_1.ManyToOne(() => Category_1.Category, (category) => category.programming_rows),
    __metadata("design:type", Category_1.Category)
], ProgrammingRow.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ProgrammingRow.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], ProgrammingRow.prototype, "updated_at", void 0);
ProgrammingRow = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], ProgrammingRow);
exports.ProgrammingRow = ProgrammingRow;
//# sourceMappingURL=ProgrammingRow.js.map