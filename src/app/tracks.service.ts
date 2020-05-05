import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  getAllNext(url: string): Observable<any> {
    return this.http.get(`https://cors-anywhere.herokuapp.com/${url}`);
  }
  getAllPrev(url: string): Observable<any> {
    return this.http.get(`https://cors-anywhere.herokuapp.com/${url}`);
  }
}
