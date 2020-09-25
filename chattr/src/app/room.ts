import { Message } from './message';
export class Room {
    // Room name + parent form unique composite key
    name:string;
    parent:string; // The name of the group to which the room belongs
    roommembers:string[];
    chat:Message[];
    constructor(name:string='', parent:string='', roommembers:string[]=[], chat:Message[]=[]){
        this.name = name;
        this.parent = parent;
        this.roommembers = roommembers;
        this.chat = chat;
    }
}