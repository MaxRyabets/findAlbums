import { Component, OnInit } from '@angular/core';
import { TracksService } from './tracks.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Artiest, DeezerAlbum, ITunes} from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private tracksService: TracksService
  ) { }
  pSub: Subscription;
  dSub: Subscription;
  form: FormGroup;
  em = 'eminem';
  dataNext: string;
  dataPrev = '';
  itunesAlbums: ITunes[] = [];
  deezerAlbums: DeezerAlbum[] = [];
  currentArtiest: Artiest[] = [];
  querySearch: string;
  itunesPageSize: number;

  page = 1;
  pageSize = 25;

   static sortDeezerITunesAlbums(a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }

  ngOnInit(): void {
    this.formControls();
  }

  private formControls() {
    this.form = new FormGroup({
      querySearch: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.dataNext = '';
    this.dataPrev = '';
    this.currentArtiest.length = 0;

    this.querySearch = this.form.getRawValue().querySearch;
    this.pSub = this.tracksService.getAllData(this.querySearch).subscribe(dataAlbum => {
      if (dataAlbum[0].hasOwnProperty('data')){
        this.beginDeezer(dataAlbum[0]);
        this.addITunesArtistAlbum(dataAlbum[1]);
        this.sortAlbum();
        this.itunesPageSize = dataAlbum[1].resultCount;
      } else {
        this.beginDeezer(dataAlbum[1]);
        this.addITunesArtistAlbum(dataAlbum[0]);
        this.itunesPageSize = dataAlbum[0].resultCount;
      }
    });
  }

  private beginDeezer(dataAlbum: any) {
    this.addDeezerArtistAlbum(dataAlbum.data);
    this.dataNext = dataAlbum.next;
  }

  private addDeezerArtistAlbum(dataAlbum: object) {
    this.deezerAlbums = this.tracksService.createDeezerAlbum(dataAlbum);
    if (!this.currentArtiest.length) {
      this.currentArtiest.push({picture: dataAlbum[0].artist.picture, name: dataAlbum[0].artist.name});
    }
  }

  private sortAlbum() {
    this.deezerAlbums.sort( (a, b) => {
      return AppComponent.sortDeezerITunesAlbums(a.title, b.title);
    });
    this.itunesAlbums.sort( (a, b) => {
      return AppComponent.sortDeezerITunesAlbums(a.collectionName, b.collectionName);
    });
  }

  nextPrevAlbum($event: MouseEvent) {
    let prevNext: string;
    // @ts-ignore
    if ($event.target.id === 'prev'){
      prevNext = this.dataPrev;
      // maximum amount of data per site deezer with one request = 25 => itunes
      this.itunesPageSize -= 25;
    } else {
      prevNext = this.dataNext;
      this.itunesPageSize += 25;
      console.log('This is add to itnunes page size', this.itunesPageSize);
    }
    this.pSub = this.tracksService.getAllNextPrev(prevNext, this.querySearch, this.itunesPageSize).subscribe(dataAlbum => {
      this.addDeezerArtistAlbum(dataAlbum[0].data);
      this.addITunesArtistAlbum(dataAlbum[1]);
      this.sortAlbum();
      this.dataNext = dataAlbum[0].next;
      if (!dataAlbum[0].hasOwnProperty('prev')){
        this.dataPrev = '';
        return;
      }
      this.dataPrev = dataAlbum[0].prev;
    });
  }

  private addITunesArtistAlbum(dataAlbum: object) {
    this.itunesAlbums = this.tracksService.createITunesAlbum(dataAlbum)[1];
  }

}
