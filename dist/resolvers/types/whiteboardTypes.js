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
exports.WhiteboardInput = exports.RowField = exports.CategoryInput = void 0;
const type_graphql_1 = require("type-graphql");
let CategoryInput = class CategoryInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CategoryInput.prototype, "category", void 0);
CategoryInput = __decorate([
    type_graphql_1.InputType()
], CategoryInput);
exports.CategoryInput = CategoryInput;
let RowField = class RowField {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RowField.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RowField.prototype, "workout", void 0);
RowField = __decorate([
    type_graphql_1.InputType()
], RowField);
exports.RowField = RowField;
let WhiteboardInput = class WhiteboardInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], WhiteboardInput.prototype, "day", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], WhiteboardInput.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => RowField),
    __metadata("design:type", RowField)
], WhiteboardInput.prototype, "one", void 0);
__decorate([
    type_graphql_1.Field(() => RowField),
    __metadata("design:type", RowField)
], WhiteboardInput.prototype, "two", void 0);
__decorate([
    type_graphql_1.Field(() => RowField),
    __metadata("design:type", RowField)
], WhiteboardInput.prototype, "three", void 0);
WhiteboardInput = __decorate([
    type_graphql_1.InputType()
], WhiteboardInput);
exports.WhiteboardInput = WhiteboardInput;
//# sourceMappingURL=whiteboardTypes.js.map