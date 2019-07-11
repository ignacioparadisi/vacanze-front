export class Veh_Model {

    id: number;
    capacity: number;
    modelName: string;
    picture: string;
    brandId: number;

    constructor(id: number, capacity: number, modelName:string, picture: string, brandId: number) {
        this.id = id;
        this.capacity = capacity;
        this.modelName = modelName;
        this.picture = picture;
        this.brandId = brandId;
    }

}