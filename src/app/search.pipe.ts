import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTracks'
})
export class SearchPipe implements PipeTransform {

  transform(tracks: [], search = ''): [] {
    if (!search.trim()) {
      return tracks;
    }
    /*return tracks.filter(track => {
      return
    })*/
    return null;
  }

}
