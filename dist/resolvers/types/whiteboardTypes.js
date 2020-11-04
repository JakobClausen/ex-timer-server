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
exports.AllWhiteboardsResponse = exports.DaysInput = exports.WhiteboardInput = exports.RowField = exports.CategoryInput = void 0;
const Whiteboard_1 = require("../../entities/Whiteboard");
const type_graphql_1 = require("type-graphql");
let CategoryInput = class CategoryInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CategoryInput.prototype, "category", void 0);
CategoryInput = __decorate([
    type_graphql_1.ObjectType(),
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
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RowField.prototype, "order", void 0);
RowField = __decorate([
    type_graphql_1.ObjectType(),
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
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], WhiteboardInput.prototype, "order", void 0);
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
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType()
], WhiteboardInput);
exports.WhiteboardInput = WhiteboardInput;
let DaysInput = class DaysInput {
};
__decorate([
    type_graphql_1.Field(() => WhiteboardInput),
    __metadata("design:type", WhiteboardInput)
], DaysInput.prototype, "Monday", void 0);
__decorate([
    type_graphql_1.Field(() => WhiteboardInput),
    __metadata("design:type", WhiteboardInput)
], DaysInput.prototype, "Tuesday", void 0);
__decorate([
    type_graphql_1.Field(() => WhiteboardInput),
    __metadata("design:type", WhiteboardInput)
], DaysInput.prototype, "Wednesday", void 0);
__decorate([
    type_graphql_1.Field(() => WhiteboardInput),
    __metadata("design:type", WhiteboardInput)
], DaysInput.prototype, "Thursday", void 0);
__decorate([
    type_graphql_1.Field(() => WhiteboardInput),
    __metadata("design:type", WhiteboardInput)
], DaysInput.prototype, "Friday", void 0);
__decorate([
    type_graphql_1.Field(() => WhiteboardInput),
    __metadata("design:type", WhiteboardInput)
], DaysInput.prototype, "Saturday", void 0);
__decorate([
    type_graphql_1.Field(() => WhiteboardInput),
    __metadata("design:type", WhiteboardInput)
], DaysInput.prototype, "Sunday", void 0);
DaysInput = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType()
], DaysInput);
exports.DaysInput = DaysInput;
let AllWhiteboardsResponse = class AllWhiteboardsResponse {
};
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    __metadata("design:type", Whiteboard_1.Whiteboard)
], AllWhiteboardsResponse.prototype, "Monday", void 0);
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    __metadata("design:type", Whiteboard_1.Whiteboard)
], AllWhiteboardsResponse.prototype, "Tuesday", void 0);
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    __metadata("design:type", Whiteboard_1.Whiteboard)
], AllWhiteboardsResponse.prototype, "Wednesday", void 0);
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    __metadata("design:type", Whiteboard_1.Whiteboard)
], AllWhiteboardsResponse.prototype, "Thursday", void 0);
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    __metadata("design:type", Whiteboard_1.Whiteboard)
], AllWhiteboardsResponse.prototype, "Friday", void 0);
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    __metadata("design:type", Whiteboard_1.Whiteboard)
], AllWhiteboardsResponse.prototype, "Saturday", void 0);
__decorate([
    type_graphql_1.Field(() => Whiteboard_1.Whiteboard),
    __metadata("design:type", Whiteboard_1.Whiteboard)
], AllWhiteboardsResponse.prototype, "Sunday", void 0);
AllWhiteboardsResponse = __decorate([
    type_graphql_1.ObjectType()
], AllWhiteboardsResponse);
exports.AllWhiteboardsResponse = AllWhiteboardsResponse;
//# sourceMappingURL=whiteboardTypes.js.map