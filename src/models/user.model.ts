import { Like } from "./like.model";
import { Tweet } from "./tweet.model";

export class User {
  constructor(
    private _id: string,
    private _name: string,
    private _username: string,
    private _email: string,
    private _password: string,
    private _tweet: Tweet,
    private _like: Like,
    private _authToken?: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get username(): string {
    return this._username;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get tweet(): Tweet {
    return this._tweet;
  }

  public get like(): Like {
    return this._like;
  }

  public get authToken(): string | undefined {
    return this._authToken;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      username: this._username,
      email: this._email,
      tweet: this._tweet,
      like: this._like,
      authToken: this._authToken,
    };
  }
}
