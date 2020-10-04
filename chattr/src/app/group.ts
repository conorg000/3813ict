import { Room } from './room';
export class Group {
    // Group class
    // name is unique
    name:string;
    rooms:Room[]; // rooms is an array of Room classes
    groupmembers:string[]; // array of user names
    groupassis:string[]; // array of user names
    constructor(name:string='', rooms:Room[]=[], groupmembers:string[]=[], groupassis:string[]=[]){
        this.name = name;
        this.rooms = rooms;
        this.groupmembers = groupmembers;
        this.groupassis = groupassis;
    }
}