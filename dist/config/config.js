"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    connection() {
        const conexionString = `postgres://${process.env.USER_DATABASE}:${process.env.PASSWORD_DATABASE}@${process.env.HOST_DATABASE}:${process.env.PORT_DATABASE}/${process.env.NAME_DATABASE}`;
        return conexionString;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map