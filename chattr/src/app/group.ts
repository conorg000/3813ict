import { Room } from './room';
export class Group {
    // Group name is unique
    name:string;
    rooms:Room[];
    groupmembers:string[];
    groupassis:string[];
    constructor(name:string='', rooms:Room[]=[], groupmembers:string[]=[], groupassis:string[]=[]){
        this.name = name;
        this.rooms = rooms;
        this.groupmembers = groupmembers;
        this.groupassis = groupassis;
    }
}