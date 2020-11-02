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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleResolver = void 0;
const GymClass_1 = require("../entities/GymClass");
const Schedule_1 = require("../entities/Schedule");
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ScheduleType_1 = require("./types/ScheduleType");
let ScheduleResolver = class ScheduleResolver extends typeorm_1.BaseEntity {
    createSchedule({ req }, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Schedule_1.Schedule.delete({ user_id: req.session.userId });
            const days = [
                data.Monday,
                data.tuesday,
                data.Wednesday,
                data.Thursday,
                data.Friday,
                data.Saturday,
                data.Sunday,
            ];
            days.map((day) => __awaiter(this, void 0, void 0, function* () {
                const schedule = yield Schedule_1.Schedule.create({
                    day: day.day,
                    user_id: req.session.userId,
                }).save();
                day.classes.map((gymClass) => __awaiter(this, void 0, void 0, function* () {
                    yield GymClass_1.GymClass.create({
                        start_time: gymClass.start_time,
                        end_time: gymClass.end_time,
                        category_id: gymClass.category,
                        schedule_id: schedule.id,
                    }).save();
                }));
            }));
            return true;
        });
    }
    getDaySchedule(day, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield typeorm_1.getConnection()
                .getRepository(Schedule_1.Schedule)
                .createQueryBuilder("s")
                .innerJoinAndSelect("s.gymClass", "w", "w.schedule_id = s.id")
                .where("user_id = :id ", { id: req.session.userId })
                .andWhere("day = :day", { day })
                .getMany();
            if (!response) {
                throw new Error("Something went wrong");
            }
            return response;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ScheduleType_1.ScheduleClassInput]),
    __metadata("design:returntype", Promise)
], ScheduleResolver.prototype, "createSchedule", null);
__decorate([
    type_graphql_1.Query(() => [ScheduleType_1.ScheduleResponse]),
    __param(0, type_graphql_1.Arg("day")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleResolver.prototype, "getDaySchedule", null);
ScheduleResolver = __decorate([
    type_graphql_1.Resolver()
], ScheduleResolver);
exports.ScheduleResolver = ScheduleResolver;
//# sourceMappingURL=Schedule.js.map