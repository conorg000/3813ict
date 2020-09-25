import { Time } from '@angular/common';

export class Message {
    user:string;
    time:Date;
    content:string;
    constructor(user:string='', time:Date=null, content:string=''){
        this.user = user;
        this.time = time;
        this.content = content;
    }
}