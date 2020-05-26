import { Injectable } from '@angular/core';
import {HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DeezerAlbum, DeezerAlbums, ITunesAlbum, ITunesAlbums} from '../shared/interfaces';
import {DeezerAlbumService} from '../components/deezer-album/shared/deezer-album.service';
import {ItunesAlbumService} from '../components/itunes-album/shared/itunes-album.service';


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

  getAlbumsTracks(id: string): Observable<any> {
    console.log(`${this.proxy}${this.urlDeezer}/${id}/tracks`);
    return this.http.get(`${this.proxy}${this.ulrTrackDeezer}${id}/tracks`);
  }
}
