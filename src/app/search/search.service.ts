import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { HttpParams } from '@angular/common/http';
import { SearchTypes } from '../enums/search-types';
import { Track } from '../types/track';

const baseUrl = 'https://api.spotify.com/v1';
const routes = {
    search: () => `/search`,
};

@Injectable()
export class SearchService extends DataService<any> {
    constructor(http: HttpClient) {
        super(http, baseUrl, routes.search());
    }

    searchAlbums(searchText: string){
        let params = new HttpParams();
        params = params.append('q', searchText);
        params = params.append('type', SearchTypes.Album);
    }

    searchArtists(searchText: string){
        let params = new HttpParams();
        params = params.append('q', searchText);
        params = params.append('type', SearchTypes.Artist);
    }

    searchPlaylists(searchText: string){
        let params = new HttpParams();
        params = params.append('q', searchText);
        params = params.append('type', SearchTypes.Playlist);
    }

    searchTracks(searchText: string){
        let params = new HttpParams();
        params = params.append('q', searchText);
        params = params.append('type', SearchTypes.Track);

        let tracks = new Array<Track>();
        
        this.query(params)
            .subscribe((data: any) => {     
                data.tracks.items.map((item: any) => {
                    let track = new Track(item.id, 
                                          item.name, 
                                          item.artists, 
                                          item.album.images[2]);
                    tracks.push(track);
                });
            });

        return tracks;
    }
}