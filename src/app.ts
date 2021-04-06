/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */

import { UserController } from "./routes/user.controller"
import express from "express"
import logger from "morgan"

export default class App {
    // Variables de la clase App
    public app: express.Application
    public userRoutes: UserController = new UserController()
    // Constructor
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(logger('dev'))
        this.userRoutes.routes(this.app)
    }
}