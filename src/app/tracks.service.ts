import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  constructor(
    private http: HttpClient
  ) { }
  private proxy = 'https://cors-anywhere.herokuapp.com/';

  getAllData(name: string): Observable<any> {
    return forkJoin([
      this.http.get(`${this.proxy}https://api.deezer.com/search/album?q=${name}`),
      this.http.get(`${this.proxy}https://itunes.apple.com/search?term=${name}&entity=album&limit=25`)
    ]);
  }
  /* Query for one api */
  /*getAll(name: string): Observable<any> {
    return this.http.get(`${this.proxy}https://api.deezer.com/search/album?q=${name}`);
  }*/

  getAllNextPrev(url: string, name: string, limit: number): Observable<any> {
    return forkJoin([
      this.http.get(`${this.proxy}${url}`),
      this.http.get(`${this.proxy}https://itunes.apple.com/search?term=${name}&entity=album&limit=${limit}`)
    ]);
  }

  createDeezerAlbum(dataAlbum: object){
    return Object.values(dataAlbum).map(data => ({
      cover: data.cover,
      title: data.title,
      explicit_lyrics: data.explicit_lyrics
    }));
  }

  createITunesAlbum(dataAlbum: object){
    return Object.values(dataAlbum).map(res => {
        return Object.values(res).map(key => ({
        // @ts-ignore
          artworkUrl60: key.artworkUrl60,
        // @ts-ignore
          collectionName: key.collectionName,
        // @ts-ignore
          collectionPrice: key.collectionPrice
      }));
    });
  }
}
