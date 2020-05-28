import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeezerAlbum, DeezerAlbums} from './deezer-albums.interfaces';

@Injectable({
  providedIn: 'root'
})

export class DeezerAlbumService {
  constructor(
    private http: HttpClient
  ) { }

  private urlDeezer = 'https://api.deezer.com/search/album';
  getDataDeezerAlbums(name: string): Observable<DeezerAlbums> {
    return this.http.jsonp<DeezerAlbums>(`${this.urlDeezer}?q=${name}&output=jsonp`, 'callback');
  }

  getNextDataDeezerAlbums(urlNextData: string): Observable<DeezerAlbums> {
    return this.http.jsonp<DeezerAlbums>(`${urlNextData}&output=jsonp`, 'callback');
  }

  createDeezerAlbum(dataAlbum: DeezerAlbum){
    return Object.values(dataAlbum).map(data => ({
      id: data.id,
      cover: data.cover,
      title: data.title,
      explicit_lyrics: data.explicit_lyrics,
      tracklist: data.tracklist,
      artist: data.artist
    }));
  }
}
