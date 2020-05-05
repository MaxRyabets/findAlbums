import {Component, OnInit} from '@angular/core';
import {TracksService} from './tracks.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {log} from 'util';
import {map} from 'rxjs/operators';
import {hasOwnProperty} from 'tslint/lib/utils';

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
      this.addArtistAlbum(dataAlbum.data);
      this.dataNext = dataAlbum.next;
    });
  }

  private addArtistAlbum(dataAlbum: object) {
    this.albums = Object.values(dataAlbum).map(data => ({
        cover: data.cover,
        title: data.title,
        explicit_lyrics: data.explicit_lyrics
    }));
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

  nextAlbum() {
    this.pSub = this.tracksService.getAllNext(this.dataNext).subscribe(dataAlbum => {
      this.addArtistAlbum(dataAlbum.data);
      this.dataNext = dataAlbum.next;
      this.dataPrev = dataAlbum.prev;
    });
  }

  prevAlbum() {
    this.pSub = this.tracksService.getAllPrev(this.dataPrev).subscribe(dataAlbum => {
      if (!dataAlbum.hasOwnProperty(dataAlbum.prev)) {
        this.dataPrev = '';
        return;
      }
      this.addArtistAlbum(dataAlbum.data);
      this.dataNext = dataAlbum.next;
      this.dataPrev = dataAlbum.prev;
    });
  }
}
