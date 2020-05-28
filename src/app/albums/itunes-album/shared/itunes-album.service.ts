import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ITunesAlbum, ITunesAlbums} from './itunes-albums.interfaces';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ItunesAlbumService {

  constructor(
    private http: HttpClient
  ) { }

  private urlITunes = 'https://itunes.apple.com/search?term=';
  getDataITunesAlbums(name: string): Observable<ITunesAlbums> {
    return this.http.get<ITunesAlbums>(`${this.urlITunes}${name}&entity=album&limit=25`);
  }

  getNextDataITunesAlbums(name: string, limit: number): Observable<ITunesAlbums> {
    return this.http.get<ITunesAlbums>(`${this.urlITunes}${name}&entity=album&limit=${limit}`);
  }

  createITunesAlbum(dataAlbum: ITunesAlbum){
    return Object.values(dataAlbum).map(data => ({
      artworkUrl60: data.artworkUrl60,
      collectionName: data.collectionName,
      collectionPrice: data.collectionPrice
    }));
  }
}
