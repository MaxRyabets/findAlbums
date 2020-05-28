import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ITunesAlbum, ITunesAlbums} from '../itunes-album/shared/itunes-albums.interfaces';
import {DeezerAlbumService} from '../deezer-album/shared/deezer-album.service';
import {ItunesAlbumService} from '../itunes-album/shared/itunes-album.service';
import {DeezerAlbum, DeezerAlbums} from '../deezer-album/shared/deezer-albums.interfaces';


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
      return this.deezerAlbumService.getDataDeezerAlbums(name).pipe(
        catchError(this.handleError<DeezerAlbums>('search deezer albums'))
      );
  }

  getDataITunesAlbums(name: string): Observable<ITunesAlbums> {
    return this.itunesAlbumService.getDataITunesAlbums(name).pipe(
      catchError(this.handleError<ITunesAlbums>('search itunes albums'))
    );
  }

  createDeezerAlbum(dataAlbum: DeezerAlbum){
    return this.deezerAlbumService.createDeezerAlbum(dataAlbum);
  }

  createITunesAlbum(dataAlbum: ITunesAlbum){
    return this.itunesAlbumService.createITunesAlbum(dataAlbum);
  }

  handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return throwError(
        'Something bad happened; please try again later.');
    };
  }
  /*getAlbumsTracks(id: string): Observable<any> {
    console.log(`${this.urlDeezer}/${id}/tracks`);
    return this.http.get(`${this.ulrTrackDeezer}${id}/tracks`);
  }*/
}
