export class User {
    // id and username are unique identifiers
    email:string;
    username:string;
    id:number;
    role:string;
    pwd:string;
    valid:boolean;
    constructor(email:string='', username:string='', role:string='', id:number=0,  pwd:string='', valid=false){
        this.email = email;
        this.username = username;
        this.id = id;
        this.role = role;
        this.pwd = pwd;
        this.valid = valid;
    }
}