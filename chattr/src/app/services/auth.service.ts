import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Group } from '../group';
import { ThrowStmt } from '@angular/compiler';
import { Room } from '../room';

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

  login(username:string, pwd:string){
    return this.http.post<User>('http://localhost:3000/api/auth', { username: username, pwd: pwd });
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

  addRoom(group:Group, room:Room){
    return this.http.post<any>('http://localhost:3000/api/addroom', {group:group, newroom:room});
  }

  deleteGroup(group:Group){
    return this.http.post<any>('http://localhost:3000/api/deletegroup', {group:group});
  }

  deleteRoom(group:Group, room:Room){
    return this.http.post<any>('http://localhost:3000/api/deleteroom', {group:group, room:room});
  }

  addUserGroup(group:Group, username:string){
    return this.http.post<any>('http://localhost:3000/api/addusergroup', {group:group, username:username});
  }

  addUserRoom(group:Group, room:Room, username:string){
    return this.http.post<any>('http://localhost:3000/api/adduserroom', {group:group, room:room, username:username});
  }

  removeUserGroup(group:Group, username:string){
    return this.http.post<any>('http://localhost:3000/api/removeusergroup', {group:group, username:username});
  }

  removeUserRoom(room:Room, username:string){
    return this.http.post<any>('http://localhost:3000/api/removeuserroom', {room:room, username:username});
  }

  addGroupAssis(group:Group, groupassis:string){
    return this.http.post<any>('http://localhost:3000/api/addgroupassis', {group:group, groupassis:groupassis});
  }
}