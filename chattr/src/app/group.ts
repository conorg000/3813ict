import { Room } from './room';
export class Group {
    // Group name is unique
    name:string;
    rooms:Room[];
    groupmembers:string[];
    constructor(name:string='', rooms:Room[]=[], groupmembers:string[]=[]){
        this.name = name;
        this.rooms = rooms;
        this.groupmembers = groupmembers;
    }
}