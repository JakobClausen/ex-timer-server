"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseObjectSchedule = void 0;
const createGymClassObject = (gymClass) => {
    let newGymClassObj = {};
    const keys = Array.from(Array(gymClass.length).keys());
    keys.map((key) => {
        newGymClassObj = Object.assign(Object.assign({}, newGymClassObj), { [key]: gymClass[key] });
    });
    return newGymClassObj;
};
exports.createResponseObjectSchedule = (response) => {
    console.log(response);
    let newResponse = {
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
        Sunday: {},
    };
    response.map((day) => {
        const newGymClassResponse = createGymClassObject(day.gymClass);
        newResponse = Object.assign(Object.assign({}, newResponse), { [day.day]: Object.assign(Object.assign({}, day), { gymClass: newGymClassResponse }) });
    });
    return newResponse;
};
//# sourceMappingURL=createResponseObjectSchedule.js.map