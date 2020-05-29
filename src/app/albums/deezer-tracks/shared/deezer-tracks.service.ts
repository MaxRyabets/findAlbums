import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {DeezerTracksData} from './deezer.tracks.interface';

@Injectable({
  providedIn: 'root'
})
export class DeezerTracksService {

  constructor(
    private http: HttpClient
  ) { }

  getAlbumsTracks(tracklist: string): Observable<DeezerTracksData> {
    return this.http.jsonp<DeezerTracksData>(`${tracklist}&output=jsonp`, 'callback');
  }

  createDeezerAlbumTracklist(tracks: DeezerTracksData) {
    return Object.values(tracks.data).map(data => ({
      title: data.title,
      link: data.link,
      duration: data.duration,
      track_position: data.track_position,
      disk_number: data.disk_number,
      preview: data.preview
    }));
  }
}
