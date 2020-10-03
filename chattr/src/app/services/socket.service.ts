import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../message';
import * as io from 'socket.io-client';
import { Group } from '../group';
import { Room } from '../room';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor(private http:HttpClient) { }

  
  addMessage(message:Message){
    console.log('Sending message to server');
    return this.http.post<any>('http://localhost:3000/api/addmessage', {message: message});
  }

  public initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  public send(message:Message){
    console.log('SENDING...');
    this.socket.emit('message', message);
  }

  public sendStatus(username:string):void{
    this.socket.emit('username', username);
  }

  public onMessage():Observable<any>{
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:Message)=> observer.next(data));
    });
    return observable;
  }

  public onStatus():Observable<any>{
    let observeStatus = new Observable(observer=>{
      this.socket.on('username', (data:string)=> observer.next(data));
    });
    return observeStatus;
  }

  
}
