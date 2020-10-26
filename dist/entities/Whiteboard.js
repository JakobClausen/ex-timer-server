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
const WhiteboardRowRel_1 = require("./WhiteboardRowRel");
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
], Whiteboard.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Whiteboard.prototype, "user_id", void 0);
__decorate([
    typeorm_1.OneToMany(() => WhiteboardRowRel_1.WhiteboardRowRel, (whiteboardRowRel) => whiteboardRowRel.whiteboard),
    __metadata("design:type", Promise)
], Whiteboard.prototype, "programming_rows_connections", void 0);
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