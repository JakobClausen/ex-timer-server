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
exports.DayResponse = exports.ClassResponse = exports.ScheduleClassInput = exports.ScheduleInput = exports.ClassInput = void 0;
const type_graphql_1 = require("type-graphql");
let ClassInput = class ClassInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClassInput.prototype, "start_time", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClassInput.prototype, "end_time", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ClassInput.prototype, "category", void 0);
ClassInput = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType()
], ClassInput);
exports.ClassInput = ClassInput;
let ScheduleInput = class ScheduleInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ScheduleInput.prototype, "day", void 0);
__decorate([
    type_graphql_1.Field(() => [ClassInput]),
    __metadata("design:type", Array)
], ScheduleInput.prototype, "gymClass", void 0);
ScheduleInput = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType()
], ScheduleInput);
exports.ScheduleInput = ScheduleInput;
let ScheduleClassInput = class ScheduleClassInput {
};
__decorate([
    type_graphql_1.Field(() => ScheduleInput),
    __metadata("design:type", ScheduleInput)
], ScheduleClassInput.prototype, "Monday", void 0);
__decorate([
    type_graphql_1.Field(() => ScheduleInput),
    __metadata("design:type", ScheduleInput)
], ScheduleClassInput.prototype, "Tuesday", void 0);
__decorate([
    type_graphql_1.Field(() => ScheduleInput),
    __metadata("design:type", ScheduleInput)
], ScheduleClassInput.prototype, "Wednesday", void 0);
__decorate([
    type_graphql_1.Field(() => ScheduleInput),
    __metadata("design:type", ScheduleInput)
], ScheduleClassInput.prototype, "Thursday", void 0);
__decorate([
    type_graphql_1.Field(() => ScheduleInput),
    __metadata("design:type", ScheduleInput)
], ScheduleClassInput.prototype, "Friday", void 0);
__decorate([
    type_graphql_1.Field(() => ScheduleInput),
    __metadata("design:type", ScheduleInput)
], ScheduleClassInput.prototype, "Saturday", void 0);
__decorate([
    type_graphql_1.Field(() => ScheduleInput),
    __metadata("design:type", ScheduleInput)
], ScheduleClassInput.prototype, "Sunday", void 0);
ScheduleClassInput = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType()
], ScheduleClassInput);
exports.ScheduleClassInput = ScheduleClassInput;
let ClassResponse = class ClassResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClassResponse.prototype, "start_time", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClassResponse.prototype, "end_time", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ClassResponse.prototype, "category_id", void 0);
ClassResponse = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType()
], ClassResponse);
exports.ClassResponse = ClassResponse;
let DayResponse = class DayResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DayResponse.prototype, "day", void 0);
__decorate([
    type_graphql_1.Field(() => [ClassResponse]),
    __metadata("design:type", Array)
], DayResponse.prototype, "gymClass", void 0);
DayResponse = __decorate([
    type_graphql_1.ObjectType()
], DayResponse);
exports.DayResponse = DayResponse;
//# sourceMappingURL=ScheduleType.js.map