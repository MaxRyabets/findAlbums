import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumsService } from './services/albums.service';
import {Observable, Subscription} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AlbumTracks, Artist, DeezerAlbum, DeezerAlbums, ITunesAlbum, ITunesAlbums} from './shared/interfaces';

enum NEXT_PREV {
  NEXT = 1,
  PREV = 0
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(
    private albumsService: AlbumsService
  ) { }

  dSub: Subscription;
  iSub: Subscription;
  form: FormGroup;
  defaultArtist = 'eminem';
  dataNext: string;
  dataDeezerPrev = '';
  dataITunesPrev = '';
  itunesAlbums: ITunesAlbum[] = [];
  deezerAlbums: DeezerAlbum[] = [];
  currentArtiest: Artist[] = [];
  albumTracks: AlbumTracks[] = [];
  querySearch: string;
  itunesPageSize: number;
  results: Observable<DeezerAlbum[]>;
  NEXT_PREV = NEXT_PREV;

  ngOnInit(): void {
    this.formControls();
  }

  private formControls() {
    this.form = new FormGroup({
      querySearch: new FormControl(null, Validators.required)
    });
  }

  private testy(){
    this.results = this.albumsService.getData();
    console.log('This is test', this.results);
  }

  submit() {
    this.querySearch = this.form.getRawValue().querySearch;
    this.dSub = this.albumsService.getDataDeezerAlbums(this.querySearch).subscribe(dataDeezerAlbums => {
      this.currentArtiest.length = 0;
      console.log('This is Deezer albums ', dataDeezerAlbums);
      this.addDeezerAlbums(dataDeezerAlbums);
    });
    this.iSub = this.albumsService.getDataITunesAlbums(this.querySearch).subscribe(dataITunesAlbums => {
      console.log('This is ITunes albums ', dataITunesAlbums);
      this.addITunesAlbums(dataITunesAlbums);
      this.itunesPageSize = dataITunesAlbums.resultCount;
    });
  }

  private addDeezerAlbums(dataDeezerAlbums: DeezerAlbums) {
    this.deezerAlbums = this.albumsService.createDeezerAlbum(dataDeezerAlbums.data);
    this.addDeezerArtistAlbum(dataDeezerAlbums.data);
    this.dataNext = dataDeezerAlbums.next;
  }

  private addDeezerArtistAlbum(dataDeezerAlbums: DeezerAlbum) {
    if (!this.currentArtiest.length) {
      this.currentArtiest.push(dataDeezerAlbums[0].artist);
    }
  }

  private addITunesAlbums(dataITunesAlbums: ITunesAlbums) {
    this.itunesAlbums = this.albumsService.createITunesAlbum(dataITunesAlbums.results);
  }

  public getNextPrevDeezerAlbums(action: NEXT_PREV){
    let actionNextPrev: string;
    actionNextPrev = action === 0 ? this.dataDeezerPrev : this.dataNext;
    this.albumsService.getNextDeezerAlbums(actionNextPrev).subscribe(dataDeezerAlbums => {
      this.addDeezerAlbums(dataDeezerAlbums);
      if (action === 0 && !dataDeezerAlbums.hasOwnProperty('prev')) {
        this.dataDeezerPrev = '';
        return;
      }
      this.dataDeezerPrev = dataDeezerAlbums.prev;
    });
  }
  public getNextPrevITunesAlbums(action: NEXT_PREV){
    if (action === 0) {
      this.itunesPageSize -= 25;
    } else {
      this.itunesPageSize += 25;
    }
    this.albumsService.getNextITunesAlbums(this.querySearch, this.itunesPageSize).subscribe(dataITunesAlbums => {
      this.addITunesAlbums(dataITunesAlbums);
      console.log('This is ITUNES', this.itunesAlbums);
      if (this.itunesPageSize <= this.itunesAlbums.length + 5) {
        console.log('This is size ', this.itunesPageSize);
        console.log('This is len itunes album', this.itunesAlbums.length);
        this.itunesAlbums.splice(0, this.itunesPageSize - 25);
      } else {
        this.itunesPageSize = 0;
        this.itunesAlbums.splice(25, this.itunesAlbums.length - 1);
      }

      if (action === 0 && this.itunesPageSize === 25) {
        this.dataITunesPrev = '';
        return;
      }
      this.dataITunesPrev = '1';
    });
    //this.itunesAlbums = this.albumsService.filterCountITunesAlbums(this.itunesAlbums, this.itunesPageSize);
  }

  getTracks(id: number, $event: MouseEvent) {
    // @ts-ignore
    this.dSub = this.albumsService.getAlbumsTracks(id).subscribe(tracks => {
      console.log(tracks);
      this.albumTracks.push(tracks.data);
    });
  }

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.iSub) {
      this.iSub.unsubscribe();
    }
  }
}
