import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { Group } from '../group';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageComponent implements OnInit {
  userid:number=null;
  username:string="";
  useremail:string="";
  userrole:string="";
  userpwd:string="";
  uservalid:boolean=null;
  newuser:User;
  newgroup:Group;
  groupname:string="";
  grouprooms:any=[];
  newroom:string="";

  constructor(private authservice:AuthService, private router:Router) { }
  users: User[];
  groups:Group[];

  ngOnInit() {
    this.getGroups();
    this.getUsers();
  }

  // User functions

  // Retrieve users from MongDB
  getUsers(): void{
    this.authservice.getUsers().subscribe(data=>{
      this.users = data;
    })
  }

  // Delete user from DB
  deleteUser(user:User){
    console.log('Deleting User with id ' + user.id);
    this.authservice.deleteUser(user).subscribe((data)=>{
      console.log(data);
    });
  }
  
  // Re-route to update page and edit user
  // Use localstorage to pass the user details on to the next page
  editUser(user:User){
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['update']);
  }

  // Consider adding this to template
  // (ngModelChange)="checkvalidid($event)"
  // Add a new user to the database
  addnewUser(event){
    event.preventDefault();
    this.newuser = new User(this.useremail, this.username, this.userrole, this.userid, this.userpwd, this.uservalid);
    this.authservice.addUser(this.newuser).subscribe((data)=>{
      console.log(data);
      if(data.err == null){
        console.log('Added, all good');
      }
      this.useremail = "";
      this.username = "";
      this.userrole = "";
      this.userid = null;
      this.userpwd = "";
      this.uservalid = null;
    });
  }


  // Group/channel functions
  
  // Retrieve groups and rooms
  getGroups(): void{
    this.authservice.getGroups().subscribe(data=>{
      this.groups = data;
    })
  }

  // Add new group
  addnewGroup(event){
    event.preventDefault();
    this.newgroup = new Group(this.groupname);
    this.authservice.addGroup(this.newgroup).subscribe((data)=>{
      console.log(data);
      if(data.err == null){
        console.log("added group");
      }
      this.groupname = "";
    });
  }

  // Add room
  addnewRoom(group:Group){
    console.log(group.name);
    console.log(group.rooms);
    console.log(this.newroom);
    this.authservice.addRoom(group, this.newroom).subscribe((data)=>{
      console.log(data);
      if(data.err == null){
        console.log("added room");
      }
      this.newroom = "";
    });
  }

  // Delete group
  deleteGroup(group:Group){
    console.log('Deleting group with name ' + group.name);
    this.authservice.deleteGroup(group).subscribe((data)=>{
      console.log(data);
    });
  }

  // Delete room
  deleteRoom(group:Group, room:string){
    this.authservice.deleteRoom(group, room).subscribe((data)=>{
      console.log(data);
    })
  }

  // Edit group
  editGroup(event){

  }

}
