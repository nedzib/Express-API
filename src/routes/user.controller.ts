/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */

import express from "express"
import { getSchema, postSchema, putSchema, deleteSchema } from "./user.validate"
import { UserService } from "../services/user.service"

export class UserController {
    // Metodo de la clase ControllerEntidad
    public routes(app: any) {
        // Endpoint get all users
        app.route('/user/list').get(async (req: express.Request, res: express.Response) => {
            const objUserService: UserService = new UserService()
            const allUsers = await objUserService.getListUser()
            res.status(200).json({
                data: allUsers,
                status: null
            })
            res.end()
        })
        // Endpoint get
        app.route('/user').get(async (req: express.Request, res: express.Response) => {
            const validation = getSchema.validate(req.query)
            if (validation.error) {
                res.status(422).json({
                    data: null,
                    status: validation.error.message
                })
                res.end()
            } else {
                try {
                    const objUserService: UserService = new UserService()
                    const user = await objUserService.getUser(Number(req.query.id))
                    res.status(200).json({
                        data: user,
                        status: null
                    })
                    res.end()
                } catch (error) {
                    res.status(500).json({
                        data: null,
                        status: error
                    })
                    res.end()
                }

            }
        })
        // Endpoint post
        app.route('/user').post(async (req: express.Request, res: express.Response) => {
            const validation = postSchema.validate(req.body)
            if (validation.error) {
                console.log("Error in Valitation")
                res.status(422).json({
                    data: null,
                    status: validation.error.message
                }).end()
            } else {
                const objUserService: UserService = new UserService()
                const user = await objUserService.createUser(Number(req.body.id), req.body.name)

                if (user === "exist") {
                    res.status(200).json({
                        data: {},
                        status: "User already exist"
                    })
                    res.end()
                } else {
                    res.status(201).json({
                        data: user,
                        status: "User created"
                    })
                    res.end()
                }
            }
        })
        // Endpoint put
        app.route('/user').put(async (req: express.Request, res: express.Response) => {
            const validation = putSchema.validate(req.body)
            if (validation.error) {
                res.status(422).json({
                    data: null,
                    status: validation.error.message
                })
                res.end()
            } else {
                const objUserService: UserService = new UserService()
                const user = await objUserService.editUser(Number(req.body.id), req.body.name)
                if (user === "notExist") {
                    res.status(200).json({
                        data: {},
                        status: "User does not exist"
                    })
                    res.end()
                } else {
                    res.status(200).json({
                        data: user,
                        status: "User edited"
                    })
                    res.end()
                }
            }
        })
        // Endpoint delete
        app.route('/user').delete(async (req: express.Request, res: express.Response) => {
            const validation = deleteSchema.validate(req.body)
            if (validation.error) {
                console.log("Validation Error")
                res.status(422).json({
                    data: null,
                    status: validation.error.message
                })
                res.end()
            } else {
                const objUserService: UserService = new UserService()
                const user = await objUserService.deleteUser(Number(req.body.id))
                if (user === "notExist") {
                    res.status(200).json({
                        data: {},
                        status: "User does not exist"
                    })
                    res.end()
                } else {
                    res.status(200).json({
                        data: user,
                        status: "User deleted"
                    })
                    res.end()
                }
            }
        })
    }
}