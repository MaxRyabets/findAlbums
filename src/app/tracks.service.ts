import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(name: string): Observable<any> {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${name}`);
  }
  getAllNextPrev(url: string): Observable<any> {
    return this.http.get(`https://cors-anywhere.herokuapp.com/${url}`);
  }
  createAlbum(dataAlbum: object){
    return Object.values(dataAlbum).map(data => ({
      cover: data.cover,
      title: data.title,
      explicit_lyrics: data.explicit_lyrics
    }));
  }
}
