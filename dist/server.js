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
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const objApp = new app_1.default();
const port = process.env.SERVER_PORT || 3000;
objApp.app.listen(port, () => {
    console.log(`API - SEMILLERO inicializada en http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map