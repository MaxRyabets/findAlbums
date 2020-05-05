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

  getAll(name: string): Observable<any> {
    return this.http.get(`${this.proxy}https://api.deezer.com/search/album?q=${name}`);
  }
  // return this.http.get(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${name}&entity=album&limit=25=`);
  getAllNextPrev(url: string): Observable<any> {
    return this.http.get(`${this.proxy}${url}`);
  }
  createAlbum(dataAlbum: object){
    return Object.values(dataAlbum).map(data => ({
      cover: data.cover,
      title: data.title,
      explicit_lyrics: data.explicit_lyrics
    }));
  }
}
