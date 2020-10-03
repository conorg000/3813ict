import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../message';
import * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() { }

  public initSocket(): void{
    this.socket = io(SERVER_URL);
  }

  public send(message:Message):void{
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
