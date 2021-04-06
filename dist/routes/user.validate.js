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
exports.deleteSchema = exports.putSchema = exports.postSchema = exports.getSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const getSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required()
});
exports.getSchema = getSchema;
const postSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
    name: joi_1.default.string().required()
});
exports.postSchema = postSchema;
const putSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required(),
    name: joi_1.default.string().required()
});
exports.putSchema = putSchema;
const deleteSchema = joi_1.default.object().keys({
    id: joi_1.default.number().required()
});
exports.deleteSchema = deleteSchema;
//# sourceMappingURL=user.validate.js.map