export class reservationRestaurant{

    public _id: number
    public _cant: string

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
  
    public get id(): number {
        return this._id;
    }
    
    public set id(value: number) {
        this._id = value;
    }
      
    public get name(): string {
        return this._cant;
    }
      
    public set name(value: string) {
        this._cant = value;
    }

}