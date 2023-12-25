export class Tweet {
  constructor(
    private _id: string,
    private _content: string,
    private _type: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get content(): string {
    return this._content;
  }

  public get type(): string {
    return this._type;
  }

  public toJson() {
    return {
      id: this.id,
      content: this.content,
      type: this.type,
    };
  }
}
