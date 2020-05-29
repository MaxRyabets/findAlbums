import {Component, Input, OnInit} from '@angular/core';
import {DeezerTracks} from './shared/deezer.tracks.interface';
import {DeezerTracksService} from './shared/deezer-tracks.service';

@Component({
  selector: 'app-deezer-tracks',
  templateUrl: './deezer-tracks.component.html',
  styleUrls: ['./deezer-tracks.component.css']
})
export class DeezerTracksComponent implements OnInit {

  @Input() deezerAlbumTracklist: string;

  deezerAlbumsTracks: DeezerTracks[];
  constructor(
    private deezerTracksService: DeezerTracksService
  ) { }

  ngOnInit(): void {
    this.deezerTracksService.getAlbumsTracks(this.deezerAlbumTracklist).subscribe(tracks => {
      this.deezerAlbumsTracks = this.deezerTracksService.createDeezerAlbumTracklist(tracks);
    });
  }

}
