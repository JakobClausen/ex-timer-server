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
exports.WhiteboardResolver = void 0;
const Whiteboard_1 = require("../entities/Whiteboard");
const type_graphql_1 = require("type-graphql");
const Category_1 = require("../entities/Category");
const whiteboardTypes_1 = require("./types/whiteboardTypes");
const isAuth_1 = require("../middleware/isAuth");
const typeorm_1 = require("typeorm");
const Workout_1 = require("../entities/Workout");
const createMarkdown_1 = require("../utils/createMarkdown");
let WhiteboardResolver = class WhiteboardResolver {
    createWhiteboard(data, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Whiteboard_1.Whiteboard.delete({ user_id: req.session.userId });
            const days = createMarkdown_1.createMarkdown(data);
            console.log(days);
            days.map((day) => __awaiter(this, void 0, void 0, function* () {
                const whiteboard = yield Whiteboard_1.Whiteboard.create({
                    day: day.day,
                    user_id: req.session.userId,
                }).save();
                const workouts = [day.one, day.two, day.three];
                workouts.map((workout) => __awaiter(this, void 0, void 0, function* () {
                    yield Workout_1.Workout.create(Object.assign(Object.assign({}, workout), { category_id: day.category, whiteboard_id: whiteboard.id })).save();
                }));
            }));
            return true;
        });
    }
    getWhiteboard({ req }, day) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield typeorm_1.getConnection()
                .getRepository(Whiteboard_1.Whiteboard)
                .createQueryBuilder("w")
                .innerJoinAndSelect("w.workout", "r", "r.whiteboard_id = w.id")
                .where("user_id = :id ", { id: req.session.userId })
                .andWhere("day = :day", { day })
                .getOne();
            if (!response) {
                throw new Error("asdásd");
            }
            return response;
        });
    }
    getAllWhiteboards({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield typeorm_1.getConnection()
                .getRepository(Whiteboard_1.Whiteboard)
                .createQueryBuilder("w")
                .innerJoinAndSelect("w.workout", "r", "r.whiteboard_id = w.id")
                .where("user_id = :id ", { id: req.session.userId })
                .getMany();
            if (!response) {
                throw new Error("asdásd");
            }
            return response;
        });
    }
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.create({
                category: data.category,
            }).save();
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [whiteboardTypes_1.DaysInput, Object]),
    __metadata("design:returntype", Promise)
], WhiteboardResolver.prototype, "createWhiteboard", null);
__decorate([
    type_graphql_1.Query(() => Whiteboard_1.Whiteboard),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("day")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WhiteboardResolver.prototype, "getWhiteboard", null);
__decorate([
    type_graphql_1.Query(() => [Whiteboard_1.Whiteboard]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhiteboardResolver.prototype, "getAllWhiteboards", null);
__decorate([
    type_graphql_1.Mutation(() => Category_1.Category),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [whiteboardTypes_1.CategoryInput]),
    __metadata("design:returntype", Promise)
], WhiteboardResolver.prototype, "createCategory", null);
WhiteboardResolver = __decorate([
    type_graphql_1.Resolver()
], WhiteboardResolver);
exports.WhiteboardResolver = WhiteboardResolver;
//# sourceMappingURL=Whiteboard.js.map