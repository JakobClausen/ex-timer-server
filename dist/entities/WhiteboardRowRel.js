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
exports.WhiteboardRowRel = void 0;
const typeorm_1 = require("typeorm");
const ProgrammingRow_1 = require("./ProgrammingRow");
const Whiteboard_1 = require("./Whiteboard");
let WhiteboardRowRel = class WhiteboardRowRel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], WhiteboardRowRel.prototype, "whiteboard_id", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], WhiteboardRowRel.prototype, "programming_row_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Whiteboard_1.Whiteboard, (whiteboard) => whiteboard.programming_rows_connections, {
        onDelete: "CASCADE",
    }),
    typeorm_1.JoinColumn({ name: "whiteboard_id" }),
    __metadata("design:type", Promise)
], WhiteboardRowRel.prototype, "whiteboard", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ProgrammingRow_1.ProgrammingRow, (programmingRow) => programmingRow.whiteboard_connection, {
        onDelete: "CASCADE",
    }),
    typeorm_1.JoinColumn({ name: "programming_row_id" }),
    __metadata("design:type", Promise)
], WhiteboardRowRel.prototype, "programming_row", void 0);
WhiteboardRowRel = __decorate([
    typeorm_1.Entity()
], WhiteboardRowRel);
exports.WhiteboardRowRel = WhiteboardRowRel;
//# sourceMappingURL=WhiteboardRowRel.js.map