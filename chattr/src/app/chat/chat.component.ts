import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUser:User;
  username:string = "";
  role:string = "";
  groups:any;

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if(this.currentUser){
        this.username = this.currentUser.username;
        this.role = this.currentUser.role;
        this.usergroups();
      }
    }
    catch(err){
      console.log("Not logged in");
      this.router.navigateByUrl('/login');
    }
  }

  usergroups(){
    this.authservice.userData(this.username).subscribe(
      data=>{
        this.groups = data;
      })
    console.log(this.groups);
  }

  seeChat(rooom){
    
  }





}
