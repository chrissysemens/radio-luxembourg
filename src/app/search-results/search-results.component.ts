import { Component, Input } from '@angular/core';
import { TrackComponent } from '../tracks/track.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})

export class SearchResultsComponent {

    constructor(){}
    @Input() searchResults;
}
