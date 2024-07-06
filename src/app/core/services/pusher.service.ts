import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import * as APusher from 'pusher-js';
@Injectable({
  providedIn: 'root'
})
export class PusherService {
   private pusher!: Pusher;
   private channel!: Channel;
   channelName: string =  ''
   constructor() {
     this.pusher = new Pusher('ea80cde6e77453dc1bf5', {
       cluster: 'mt1',
     });
    }
  createCannel(){
    this.channel = this.pusher.subscribe(this.channelName);
   }
   bind(eventName: string, callback: (data: any) => void) {
     this.channel.bind(eventName, callback);
   }
 
   unbind(eventName: string) {
     this.channel.unbind(eventName);
   }
  //  subscribe(channelName: string): Channel {
  //   return this.pusher.subscribe(channelName);
  // }
}
