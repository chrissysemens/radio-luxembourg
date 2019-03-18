import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';
import { HttpParams } from '@angular/common/http';
import { SearchTypes } from '../enums/search-types';
import { Album } from '../types/album';
import { Artist } from '../types/artist';
import { Playlist  } from '../types/playlist';
import { Track } from '../types/track';

const baseUrl = 'https://api.spotify.com/v1';
const routes = {
    search: () => `/search`,
};

@Injectable()
export class SearchService extends HttpService<any> {
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    searchAlbums(searchText: string){
        let params = new HttpParams();
        params = params.append('q', searchText);
        params = params.append('type', SearchTypes.Album);

        let albums = new Array<Album>();

        this.query(routes.search(), params)
            .subscribe((data: any) => {     
                data.albums.items.map((item: any) => {
                    let album = new Album(item.id, 
                                          item.name,
                                          item.artists,
                                          item.images[2],
                                          item.tracks);
                    albums.push(album);
                });
            });

        return albums;
    }

    searchArtists(searchText: string){
        let params = new HttpParams();
        params = params.append('q', searchText);
        params = params.append('type', SearchTypes.Artist);

        let artists = new Array<Artist>();
        
        this.query(routes.search(), params)
            .subscribe((data: any) => {     
                data.artists.items.map((item: any) => {
                    let artist = new Artist(item.id, 
                                          item.name);
                    artists.push(artist);
                });
            });

        return artists;
    }

    searchPlaylists(searchText: string){
        let params = new HttpParams();
        params = params.append('q', searchText);
        params = params.append('type', SearchTypes.Playlist);

        let playlists = new Array<Playlist>();

        this.query(routes.search(), params)
            .subscribe((data: any) => {     
                data.playlists.items.map((item: any) => {
                    let playlist = new Playlist(item.id, 
                                          item.name,
                                          item.owner,
                                          item.tracks,
                                          item.uri);
                    playlists.push(playlist);
                });
            });
        
        return playlists;
    }

    searchTracks(searchText: string){
        let params = new HttpParams();
        params = params.append('q', searchText);
        params = params.append('type', SearchTypes.Track);

        let tracks = new Array<Track>();
        
        this.query(routes.search(), params)
            .subscribe((data: any) => {     
                data.tracks.items.map((item: any) => {
                    let track = new Track(item.id, 
                                          item.name, 
                                          item.artists, 
                                          item.album.images[2],
                                          item.uri,
                                          item.duration_ms);
                    tracks.push(track);
                });
            });

        return tracks;
    }
}