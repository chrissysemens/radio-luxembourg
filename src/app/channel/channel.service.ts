import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Channel } from '../types/channel';

const routes = {
    add: () => `/channels`,
    getAll: () => `/channels`
};

@Injectable()
export class ChannelService{

   constructor(private fs: AngularFirestore) {}

   create(channel: Channel){
        const obj = JSON.parse(JSON.stringify(channel));
        return this.fs.collection('channels').add(obj);
    }

    getAll(){
        return this.fs.collection(routes.getAll());
    }
}