import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';
import { Playlist } from '../types/playlist';
import { AddTracksToPlaylistRequest } from '../request-types/playlist-add-tracks';
import { ReplacePlaylistTracksRequest } from '../request-types/playlist-replace-tracks';
import { DeleteTracksFromPlaylistRequest } from '../request-types/playlist-delete-tracks';

const baseUrl = 'https://api.spotify.com/v1/playlists';

const routes = {
    tracks: (playlistId: string) => `/${playlistId}/tracks`,
};

@Injectable()
export class PlaylistService extends HttpService<any>{
    
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    addTracks(playlistId: string, uris: Array<string>, position?: number) {
        console.log()
        const body = new AddTracksToPlaylistRequest(uris, position);
        return this.post(routes.tracks(playlistId), body);
    }

    replaceTracks(playlistId: string, uris: Array<string>) {
        const body = new ReplacePlaylistTracksRequest(uris);
        return this.post(routes.tracks(playlistId), body);
    }

    getTracks(playlistId: string) {
        return this.query(routes.tracks(playlistId));
    }

    removeTracks(playlistId: string, uris: Array<string>) {
        const body = new DeleteTracksFromPlaylistRequest(uris);
        return this.delete(routes.tracks(playlistId), uris);
    }
}