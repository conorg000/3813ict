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
  email:string = "";
  pwd:string = "";
  errormsg = "";
  newuser:User;
  currentUser:User;

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
  }

  itemClicked() {
    //console.log(this.email);
    //let data = this.http.post<User>('http://localhost:3000/api/auth', { email: this.userEmail, pwd: this.userPw });
    this.authservice.login(this.email, this.pwd).subscribe(
      data=>{
        if (data.valid == true){
          this.newuser = new User(data.email, data.username, data.role);
          //console.log(data);
          sessionStorage.setItem('currentUser', JSON.stringify(this.newuser));
          this.router.navigate(['/account']);
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
