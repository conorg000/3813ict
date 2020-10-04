import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { isObservable } from 'rxjs';
import { User } from '../user';
import { Group } from '../group';
import { Room } from '../room';
import { Message } from '../message';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  messagecontent:string="";
  messages:Message[] = [];
  livestatus:string[] = [];
  ioConnection:any;
  currentUser:User;
  time:string;
  groups:Group[] = [];
  selectedgroup:string = '';
  selectedroom:string = '';
  msgtosend:Message;

  constructor(private socketService:SocketService, private router:Router, private authservice:AuthService) { }

  // On load get current user. start sockets connection, get groups data
  // Else if user not logged in re-route to login
  ngOnInit(){
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.initIoConnection();
      this.getUserGroups();
    }
    catch(err){
      console.log("Not logged in");
      this.router.navigateByUrl('/login');
    }
  }

  // Select messages to load
  // User chooses group and room combo from form
  // Retrieve corresponding chat history and set as messages array
  chooseChat(){
    for (var i =0; i < this.groups.length; i++){
      if (this.groups[i].name == this.selectedgroup){
        for (var j = 0; j < this.groups[i].rooms.length; j++){
          if (this.groups[i].rooms[j].name == this.selectedroom){
            this.messages = this.groups[i].rooms[j].chat;
          }
        }
      }
    }
  }

  // Sockets initialisation
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
    });
    // When a message arrives, add it to the array of chat history
    this.ioConnection = this.socketService.onMessage().subscribe((message:Message) => {
      // If the room/group matches the current room/group, add it to the array
      if (message.group == this.selectedgroup && message.room == this.selectedroom){
        this.messages.push(message);
      }
    });
  }

  // Send a message via sockets
  // Creates Message class, adds it to MongoDB chat history, then sends it via sockets
  chat(messagecontent){
    if(this.messagecontent){
      this.time = new Date().toLocaleString();
      this.msgtosend = new Message(this.currentUser.username, this.time, this.messagecontent, this.selectedgroup, this.selectedroom);
      // Save message to room chat in Mongo
      this.socketService.addMessage(this.msgtosend).subscribe(data =>{
        console.log(data);
      });
      console.log(this.msgtosend);
      console.log('Sending to Mongo');

      // Send message via sockets
      this.socketService.send(this.msgtosend);
      console.log('Sending to socket');

      this.messagecontent = null;
    }else{
      console.log("No message");
    }
  }

  // Retrieve groups and rooms for the current user
  getUserGroups(): void{
    this.authservice.getGroups().subscribe(data=>{
      this.groups = data;
    });
  }


}
