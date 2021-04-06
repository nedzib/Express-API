/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */

import App from "./app"
import dotenv from "dotenv"
dotenv.config()

const objApp= new App()

const port = process.env.SERVER_PORT||3000

objApp.app.listen(port, ()=>{
    console.log(`API - SEMILLERO inicializada en http://localhost:${port}`)
})