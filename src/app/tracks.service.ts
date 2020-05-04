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
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${name}`)
      .pipe(map( (response: {[key: string]: any}) => {
        return Object.values(response);
      }));
  }
}
