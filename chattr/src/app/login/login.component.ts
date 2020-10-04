import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string = "";
  pwd:string = "";
  errormsg = "";
  newuser:User;
  currentUser:User;

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
  }

  // When login form submitted, wait for response from server
  // If valid field is true, then store logged in user as currentUser and reroute to chat
  // Else, alert that name/pwd is wrong
  itemClicked() {
    console.log(this.username);
    console.log(this.pwd);
    this.authservice.login(this.username, this.pwd).subscribe(
      data=>{
        if (data.valid == true){
          this.newuser = new User(data.email, data.username, data.role, data.id, '', data.valid);
          //console.log(data);
          sessionStorage.setItem('currentUser', JSON.stringify(this.newuser));
          this.router.navigate(['/livechat']);
        }
        else{
          alert("Error: incorrect email or password");
        }
      },
      error=>{
        this.errormsg = "Error: incorrect email or password";
      }
    )
  }

}
