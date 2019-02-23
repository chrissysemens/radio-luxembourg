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
                    // Not Yet Implemented
                    break; 
                } 
                case SearchTypes.Artist: { 
                    // Not Yet Implemented
                    break; 
                } 
                case SearchTypes.Playlist: { 
                    // Not Yet Implemented
                    break; 
                    } 
                case SearchTypes.Track: { 

                    let tracks = this.searchService.searchTracks(this.searchText);
                    this.searched.emit(tracks);

                    break; 
                    } 
                default: { 
                    // Not Yet Implemented
                    break; 
                } 
            }
        }
    }
}

