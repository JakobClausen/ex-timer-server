"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkdown = void 0;
const markdown_it_1 = __importDefault(require("markdown-it"));
exports.createMarkdown = (days) => {
    const md = new markdown_it_1.default({ html: true, breaks: true });
    let x = Object.keys(days).map((day) => {
        days[day] = {
            day,
            category: days[day].category,
            one: {
                title: md.render(days[day].one.title),
                workout: md.render(days[day].one.workout),
            },
            two: {
                title: md.render(days[day].two.title),
                workout: md.render(days[day].two.workout),
            },
            three: {
                title: md.render(days[day].three.title),
                workout: md.render(days[day].three.workout),
            },
        };
        return days[day];
    });
    return [x[0], x[1], x[2], x[3], x[4], x[5], x[6]];
};
//# sourceMappingURL=createMarkdown.js.map