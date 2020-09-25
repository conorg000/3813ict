export class Group {
    // Group name is unique
    name:string;
    rooms:string[];
    constructor(name:string='', rooms:string[]=[]){
        this.name = name;
        this.rooms = rooms;
    }
}