"use strict";
/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_validate_1 = require("./user.validate");
const user_service_1 = require("../services/user.service");
class UserController {
    // Metodo de la clase ControllerEntidad
    routes(app) {
        // Endpoint get all users
        app.route('/user/list').get((req, res) => {
            const objUserService = new user_service_1.UserService();
            const allUsers = objUserService.getListUser();
            res.status(200).json({
                data: allUsers,
                status: null
            });
            res.end();
        });
        // Endpoint get
        app.route('/user').get((req, res) => {
            const validation = user_validate_1.getSchema.validate(req.query);
            if (validation.error) {
                res.status(422).json({
                    data: null,
                    status: validation.error.message
                });
                res.end();
            }
            else {
                try {
                    const objUserService = new user_service_1.UserService();
                    const user = objUserService.getUser(Number(req.query.id));
                    res.status(200).json({
                        data: user,
                        status: null
                    });
                    res.end();
                }
                catch (error) {
                    res.status(500).json({
                        data: null,
                        status: error
                    });
                    res.end();
                }
            }
        });
        // Endpoint post
        app.route('/user').post((req, res) => {
            const validation = user_validate_1.postSchema.validate(req.body);
            if (validation.error) {
                console.log("Error in Valitation");
                res.status(422).json({
                    data: null,
                    status: validation.error.message
                }).end();
            }
            else {
                const objUserService = new user_service_1.UserService();
                const user = objUserService.createUser(Number(req.body.id), req.body.name);
                if (user === "exist") {
                    res.status(200).json({
                        data: {},
                        status: "User already exist"
                    });
                    res.end();
                }
                else {
                    res.status(201).json({
                        data: user,
                        status: "User created"
                    });
                    res.end();
                }
            }
        });
        // Endpoint put
        app.route('/user').put((req, res) => {
            const validation = user_validate_1.putSchema.validate(req.body);
            if (validation.error) {
                res.status(422).json({
                    data: null,
                    status: validation.error.message
                });
                res.end();
            }
            else {
                const objUserService = new user_service_1.UserService();
                const user = objUserService.editUser(Number(req.body.id), req.body.name);
                console.log(user);
                if (user === "notExist") {
                    res.status(200).json({
                        data: {},
                        status: "User does not exist"
                    });
                    res.end();
                }
                else {
                    res.status(200).json({
                        data: user,
                        status: "User edited"
                    });
                    res.end();
                }
            }
        });
        // Endpoint delete
        app.route('/user').delete((req, res) => {
            const validation = user_validate_1.deleteSchema.validate(req.body);
            if (validation.error) {
                console.log("Validation Error");
                res.status(422).json({
                    data: null,
                    status: validation.error.message
                });
                res.end();
            }
            else {
                const objUserService = new user_service_1.UserService();
                const user = objUserService.deleteUser(Number(req.body.id));
                console.log(user);
                if (user === "notExist") {
                    res.status(200).json({
                        data: {},
                        status: "User does not exist"
                    });
                    res.end();
                }
                else {
                    res.status(200).json({
                        data: user,
                        status: "User deleted"
                    });
                    res.end();
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map