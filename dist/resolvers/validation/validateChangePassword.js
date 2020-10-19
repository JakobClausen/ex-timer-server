"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChangePassword = void 0;
exports.validateChangePassword = (password) => {
    if (password.length <= 5) {
        return [
            {
                field: "password",
                message: "Length must be greater than 5",
            },
        ];
    }
    return null;
};
//# sourceMappingURL=validateChangePassword.js.map