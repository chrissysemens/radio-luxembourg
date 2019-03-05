import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { Playlist } from '../types/playlist';
import { AddTracksToPlaylistRequest } from '../requests/playlist-add-tracks';
import { ReplacePlaylistTracksRequest } from '../requests/playlist-replace-tracks';

const baseUrl = 'https://api.spotify.com/v1/playlists';

const routes = {
    tracks: (playlistId: string) => `/${playlistId}/tracks`,
};

@Injectable()
export class PlaylistService extends DataService<Playlist>{
    
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    addTracks(playListId: string, uris: Array<string>, position: number) {

        const body = new AddTracksToPlaylistRequest(uris, position);

        this.post(routes.tracks(playListId), body);
    }

    replaceTracks(playlistId: string, uris: Array<string>) {

        const body = new ReplacePlaylistTracksRequest(uris);

        this.post(routes.tracks(playlistId), body);
    }
}