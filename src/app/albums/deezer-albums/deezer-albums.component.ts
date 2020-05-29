import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeezerAlbumsService} from './shared/deezer-albums.service';
import {NEXT_PREV} from '../shared/enum-next-prev';
import {DeezerAlbum, DeezerAlbums} from './shared/deezer-albums.interfaces';

@Component({
  selector: 'app-deezer-albums',
  templateUrl: './deezer-albums.component.html',
  styleUrls: ['./deezer-albums.component.css']
})
export class DeezerAlbumsComponent implements OnInit {
  @Input() deezerAlbums: DeezerAlbum[];
  @Input() dataNextDeezerAlbums: string;
  @Output() addDeezAlbums: EventEmitter<DeezerAlbums> = new EventEmitter<DeezerAlbums>();

  NEXT_PREV = NEXT_PREV;
  dataDeezerPrevAlbums = '';
  idAlbumTracks: number;
  deezerAlbumTracklist: string;

  constructor(
    private deezerAlbum: DeezerAlbumsService
  ) { }

  ngOnInit(): void {}

  public getNextPrevDeezerAlbums(action: NEXT_PREV){
    let actionNextPrev: string;
    actionNextPrev = action === 0 ? this.dataDeezerPrevAlbums : this.dataNextDeezerAlbums;
    this.deezerAlbum.getNextDataDeezerAlbums(actionNextPrev).subscribe(dataDeezerAlbums => {
      this.addDeezAlbums.emit(dataDeezerAlbums);
      if (action === 0 && !dataDeezerAlbums.hasOwnProperty('prev')) {
        this.dataDeezerPrevAlbums = '';
        return;
      }
      this.dataDeezerPrevAlbums = dataDeezerAlbums.prev;
    });
  }

  getAlbumTracks(tracklist: string, id: number) {
    this.idAlbumTracks = id;
    this.deezerAlbumTracklist = tracklist;
  }
}
