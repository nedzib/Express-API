"use strict";
/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./routes/user.controller");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    // Constructor
    constructor() {
        this.userRoutes = new user_controller_1.UserController();
        this.app = express_1.default();
        this.app.use(express_1.default.json());
        this.app.use(morgan_1.default('dev'));
        this.userRoutes.routes(this.app);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map