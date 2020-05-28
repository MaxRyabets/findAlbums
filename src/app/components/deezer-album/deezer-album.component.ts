import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeezerAlbumService} from './shared/deezer-album.service';
import {NEXT_PREV} from '../shared/enum-next-prev';
import {DeezerAlbum, DeezerAlbums} from './shared/deezer-albums.interfaces';

@Component({
  selector: 'app-deezer-album',
  templateUrl: './deezer-album.component.html',
  styleUrls: ['./deezer-album.component.css']
})
export class DeezerAlbumComponent implements OnInit {
  @Input() deezerAlbums: DeezerAlbum[];
  @Input() dataNextDeezerAlbums: string;
  @Output() addDeezAlbums: EventEmitter<DeezerAlbums> = new EventEmitter<DeezerAlbums>();

  NEXT_PREV = NEXT_PREV;
  dataDeezerPrevAlbums = '';

  constructor(
    private deezerAlbum: DeezerAlbumService
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

  getTracks(id: number, $event: MouseEvent) {
    // @ts-ignore
    this.dSub = this.albumsService.getAlbumsTracks(id).subscribe(tracks => {
      console.log(tracks);
      // this.albumTracks.push(tracks.data);
    });
  }
}
