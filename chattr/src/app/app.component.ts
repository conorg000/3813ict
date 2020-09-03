import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chattr';
  currentUser:User;
  username:string = "";
  birthdate:string = "";
  age:number = 0;
  email:string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    //console.log(this.currentUser);
    if(this.currentUser){
      this.email = this.currentUser.email;
      this.username = this.currentUser.username;
      this.birthdate = this.currentUser.birthdate;
      this.age = this.currentUser.age;
    }
    
  }

  signOut(){
    // Remove current user and set blank in local storage
    sessionStorage.setItem('currentUser', '');
    // Navigate to home
    this.router.navigate(['/login']);
    window.location.reload();
  }

}
