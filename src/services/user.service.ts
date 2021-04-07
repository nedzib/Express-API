/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */

import { Client } from 'pg'
import { Config } from "../config/config"

export class UserService {
    private id: number
    private name: string

    constructor() {
        this.id = -1
        this.name = ""
    }

    public getUser = async (userId: number): Promise<any> => {
        if (userId < 0) {
            throw new Error("Internal_server_error")
        }
        const objConfig: Config = new Config()
        // Instancia de la clase Client para base de datos
        const client: Client = new Client({ connectionString: objConfig.connection() })
        // Conexion a base de datos
        client.connect((error) => {
            if (error) {
                throw new Error('internal_server_error')
            }
        })
        try {
            const result = await client.query(`SELECT * FROM users WHERE id = '${userId}' AND status = 'true'`)
            if (result.rows.length === 1) {
                this.id = result.rows[0].id
                this.name = result.rows[0].name
            }
        } catch (error) {
            throw new Error('internal_server_error')
        }
        return {
            'id': this.id,
            'name': this.name
        }
    }

    public getListUser = async (): Promise<any> => {
        let listUser: any = ''
        const objConfig: Config = new Config()
        // Instancia de la clase Client para base de datos
        const client: Client = new Client({ connectionString: objConfig.connection() })
        // Conexion a base de datos
        client.connect((error) => {
            if (error) {
                throw new Error('internal_server_error')
            }
        })
        try {
            const result = await client.query(`SELECT * FROM users WHERE status = 'true'`)
            listUser = result.rows
        } catch (error) {
            throw new Error('internal_server_error')
        }
        return listUser
    }

    public createUser = async (userId: number, userName: string): Promise<any> => {
        if (userId < 0) {
            throw new Error("Internal_server_error")
        }
        const objConfig: Config = new Config()
        // Instancia de la clase Client para base de datos
        const client: Client = new Client({ connectionString: objConfig.connection() })
        // Conexion a base de datos
        client.connect((error) => {
            if (error) {
                throw new Error('internal_server_error')
            }
        })
        try {
            const result = await client.query(`SELECT * FROM users WHERE id = '${userId}'`)
            if (result.rowCount >= 1) {
                return "exist"
            } else {
                client.query(`insert into users (id,name,status) values ('${userId}','${userName}',true) `)
                return {
                    'id': userId,
                    'name': userName
                }
            }
        } catch (error) {
            throw new Error('internal_server_error')
        }
    }

    public editUser = async (userId: number, userName: string): Promise<any> => {
        if (userId < 0) {
            throw new Error("Internal_server_error")
        }
        const objConfig: Config = new Config()
        // Instancia de la clase Client para base de datos
        const client: Client = new Client({ connectionString: objConfig.connection() })
        // Conexion a base de datos
        client.connect((error) => {
            if (error) {
                throw new Error('internal_server_error')
            }
        })
        try {
            let result = await client.query(`SELECT * FROM users WHERE id = '${userId}'`)
            if (result.rowCount === 0) {
                return "notExist"
            } else {
                client.query(`UPDATE users SET name ='${userName}' where id=${userId}`)
                client.query(`UPDATE users SET status ='true' where id=${userId}`)
                result = await client.query(`SELECT * FROM users WHERE id = '${userId}'`)
                return result.rows
            }
        } catch (error) {
            throw new Error('internal_server_error')
        }
    }

    public deleteUser = async (userId: number): Promise<any> => {
        if (userId < 0) {
            throw new Error("Internal_server_error")
        }
        const objConfig: Config = new Config()
        // Instancia de la clase Client para base de datos
        const client: Client = new Client({ connectionString: objConfig.connection() })
        // Conexion a base de datos
        client.connect((error) => {
            if (error) {
                throw new Error('internal_server_error')
            }
        })
        try {
            let result = await client.query(`SELECT * FROM users WHERE id = '${userId}'`)
            if (result.rowCount === 0) {
                return "notExist"
            } else {
                client.query(`UPDATE users SET status = false where id=${userId}`)
                result = await client.query(`SELECT * FROM users WHERE id = '${userId}'`)
                return result.rows
            }
        } catch (error) {
            throw new Error('internal_server_error')
        }
    }
}