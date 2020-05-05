import {Component, OnInit} from '@angular/core';
import {TracksService} from './tracks.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {log} from 'util';
import {map} from 'rxjs/operators';

interface Artiest {
  picture: string;
  name: string;
}

interface Album {
  cover: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pSub: Subscription;
  dSub: Subscription;
  tracks: [] = [];
  albums: Album[] = [];
  currentArtiest: Artiest[] = [];
  form: FormGroup;
  em = 'eminem';

  constructor(
    private tracksService: TracksService
  ) { }

  ngOnInit(): void {
    this.formControls();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const querySearch: string = this.form.getRawValue().querySearch;
    this.pSub = this.tracksService.getAll(querySearch).subscribe(tracks => {
      this.tracks = tracks;
      // @ts-ignore
      for (const v of this.tracks[0]){
        if (v.album) {
          // @ts-ignore
          this.albums.push({cover: v.album.cover, title: v.album.title});
        }
        if (v.artist && !Object.keys(this.currentArtiest).length) {
          this.currentArtiest.push({picture: v.artist.picture, name: v.artist.name});
        }
      }
      this.albums.sort( (a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      console.log(this.albums);
      console.log(this.currentArtiest);

    });

  }

  private formControls() {
    this.form = new FormGroup({
      querySearch: new FormControl(null, Validators.required)
    });
  }
}
