import { Injectable } from '@angular/core';
import {HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ITunesAlbum, ITunesAlbums} from '../components/itunes-album/shared/itunes-albums.interfaces';
import {DeezerAlbumService} from '../components/deezer-album/shared/deezer-album.service';
import {ItunesAlbumService} from '../components/itunes-album/shared/itunes-album.service';
import {DeezerAlbum, DeezerAlbums} from '../components/deezer-album/shared/deezer-albums.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  constructor(
    private http: HttpClient,
    private deezerAlbumService: DeezerAlbumService,
    private itunesAlbumService: ItunesAlbumService,
  ) { }
  /*private urlDeezer = 'https://api.deezer.com/search/album';
  private ulrTrackDeezer = 'https://api.deezer.com/album/';*/

  getDataDeezerAlbums(name: string): Observable<DeezerAlbums> {
        return this.deezerAlbumService.getDataDeezerAlbums(name);
  }

  getDataITunesAlbums(name: string): Observable<ITunesAlbums> {
    return this.itunesAlbumService.getDataITunesAlbums(name);
  }

  createDeezerAlbum(dataAlbum: DeezerAlbum){
    return this.deezerAlbumService.createDeezerAlbum(dataAlbum);
  }

  createITunesAlbum(dataAlbum: ITunesAlbum){
    return this.itunesAlbumService.createITunesAlbum(dataAlbum);
  }

  /*getAlbumsTracks(id: string): Observable<any> {
    console.log(`${this.urlDeezer}/${id}/tracks`);
    return this.http.get(`${this.ulrTrackDeezer}${id}/tracks`);
  }*/
}
