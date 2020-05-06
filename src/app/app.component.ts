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
  pSub: Subscription;
  dSub: Subscription;
  form: FormGroup;
  em = 'eminem';
  dataNext: string;
  dataPrev = '';
  itunesAlbums: ITunes[] = [];
  deezerAlbums: DeezerAlbum[] = [];
  currentArtiest: Artiest[] = [];

  constructor(
    private tracksService: TracksService
  ) { }

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
    const querySearch: string = this.form.getRawValue().querySearch;
    this.pSub = this.tracksService.getAllData(querySearch).subscribe(dataAlbum => {
      console.log(dataAlbum);
      if (dataAlbum[0].hasOwnProperty('data')){
        this.beginDeezer(dataAlbum[0]);
        this.beginITunes(dataAlbum[1]);
      } else {
        this.beginDeezer(dataAlbum[1]);
        this.beginITunes(dataAlbum[0]);
      }
    });
  }

  private beginDeezer(dataAlbum: any) {
    this.addDeezerArtistAlbum(dataAlbum.data);
    this.dataNext = dataAlbum.next;
  }

  private addDeezerArtistAlbum(dataAlbum: object) {
    this.deezerAlbums = this.tracksService.createDeezerAlbum(dataAlbum);
    this.currentArtiest.length = 0;
    this.currentArtiest.push({picture: dataAlbum[0].artist.picture, name: dataAlbum[0].artist.name});
    this.sortAlbum();
  }

  private sortAlbum() {
    this.deezerAlbums.sort( (a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    });
  }

  nextPrevAlbum($event: MouseEvent) {
    let prevNext = '';
    // @ts-ignore
    if ($event.target.id === 'prev'){
      prevNext = this.dataPrev;
    } else {
      prevNext = this.dataNext;
    }
    this.pSub = this.tracksService.getAllNextPrev(prevNext).subscribe(dataAlbum => {
      this.addDeezerArtistAlbum(dataAlbum.data);
      this.dataNext = dataAlbum.next;
      if (!dataAlbum.hasOwnProperty('prev')){
        this.dataPrev = '';
        return;
      }
      this.dataPrev = dataAlbum.prev;
    });
  }

  private beginITunes(dataAlbum: any) {
    this.itunesAlbums = this.tracksService.createITunesAlbum(dataAlbum)[1];
    this.sortAlbum();
  }
}
