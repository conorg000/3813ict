export class Message {
    // Message class
    user:string;
    time:string;
    content:string;
    group:string;
    room:string;
    constructor(user:string='', time:string='', content:string='', group:string='', room:string=''){
        this.user = user;
        this.time = time;
        this.content = content;
        this.group = group;
        this.room = room;
    }
}