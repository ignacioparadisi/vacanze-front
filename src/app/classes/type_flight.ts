export class TypeFlight {
    private _id: number;
    private _name: string;
  


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
      return this._name;
    }
    public set name(value: string) {
      this._name = value;
    }
  }
