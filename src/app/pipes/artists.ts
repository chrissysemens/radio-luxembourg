import {Pipe, PipeTransform} from '@angular/core';


/***
 * A pipe that concatanates the array of artists provided 
 * by Spotify's Api into a single 'Artists' string.
 */
@Pipe ({
   name : 'artists'
})
export class ArtistsPipe implements PipeTransform {
   transform(artists: Array<any>) : string {
        let artistString = '';

        for (let index = 0; index < artists.length; index++) {
  
            artistString += artists[index].name;

            if (index !== artists.length - 1) {
                artistString += ', ';
            }
        }
        return artistString;
   }
}