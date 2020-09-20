import { Component, OnInit } from '@angular/core';
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

  constructor(private authservice:AuthService) { }
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

  deleteUser(user:User){
    console.log('Deleting User with id ' + user.id);
    this.authservice.deleteUser(user.id);
  }

  editUser(user:User){
    // do stuff
  }

  // Consider adding this to template
  // (ngModelChange)="checkvalidid($event)"
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
