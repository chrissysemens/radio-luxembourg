import { Component, Input,OnChanges } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Track } from '../types/track';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})

export class SearchResultsComponent {

    constructor(){}
    @Input() searchResults;
}
