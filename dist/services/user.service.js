"use strict";
/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */
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
exports.UserService = void 0;
const pg_1 = require("pg");
const config_1 = require("../config/config");
class UserService {
    constructor() {
        this.getUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            if (userId < 0) {
                throw new Error("Internal_server_error");
            }
            const objConfig = new config_1.Config();
            // Instancia de la clase Client para base de datos
            const client = new pg_1.Client({ connectionString: objConfig.connection() });
            // Conexion a base de datos
            client.connect((error) => {
                if (error) {
                    throw new Error('internal_server_error');
                }
            });
            try {
                const result = yield client.query(`SELECT * FROM users WHERE id = '${userId}' AND status = 'true'`);
                if (result.rows.length === 1) {
                    this.id = result.rows[0].id;
                    this.name = result.rows[0].name;
                }
            }
            catch (error) {
                throw new Error('internal_server_error');
            }
            return {
                'id': this.id,
                'name': this.name
            };
        });
        this.getListUser = () => __awaiter(this, void 0, void 0, function* () {
            let listUser = '';
            const objConfig = new config_1.Config();
            // Instancia de la clase Client para base de datos
            const client = new pg_1.Client({ connectionString: objConfig.connection() });
            // Conexion a base de datos
            client.connect((error) => {
                if (error) {
                    throw new Error('internal_server_error');
                }
            });
            try {
                const result = yield client.query(`SELECT * FROM users WHERE status = 'true'`);
                listUser = result.rows;
            }
            catch (error) {
                throw new Error('internal_server_error');
            }
            return listUser;
        });
        this.createUser = (userId, userName) => __awaiter(this, void 0, void 0, function* () {
            if (userId < 0) {
                throw new Error("Internal_server_error");
            }
            const objConfig = new config_1.Config();
            // Instancia de la clase Client para base de datos
            const client = new pg_1.Client({ connectionString: objConfig.connection() });
            // Conexion a base de datos
            client.connect((error) => {
                if (error) {
                    throw new Error('internal_server_error');
                }
            });
            try {
                const result = yield client.query(`SELECT * FROM users WHERE id = '${userId}'`);
                if (result.rowCount >= 1) {
                    return "exist";
                }
                else {
                    client.query(`insert into users (id,name,status) values ('${userId}','${userName}',true) `);
                    return {
                        'id': userId,
                        'name': userName
                    };
                }
            }
            catch (error) {
                throw new Error('internal_server_error');
            }
        });
        this.editUser = (userId, userName) => __awaiter(this, void 0, void 0, function* () {
            if (userId < 0) {
                throw new Error("Internal_server_error");
            }
            const objConfig = new config_1.Config();
            // Instancia de la clase Client para base de datos
            const client = new pg_1.Client({ connectionString: objConfig.connection() });
            // Conexion a base de datos
            client.connect((error) => {
                if (error) {
                    throw new Error('internal_server_error');
                }
            });
            try {
                let result = yield client.query(`SELECT * FROM users WHERE id = '${userId}'`);
                if (result.rowCount === 0) {
                    return "notExist";
                }
                else {
                    client.query(`UPDATE users SET name ='${userName}' where id=${userId}`);
                    client.query(`UPDATE users SET status ='true' where id=${userId}`);
                    result = yield client.query(`SELECT * FROM users WHERE id = '${userId}'`);
                    return result.rows;
                }
            }
            catch (error) {
                throw new Error('internal_server_error');
            }
        });
        this.deleteUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            if (userId < 0) {
                throw new Error("Internal_server_error");
            }
            const objConfig = new config_1.Config();
            // Instancia de la clase Client para base de datos
            const client = new pg_1.Client({ connectionString: objConfig.connection() });
            // Conexion a base de datos
            client.connect((error) => {
                if (error) {
                    throw new Error('internal_server_error');
                }
            });
            try {
                let result = yield client.query(`SELECT * FROM users WHERE id = '${userId}'`);
                if (result.rowCount === 0) {
                    return "notExist";
                }
                else {
                    client.query(`UPDATE users SET status = false where id=${userId}`);
                    result = yield client.query(`SELECT * FROM users WHERE id = '${userId}'`);
                    return result.rows;
                }
            }
            catch (error) {
                throw new Error('internal_server_error');
            }
        });
        this.id = -1;
        this.name = "";
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map