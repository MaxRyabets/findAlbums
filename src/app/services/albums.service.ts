import { Injectable } from '@angular/core';
import {HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DeezerAlbum, DeezerAlbums, ITunesAlbum, ITunesAlbums} from '../shared/interfaces';
import {DeezerAlbumService} from './deezer-album.service';
import {ItunesAlbumService} from './itunes-album.service';


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  constructor(
    private http: HttpClient,
    private deezerAlbum: DeezerAlbumService,
    private itunesAlbum: ItunesAlbumService,
    private httpJsonp: HttpClientJsonpModule
  ) { }
  private proxy = 'https://cors-anywhere.herokuapp.com/';
  private urlDeezer = 'https://api.deezer.com/search/album';
  private urlITunes = 'https://itunes.apple.com/search?term=';

  private ulrTrackDeezer = 'https://api.deezer.com/album/';

  getData(): Observable<any>{
    const url = 'https://api.deezer.com/search/album?q=eminem';
    return this.http.jsonp(url, 'callback').pipe(
      map(res => {
        return res;
      })
    );
  }
  getDataDeezerAlbums(name: string): Observable<DeezerAlbums> {
        return this.deezerAlbum.getDataDeezerAlbums(this.proxy, name);
  }

  getDataITunesAlbums(name: string): Observable<ITunesAlbums> {
    return this.itunesAlbum.getDataITunesAlbums(this.proxy, name);
  }

  createDeezerAlbum(dataAlbum: DeezerAlbum){
    return this.deezerAlbum.createDeezerAlbum(dataAlbum);
  }

  createITunesAlbum(dataAlbum: ITunesAlbum){
    return this.itunesAlbum.createITunesAlbum(dataAlbum);
  }

  getNextDeezerAlbums(urlNextData: string): Observable<DeezerAlbums> {
    return this.deezerAlbum.getNextDataDeezerAlbums(this.proxy, urlNextData);
  }

  getAllNextPrev(url: string, name: string, limit: number): Observable<any> {
    return forkJoin([
      this.http.get(`${this.proxy}${url}`),
      this.http.get(`${this.proxy}${this.urlITunes}${name}&entity=album&limit=${limit}`)
    ]).pipe(
      map(([res1, res2]) => !res1.hasOwnProperty('data') ? [res2, res1] : [res1, res2])
    );
  }

  getAlbumsTracks(id: string): Observable<any> {
    console.log(`${this.proxy}${this.urlDeezer}/${id}/tracks`);
    return this.http.get(`${this.proxy}${this.ulrTrackDeezer}${id}/tracks`);
  }
}
