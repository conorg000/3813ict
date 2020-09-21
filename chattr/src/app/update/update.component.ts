import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  // Retrieve the desired user's details
  userOrigin = JSON.parse(localStorage.getItem('user'));
  username:string="";
  useremail:string="";
  userrole:string="";
  userpwd:string="";
  uservalid:boolean=null;
  newuser:User;

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit() {
  }

  // Edit the user and re-route to Manage page
  // Pass the new user details, but use the original id
  editUser(event){
    event.preventDefault();
    this.newuser = new User(this.useremail, this.username, this.userrole, this.userOrigin.id, this.userpwd, this.uservalid);
    this.authservice.updateUser(this.newuser).subscribe(data=>{
      this.router.navigate(['manage']);
    })
  }

}
