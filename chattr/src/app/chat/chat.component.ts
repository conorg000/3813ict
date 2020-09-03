import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUser:User;
  username:string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if(this.currentUser){
        this.username = this.currentUser.username;
      }
    }
    catch(err){
      console.log("Not logged in");
      this.router.navigateByUrl('/login');
    }
  }

}
