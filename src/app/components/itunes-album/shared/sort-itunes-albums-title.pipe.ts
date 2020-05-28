import { Pipe, PipeTransform } from '@angular/core';
import {ITunesAlbum} from './itunes-albums.interfaces';

@Pipe({
  name: 'sortItunesAlbumsTitle'
})
export class SortItunesAlbumsTitlePipe implements PipeTransform {

  transform(deezerAlbums: ITunesAlbum[]): ITunesAlbum[] {
    return deezerAlbums.sort( (a, b) => {
      return a.collectionName.toLowerCase().localeCompare(b.collectionName.toLowerCase());
    });
  }

}
