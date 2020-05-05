import {Component, OnInit} from '@angular/core';
import {TracksService} from './tracks.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';

interface Artiest {
  picture: string;
  name: string;
}

interface Album {
  cover: string;
  title: string;
  explicit_lyrics: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pSub: Subscription;
  dSub: Subscription;
  albums: Album[] = [];
  currentArtiest: Artiest[] = [];
  form: FormGroup;
  em = 'eminem';
  dataNext: string;
  dataPrev = '';

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
    this.pSub = this.tracksService.getAll(querySearch).subscribe(dataAlbum => {
      console.log(dataAlbum);
      this.addArtistAlbum(dataAlbum.data);
      this.dataNext = dataAlbum.next;
    });
    const test = this.tracksService.getAllData(querySearch).subscribe(dataAlbum => {
      console.log(dataAlbum);
    });
  }

  private addArtistAlbum(dataAlbum: object) {
    this.albums = this.tracksService.createAlbum(dataAlbum);
    this.currentArtiest.length = 0;
    this.currentArtiest.push({picture: dataAlbum[0].artist.picture, name: dataAlbum[0].artist.name});
    this.sortAlbum();
  }

  private sortAlbum() {
    this.albums.sort( (a, b) => {
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
      this.addArtistAlbum(dataAlbum.data);
      this.dataNext = dataAlbum.next;
      if (!dataAlbum.hasOwnProperty('prev')){
        this.dataPrev = '';
        return;
      }
      this.dataPrev = dataAlbum.prev;
    });
  }
}
