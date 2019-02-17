import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})

export class SearchComponent {

    constructor(private searchService: SearchService){}

    searchText: string;

    searchKeyUp(event: Event){
        if(this.searchText.length > 5){

            let params = new HttpParams();
            params = params.append('q', this.searchText);
            params = params.append('type', 'track');

            this.searchService.query(params).subscribe(resp => {console.log(resp)});
        }
    }
}
