import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  currentUser:User;
  username:string = "";
  birthdate:string = "";
  age:number = 0;
  email:string = '';

  constructor(private router: Router) { }

  ngOnInit(){
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if(this.currentUser){
        this.email = this.currentUser.email;
        this.username = this.currentUser.username;
        this.birthdate = this.currentUser.birthdate;
        this.age = this.currentUser.age;
      }
    }
    catch(err){
      console.log("Not logged in");
      this.router.navigateByUrl('/login');
    }
  }

  nav(){
    this.router.navigateByUrl('/account');
  }

}
