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
  usergroups:any;
  groups:any;
  chosenchat:any = [];
  chosengroup:string = "";
  message:string = "";
  //room:string;


  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if(this.currentUser){
        this.username = this.currentUser.username;
        this.role = this.currentUser.role;
        this.userGroups();
        this.groupData();
      }
    }
    catch(err){
      console.log("Not logged in");
      this.router.navigateByUrl('/login');
    }
  }

  userGroups(){
    this.authservice.userData(this.username).subscribe(
      data=>{
        this.usergroups = data;
      })
  }

  groupData(){
    this.authservice.groupData().subscribe(
      data=>{
        this.groups = data;
      })
  }
  
  seeChat(room, groupname){
    for (let i=0; i < this.groups.length; i++){
      if (groupname == this.groups[i].groupname){
        this.chosengroup = this.groups[i].groupname;
        for (let j=0; j < this.groups[i].rooms.length; j++){
          if (room == this.groups[i].rooms[j].roomname){
            this.chosenchat = this.groups[i].rooms[j];
            if (this.chosenchat.history[0] == []){
              this.chosenchat.history = '';
            }
            console.log(this.chosenchat);
          }
        }
      }
    } 
  }

  sendMsg(){
    console.log(this.message);
    if (this.chosengroup != ""){
      this.authservice.sendMsg(this.username, this.message, this.chosengroup, this.chosenchat.roomname).subscribe(
        (data: any)=>{
          if (data.valid == true){
            //window.location.reload();
            this.seeChat(this.chosenchat.roomname, this.chosengroup);
          }else{
            alert("Somethign went wrong!");
          }
        })
    }else{
      console.log('No room selected');
    }
  }



}
