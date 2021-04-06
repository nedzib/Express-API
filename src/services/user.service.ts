/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */

import { Client } from 'pg'
import { Config } from "../config/config"

const listUser = [
    {
        id: 1,
        name: "Ned",
    },
    {
        id: 2,
        name: "Lula",
    },
    {
        id: 3,
        name: "Nil",
    }
]

export class UserService {
    private id: number
    private name: string

    constructor() {
        this.id = -1
        this.name = ""
    }

    public getUser = async (userId: number): Promise<any> => {
        if (userId < 0) {
            throw new Error("internal_server_error")
        }
        const objConfig: Config = new Config()
        // Instancia de la clase Client para la base de datos
        const client: Client = new Client({ connectionString: objConfig.connection() })
        // Conexion a la base de datos
        client.connect((err) =>{
            if (err){
                console.log("Conexion")
                throw new Error("internal_server_error")
            }
        })
        try {
            const result = await client.query(`SELECT * FROM users WHERE id = '${userId}' AND status = 'true'`)
            if(result.rows.length === 1){
                this.id = result.rows[0].id
                this.name = result.rows[0].name
            }
        } catch (error){
            throw new Error("internal_server_error")
        }
        // listUser.forEach(element => {
        //     if (element.id === userId) {
        //         this.id = element.id
        //         this.name = element.name
        //     }
        // })
        return {
            id: this.id,
            name: this.name
        }
    }

    // public getListUser = (): any => {
    //     return listUser
    // }

    // public createUser = (userId: number, userName: string): any => {
    //     let ifExist: boolean = false
    //     listUser.forEach(element => {
    //         if (element.id === userId) {
    //             ifExist = true
    //         }
    //     })
    //     if (!ifExist) {
    //         const newUser = {
    //             id: userId,
    //             name: userName
    //         }
    //         listUser.push(newUser)
    //         return newUser
    //     } else {
    //         return "exist"
    //     }
    // }

    // public editUser = (userId: number, userName: string): any => {
    //     let ifExist: boolean = false
    //     let userEdited: any = ""

    //     listUser.forEach((element, index) => {
    //         if (element.id === userId) {
    //             ifExist = true
    //             userEdited = {
    //                 id: userId,
    //                 name: userName
    //             }
    //             element.name = userEdited.name
    //             listUser[index] = element
    //         }
    //     })
    //     if (!ifExist) {
    //         return "notExist"
    //     } else {
    //         return userEdited
    //     }
    // }

    // public deleteUser = (userId: number): any => {
    //     let ifExist: boolean = false
    //     let userDeleted: any = ""
    //     listUser.forEach((element, index) => {
    //         if (element.id === userId) {
    //             ifExist = true
    //             userDeleted = {
    //                 id: element.id,
    //                 name: element.name
    //             }
    //             listUser.splice(index, 1);
    //         }
    //     })
    //     if (!ifExist) {
    //         return "notExist"
    //     } else {
    //         return userDeleted
    //     }
    // }
}