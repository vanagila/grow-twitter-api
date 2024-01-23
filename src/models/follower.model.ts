export class Follower {
  constructor(private _id: string, private _followingId: string) {}

  public get id(): string {
    return this._id;
  }

  public get followingId(): string {
    return this._followingId;
  }
}
