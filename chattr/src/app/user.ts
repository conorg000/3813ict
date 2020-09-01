export class User {
    email:string;
    birthdate:string;
    age:number;
    username:string
    pwd:string;
    valid:boolean;
    constructor(email:string='', birthdate:string='', age:number=0, username:string='', pwd:string='', valid=false){
        this.email = email;
        this.birthdate = birthdate;
        this.age = age;
        this.username = username;
        this.pwd = pwd;
        this.valid = valid;
    }
}