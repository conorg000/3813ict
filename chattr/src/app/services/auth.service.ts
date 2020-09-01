import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  email:string;
  pwd:string;

  constructor(private http:HttpClient) { }

  login(email:string, pwd:string){
    return this.http.post<User>('http://localhost:3000/api/auth', { email: email, pwd: pwd});
  }
}
