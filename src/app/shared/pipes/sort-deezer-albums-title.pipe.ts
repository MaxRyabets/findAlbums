import { Pipe, PipeTransform } from '@angular/core';
import {DeezerAlbum} from '../interfaces';

@Pipe({
  name: 'sortDeezerAlbumsTitle'
})
export class SortDeezerAlbumsTitlePipe implements PipeTransform {

  transform(deezerAlbums: DeezerAlbum[]): DeezerAlbum[] {
    return deezerAlbums.sort( (a, b) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
  }

}
