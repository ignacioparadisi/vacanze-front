import { User } from './user';

export class Travel {
    id: number;
    name: string;
    user: User
    userId: number;
    init: string;
    end: string;
    description: string;

    constructor(id: number, name: string, user: User, userId: number, init: string, end: string, description: string){
        this.id = id;
        this.name = name;
        this.user = user;
        this.userId = userId;
        this.init = init;
        this.end = end;
        this.description = description;
    }
}