export class Auto {
 
    id :number;
    make:string ;
   model:string;
   capacity: number;
   isactive:boolean;
   price: Float32Array;
   license: string;
   picture:string ;
   place: number;

    constructor(id:number,make:string,model:string ,capacity:number , isactive:boolean , price: Float32Array , license:string , picture:string ,place:number) {
        this.id = id;
        this.make =make;
        this.model = model;
        this.capacity = capacity;
        this.isactive = isactive;
        this.price = price;
        this.license = license;
        this.picture = picture;
        this.place= place;
      }

}