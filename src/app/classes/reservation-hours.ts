export class reservationHour{

    private _id:number
    private _hour: string

    constructor(id: number, name: string) {
      this._id = id;
      this._hour = name;
    }

    public get id(): number {
      return this._id;
    }
    public set id(value: number) {
      this._id = value;
    }
    
    public get hour(): string {
      return this._hour;
    }
    public set hour(value: string) {
      this._hour = value;
    }
}