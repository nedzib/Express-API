"use strict";
/**
 * Copyright (c) 2021
 *
 * Autor: Nedzib Sastoque
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
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
];
class UserService {
    constructor() {
        this.getUser = (userId) => {
            if (userId < 0) {
                throw new Error("internal_server_error");
            }
            listUser.forEach(element => {
                if (element.id === userId) {
                    this.id = element.id;
                    this.name = element.name;
                }
            });
            return {
                id: this.id,
                name: this.name
            };
        };
        this.getListUser = () => {
            return listUser;
        };
        this.createUser = (userId, userName) => {
            let ifExist = false;
            listUser.forEach(element => {
                if (element.id === userId) {
                    ifExist = true;
                }
            });
            if (!ifExist) {
                const newUser = {
                    id: userId,
                    name: userName
                };
                listUser.push(newUser);
                return newUser;
            }
            else {
                return "exist";
            }
        };
        this.editUser = (userId, userName) => {
            let ifExist = false;
            let userEdited = "";
            listUser.forEach((element, index) => {
                if (element.id === userId) {
                    ifExist = true;
                    userEdited = {
                        id: userId,
                        name: userName
                    };
                    element.name = userEdited.name;
                    listUser[index] = element;
                }
            });
            if (!ifExist) {
                return "notExist";
            }
            else {
                return userEdited;
            }
        };
        this.deleteUser = (userId) => {
            let ifExist = false;
            let userDeleted = "";
            listUser.forEach((element, index) => {
                if (element.id === userId) {
                    ifExist = true;
                    userDeleted = {
                        id: element.id,
                        name: element.name
                    };
                    listUser.splice(index, 1);
                }
            });
            if (!ifExist) {
                return "notExist";
            }
            else {
                return userDeleted;
            }
        };
        this.id = -1;
        this.name = "";
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map