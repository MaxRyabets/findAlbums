import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeezerAlbum, DeezerAlbums} from '../shared/interfaces';

@Injectable()
export class DeezerAlbumService {

  constructor(
    private http: HttpClient
  ) { }

  private urlDeezer = 'https://api.deezer.com/search/album';
  getDataDeezerAlbums(proxy: string, name: string): Observable<DeezerAlbums> {
    return this.http.get<DeezerAlbums>(`${proxy}${this.urlDeezer}?q=${name}`);
  }

  getNextDataDeezerAlbums(proxy: string, urlNextData: string): Observable<DeezerAlbums> {
    return this.http.get<DeezerAlbums>(`${proxy}${urlNextData}`);
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
