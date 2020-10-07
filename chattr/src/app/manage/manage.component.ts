import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { Group } from '../group';
import { Room } from '../room';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageComponent implements OnInit {
  currentUser:User;
  userid:number=null;
  username:string="";
  useremail:string="";
  userrole:string="";
  userpwd:string="";
  uservalid:boolean=null;
  newuser:User;
  selecteduser:string="";
  newgroup:Group;
  groupname:string="";
  grouprooms:any=[];
  newroomname:string="";
  newroom:Room;
  selectedgroupassis:string="";
  maxid:number=0;

  constructor(private authservice:AuthService, private router:Router) { }
  users: User[];
  groups:Group[];

  // On load, try getting currentUser from local storage
  // Also get groups and users data
  // Else redirect to login page
  ngOnInit() {
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.getGroups();
      this.getUsers();
    }
    catch(err){
      console.log("Not logged in");
      this.router.navigateByUrl('/login');
    }
  }

  // User functions

  // Retrieve users from MongDB
  getUsers(): void{
    this.authservice.getUsers().subscribe(data=>{
      this.users = data;
      for (var i = 0; i < this.users.length; i++){
        if (this.users[i].id >= this.maxid){
          this.maxid = this.users[i].id;
        }
      }
      this.maxid = this.maxid + 1;
      console.log(this.maxid);
    });
  }

  // Delete user from DB when button pressed
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

  // Add a new user to the database when form submitted
  // Then reset the variables used in form
  addnewUser(event){
    event.preventDefault();

    this.newuser = new User(this.useremail, this.username, this.userrole, this.maxid, this.userpwd, this.uservalid);
    this.authservice.addUser(this.newuser).subscribe((data)=>{
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
    window.location.reload();
  }


  // Group/channel functions

  // Retrieve groups and rooms
  getGroups(): void{
    this.authservice.getGroups().subscribe(data=>{
      this.groups = data;
    })
  }

  // Add new group when form is submitted
  addnewGroup(event){
    event.preventDefault();
    this.newgroup = new Group(this.groupname);
    this.authservice.addGroup(this.newgroup).subscribe((data)=>{
      if(data.err == null){
        console.log("added group");
      }
      this.groupname = "";
      window.location.reload();
    });
  }

  // Add room when form is submitted
  addnewRoom(group:Group){
    this.newroom = new Room(this.newroomname, group.name);
    this.authservice.addRoom(group, this.newroom).subscribe((data)=>{
      console.log(data);
      if(data.err == null){
        console.log("added room");
      }
      this.newroomname = "";
      this.newroom = null;
      window.location.reload();
    });
  }

  // Delete group when button pressed
  deleteGroup(group:Group){
    console.log('Deleting group with name ' + group.name);
    this.authservice.deleteGroup(group).subscribe((data)=>{
      console.log(data);
    });
  }

  // Delete room when button pressed
  deleteRoom(group:Group, room:Room){
    this.authservice.deleteRoom(group, room).subscribe((data)=>{
      console.log(data);
    })
  }

  // Add a user to a group
  addUserGroup(group:Group){
    console.log(this.selecteduser);
    this.authservice.addUserGroup(group, this.selecteduser).subscribe((data)=>{
      console.log(data);
      if(data.err == null){
        console.log("added user to group");
      }
      this.selecteduser = null;
    });
  }

  // Remove user from group when form submitted
  removeUserGroup(group:Group){
    this.authservice.removeUserGroup(group, this.selecteduser).subscribe((data)=>{
      console.log(data);
    });
    this.selecteduser = null;
  }

  // Add a groupmember to a room
  addUserRoom(group:Group, room:Room){
    console.log(this.selecteduser);
    this.authservice.addUserRoom(group, room, this.selecteduser).subscribe((data)=>{
      console.log(data);
      if(data.err == null){
        console.log("added user to room");
      }
      this.selecteduser = null;
    });
  }

  // Remove a user from room
  removeUserRoom(room:Room){
    console.log(room);
    console.log(this.selecteduser);
    this.authservice.removeUserRoom(room, this.selecteduser).subscribe((data)=>{
      console.log(data);
    });
    this.selecteduser = null;
  }

  // Add a user to become group assistant
  addGroupAssis(group:Group){
    console.log(this.selectedgroupassis);
    this.authservice.addGroupAssis(group, this.selectedgroupassis).subscribe((data)=>{
      console.log(data);
    });
    this.selectedgroupassis = "";
  }

  // Remove an existing group assistant from the role
  removeGroupAssis(group:Group){
    this.authservice.removeGroupAssis(group, this.selectedgroupassis).subscribe((data)=>{
      console.log(data);
    });
    this.selectedgroupassis = "";
  }
}
