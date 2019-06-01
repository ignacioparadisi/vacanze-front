export class reservationHour{

    private _id:string
    private _hour: string

    constructor(id: string, name: string) {
      this._id = id;
      this._hour = name;
    }

    public get id(): string {
      return this._id;
    }
    public set id(value: string) {
      this._id = value;
    }
    
    public get hour(): string {
      return this._hour;
    }
    public set hour(value: string) {
      this._hour = value;
    }
}