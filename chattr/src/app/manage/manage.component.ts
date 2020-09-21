import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../services/auth.service';

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

  constructor(private authservice:AuthService, private router:Router) { }
  users: User[];

  ngOnInit() {
    this.getUsers();
  }

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
    })
  }

}
