import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Group } from '../group';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  email:string;
  username:string;
  pwd:string;
  room:string;
  message:string;
  group:string;
  roomname:string;

  constructor(private http:HttpClient) { }

  login(email:string, pwd:string){
    return this.http.post<User>('http://localhost:3000/api/auth', { email: email, pwd: pwd });
  }

  userData(username:string){
    return this.http.post('http://localhost:3000/api/userdata', { username: username });
  }

  groupData(){
    return this.http.post('http://localhost:3000/api/groupdata', {});
  }

  sendMsg(username:string, message:string, group:string, roomname:string){
    return this.http.post('http://localhost:3000/api/sendmsg', {username:username, message:message, group:group, roomname:roomname});
  }

  // Routes for User management
  addUser(user:User){
    return this.http.post<any>('http://localhost:3000/api/adduser', user);
  }

  getUsers(){
    return this.http.get<any>('http://localhost:3000/api/getusers');
  }

  deleteUser(user:User){
    console.log("DELETING " + user.id);
    return this.http.post<any>('http://localhost:3000/api/deleteuser', user);
  }

  updateUser(user){
    return this.http.post<any>('http://localhost:3000/api/updateuser', user);
  }

  // Routes for Group/Room management
  getGroups(){
    return this.http.get<any>('http://localhost:3000/api/getgroups');
  }
  
  addGroup(group:Group){
    return this.http.post<any>('http://localhost:3000/api/addgroup', group);
  }

  addRoom(group:Group, room:string){
    return this.http.post<any>('http://localhost:3000/api/addroom', {group:group, newroom:room});
  }

  deleteGroup(group:Group){
    return this.http.post<any>('http://localhost:3000/api/deletegroup', {group:group});
  }
}