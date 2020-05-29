import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NEXT_PREV} from '../shared/enum-next-prev';
import {ItunesAlbumsService} from './shared/itunes-albums.service';
import {ITunesAlbum, ITunesAlbums} from './shared/itunes-albums.interfaces';

@Component({
  selector: 'app-itunes-albums',
  templateUrl: './itunes-albums.component.html',
  styleUrls: ['./itunes-albums.component.css']
})
export class ItunesAlbumsComponent implements OnInit {

  @Input() querySearch: string;
  @Input() itunesAlbums: ITunesAlbum[];
  @Input() itunesPageSize: number;
  @Output() addITunesAlbums: EventEmitter<ITunesAlbums> = new EventEmitter<ITunesAlbums>();
  dataITunesPrev = '';
  NEXT_PREV = NEXT_PREV;
  constructor(
    private itunesAlbumService: ItunesAlbumsService
  ) { }

  ngOnInit(): void { }

  public getNextPrevITunesAlbums(action: NEXT_PREV){
    if (action === 0) {
      this.itunesPageSize -= 25;
    } else {
      this.itunesPageSize += 25;
    }
    this.itunesAlbumService.getNextDataITunesAlbums(this.querySearch, this.itunesPageSize)
      .subscribe(dataITunesAlbums => {
      this.addITunesAlbums.emit(dataITunesAlbums);
      // number 5 - error rate of the total number of pages
      if (this.itunesPageSize <= dataITunesAlbums.resultCount + 5 && this.itunesPageSize > 0) {
        this.itunesAlbums = this.itunesAlbums.filter((album, index) => {
          return index >= this.itunesPageSize;
        });
      } else {
        this.itunesAlbums = this.itunesAlbums.filter((album, index) => {
          return index <= this.itunesPageSize && index >= this.itunesPageSize - 25;
        });
      }

      if (action === 0 && this.itunesPageSize === 25) {
        this.dataITunesPrev = '';
        return;
      }
      // add random symbol for activation button dataITunesPrev
      this.dataITunesPrev = '1';
    });
  }
}
