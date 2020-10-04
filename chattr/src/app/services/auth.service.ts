import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Group } from '../group';
import { ThrowStmt } from '@angular/compiler';
import { Room } from '../room';
import { Message } from '../message';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  email:string;
  username:string;
  pwd:string;
  room:string;
  group:string;
  roomname:string;

  constructor(private http:HttpClient) { }

  // Login route
  login(username:string, pwd:string){
    return this.http.post<User>('http://localhost:3000/api/auth', { username: username, pwd: pwd });
  }

  // Routes for User management
  // Add user
  addUser(user:User){
    return this.http.post<any>('http://localhost:3000/api/adduser', user);
  }

  // Get users
  getUsers(){
    return this.http.get<any>('http://localhost:3000/api/getusers');
  }

  // Delete user
  deleteUser(user:User){
    console.log("DELETING " + user.id);
    return this.http.post<any>('http://localhost:3000/api/deleteuser', user);
  }

  // Update user
  updateUser(user){
    return this.http.post<any>('http://localhost:3000/api/updateuser', user);
  }

  // Routes for Group/Room management
  // Get groups
  getGroups(){
    return this.http.get<any>('http://localhost:3000/api/getgroups');
  }
  
  // Add a group
  addGroup(group:Group){
    return this.http.post<any>('http://localhost:3000/api/addgroup', group);
  }

  // Add a room
  addRoom(group:Group, room:Room){
    return this.http.post<any>('http://localhost:3000/api/addroom', {group:group, newroom:room});
  }

  // Delete a group
  deleteGroup(group:Group){
    return this.http.post<any>('http://localhost:3000/api/deletegroup', {group:group});
  }

  // Delete a room
  deleteRoom(group:Group, room:Room){
    return this.http.post<any>('http://localhost:3000/api/deleteroom', {group:group, room:room});
  }

  // Add user to a group
  addUserGroup(group:Group, username:string){
    return this.http.post<any>('http://localhost:3000/api/addusergroup', {group:group, username:username});
  }

  // Add user to a room
  addUserRoom(group:Group, room:Room, username:string){
    return this.http.post<any>('http://localhost:3000/api/adduserroom', {group:group, room:room, username:username});
  }

  // Remove user from group
  removeUserGroup(group:Group, username:string){
    return this.http.post<any>('http://localhost:3000/api/removeusergroup', {group:group, username:username});
  }

  // Remvoe user from room
  removeUserRoom(room:Room, username:string){
    return this.http.post<any>('http://localhost:3000/api/removeuserroom', {room:room, username:username});
  }

  // Add group assistant
  addGroupAssis(group:Group, groupassis:string){
    return this.http.post<any>('http://localhost:3000/api/addgroupassis', {group:group, groupassis:groupassis});
  }

  // Remove group assistant
  removeGroupAssis(group:Group, groupassis:string){
    return this.http.post<any>('http://localhost:3000/api/removegroupassis', {group:group, groupassis:groupassis});
  }
}