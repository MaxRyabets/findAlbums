import { Pipe, PipeTransform } from '@angular/core';
import {DeezerAlbum} from '../interfaces';

@Pipe({
  name: 'sortDeezerAlbumsTitle'
})
export class SortDeezerAlbumsTitlePipe implements PipeTransform {

  transform(itunesAlbums: DeezerAlbum[]): DeezerAlbum[] {
    return itunesAlbums.sort( (a, b) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
  }

}
