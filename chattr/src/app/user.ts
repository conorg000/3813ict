export class User {
    email:string;
    birthdate:string;
    age:number;
    username:string
    pwd:string;
    valid:boolean;
    constructor(email:string='', username:string='', pwd:string='', valid=false){
        this.email = email;
        this.username = username;
        this.pwd = pwd;
        this.valid = valid;
    }
}