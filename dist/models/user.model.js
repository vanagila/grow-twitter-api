"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    _id;
    _name;
    _username;
    _email;
    _password;
    constructor(_id, _name, _username, _email, _password) {
        this._id = _id;
        this._name = _name;
        this._username = _username;
        this._email = _email;
        this._password = _password;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get username() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    toJson() {
        return {
            id: this._id,
            name: this._name,
            username: this._username,
            email: this._email,
        };
    }
}
exports.User = User;
