import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
  email:string = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Try getting current user from local storage, then set local variables with data
    // Otherwise user is not logged in
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if(this.currentUser){
        this.email = this.currentUser.email;
        this.username = this.currentUser.username;
      }
    }
    catch(err){
      console.log("Not logged in");
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
