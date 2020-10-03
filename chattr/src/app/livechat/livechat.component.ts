import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { isObservable } from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  messagecontent:string="";
  // Initialise this to the room's chat history
  messages:string[] = [];
  livestatus:string[] = [];
  ioConnection:any;
  currentUser:User;

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
    // When a message arrives, add it to the array of chat history
    // Save to mongoDB every time??
    this.ioConnection = this.socketService.onMessage().subscribe((message:string) => {
      this.messages.push(message);
      // add message to DB
    });
  }

  chat(messagecontent){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;
    }else{
      console.log("No message");
    }
  }
}
