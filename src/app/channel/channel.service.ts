import { Injectable } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { Channel } from '../types/channel';
import { AngularFirestore } from '@angular/fire/firestore';

const routes = {
    add: () => `channels`,
    list: () => `channels`,
    get: (channelId: string) => `channels/${channelId}`
};

@Injectable()
export class ChannelService extends FirebaseService<Channel> {

    constructor(fs: AngularFirestore) {
        super(fs);
    }

    addChannel(channel: Channel){
        return this.add(routes.add(), channel);
    }

    listChannels(){
        return this.list(routes.list());
    }
}