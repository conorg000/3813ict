import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  email:string;
  username:string;
  pwd:string;

  constructor(private http:HttpClient) { }

  login(email:string, pwd:string){
    return this.http.post<User>('http://localhost:3000/api/auth', { email: email, pwd: pwd });
  }

  userData(username:string){
    return this.http.post<User>('http://localhost:3000/api/userdata', { username: username });
  }
}
