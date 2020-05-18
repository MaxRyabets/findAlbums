import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ITunesAlbum, ITunesAlbums} from '../shared/interfaces';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ItunesAlbumService {

  constructor(
    private http: HttpClient
  ) { }
  private urlITunes = 'https://itunes.apple.com/search?term=';
  getDataITunesAlbums(proxy: string, name: string): Observable<ITunesAlbums> {
    return this.http.get<ITunesAlbums>(`${proxy}${this.urlITunes}${name}&entity=album&limit=25`);
  }
  createITunesAlbum(dataAlbum: ITunesAlbum){
    return Object.values(dataAlbum).map(data => ({
      artworkUrl60: data.artworkUrl60,
      collectionName: data.collectionName,
      collectionPrice: data.collectionPrice
    }));
  }
}
