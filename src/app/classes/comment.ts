import { Travel} from './travel';
export class Comment {
    id: number;
    name: string;
    travel: Travel;
    userId: number;
    init: string;
    end: string;
    description: string;

    constructor(id: number, name: string, travel:Travel, userId: number, init: string, end: string, description: string){
        this.id = id;
        this.name = name;
        this.travel = travel;
        this.userId = userId;
        this.init = init;
        this.end = end;
        this.description = description;
    }

}