"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
class Tweet {
    _id;
    _content;
    _type;
    constructor(_id, _content, _type) {
        this._id = _id;
        this._content = _content;
        this._type = _type;
    }
    get id() {
        return this._id;
    }
    get content() {
        return this._content;
    }
    get type() {
        return this._type;
    }
    toJson() {
        return {
            id: this.id,
            content: this.content,
            type: this._type,
        };
    }
}
exports.Tweet = Tweet;
