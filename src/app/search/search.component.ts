import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from './search.service';
import { SearchTypes } from '../enums/search-types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})

export class SearchComponent {

    @Input() type: string;
    @Output() searched = new EventEmitter();
    constructor(private searchService: SearchService){}

    searchText: string;

    searchKeyUp(){
        if(this.searchText.length > 5){
            switch(this.type) { 
                case SearchTypes.Album: { 

                    let albums = this.searchService.searchAlbums(this.searchText);
                    this.searched.emit(albums);
                    break; 
                } 
                case SearchTypes.Artist: { 

                    let artists = this.searchService.searchArtists(this.searchText);
                    this.searched.emit(artists);
                    break; 
                } 
                case SearchTypes.Playlist: { 

                    let playlists = this.searchService.searchPlaylists(this.searchText);
                    this.searched.emit(playlists);
                    break; 
                } 
                case SearchTypes.Track: { 
                    
                    let tracks = this.searchService.searchTracks(this.searchText);
                    this.searched.emit(tracks);
                    break; 
                    } 
                default: { 
                    break; 
                } 
            }
        }
    }
}

