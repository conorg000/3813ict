import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { isObservable } from 'rxjs';
import { User } from '../user';
import { Message } from '../message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  messagecontent:string="";
  // Initialise this to the room's chat history
  messages:Message[] = [];
  livestatus:string[] = [];
  ioConnection:any;
  currentUser:User;
  time:string;
  group:string = 'testgroup';
  room:string = 'test room';

  constructor(private socketService:SocketService, private router:Router) { }

  ngOnInit(){
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.initIoConnection();
      //this.getGroups();
      //this.getUsers();
    }
    catch(err){
      console.log("Not logged in");
      this.router.navigateByUrl('/login');
    }
    
  }

  private initIoConnection(){
    this.socketService.initSocket();
    // Send the current username to other sockets upon connection to share the live status
    this.socketService.sendStatus(this.currentUser.username);
    // Keep looking to see if other users have logged in to the room
    // If they have logged in and their name is new to our list, then send them our current username
    this.ioConnection = this.socketService.onStatus().subscribe((username:string) => {
      if (!this.livestatus.includes(username)){
        this.livestatus.push(username);
        this.socketService.sendStatus(this.currentUser.username);
      }
      // add message to DB
    });
    // When a message arrive, add it to the array of chat history
    this.ioConnection = this.socketService.onMessage().subscribe((message:Message) => {
      // If the room/group matches the current room/group, add it to the array
      this.messages.push(message);
    });
  }

  chat(messagecontent){
    if(this.messagecontent){
      this.time = new Date().toLocaleString()
      this.socketService.send(new Message(this.currentUser.username, this.time, this.messagecontent, this.group, this.room));
      // Save to mongoDB every time it is sent
      this.messagecontent = null;
    }else{
      console.log("No message");
    }
  }
}
