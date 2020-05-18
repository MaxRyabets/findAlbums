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
  dataPrev = '';
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
    actionNextPrev = action === 0 ? this.dataPrev : this.dataNext;
    this.albumsService.getNextDeezerAlbums(actionNextPrev).subscribe(dataDeezerAlbums => {
      this.addDeezerAlbums(dataDeezerAlbums);
      if (action === 0 && !dataDeezerAlbums.hasOwnProperty('prev')) {
        this.dataPrev = '';
        return;
      }
      this.dataPrev = dataDeezerAlbums.prev;
    });
  }

  nextPrevAlbum($event: MouseEvent) {
    /*let prevNext: string;
    // @ts-ignore
    if ($event.target.id === 'prev'){
      prevNext = this.dataPrev;
      // maximum amount of data per site deezer with one request = 25 => itunes
      this.itunesPageSize -= 25;
    } else {
      prevNext = this.dataNext;
      this.itunesPageSize += 25;
    }
    this.ngxService.start();
    this.albumsService.getAllNextPrev(prevNext, this.querySearch, this.itunesPageSize).subscribe(dataAlbum => {
      this.addDeezerArtistAlbum(dataAlbum[0].data);
      this.addITunesArtistAlbum(dataAlbum[1]);
      this.sortAlbum();
      this.dataNext = dataAlbum[0].next;
      if (!dataAlbum[0].hasOwnProperty('prev')){
        this.dataPrev = '';
        this.ngxService.stop();
        return;
      }
      this.dataPrev = dataAlbum[0].prev;
      this.ngxService.stop();
    });*/
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
