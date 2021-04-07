
export class Config{
    public connection ():string{
        const conexionString: string = `postgres://${process.env.USER_DATABASE}:${process.env.PASSWORD_DATABASE}@${process.env.HOST_DATABASE}:${process.env.PORT_DATABASE}/${process.env.NAME_DATABASE}`
        return conexionString
    }
}