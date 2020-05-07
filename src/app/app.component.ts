import {Component, OnDestroy, OnInit} from '@angular/core';
import { AlbumsService } from './albums.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Artiest, DeezerAlbum, ITunes} from './shared/interfaces';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(
    private albumsService: AlbumsService,
    private ngxService: NgxUiLoaderService
  ) { }

  dSub: Subscription;
  form: FormGroup;
  defaultArtist = 'eminem';
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
    this.itunesAlbums.length = 0;
    this.deezerAlbums.length = 0;

    this.querySearch = this.form.getRawValue().querySearch;
    this.ngxService.start();
    this.dSub = this.albumsService.getAllData(this.querySearch).subscribe(dataAlbum => {
      this.beginDeezer(dataAlbum[0]);
      this.addITunesArtistAlbum(dataAlbum[1]);
      this.sortAlbum();
      this.itunesPageSize = dataAlbum[1].resultCount;
      this.ngxService.stop();
    });

  }

  private beginDeezer(dataAlbum: any) {
    this.addDeezerArtistAlbum(dataAlbum.data);
    this.dataNext = dataAlbum.next;
  }

  private addDeezerArtistAlbum(dataAlbum: object) {
    this.deezerAlbums = this.albumsService.createDeezerAlbum(dataAlbum);
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
    }
    this.ngxService.start();
    this.dSub = this.albumsService.getAllNextPrev(prevNext, this.querySearch, this.itunesPageSize).subscribe(dataAlbum => {
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
    });
  }

  private addITunesArtistAlbum(dataAlbum: object) {
    this.itunesAlbums = this.albumsService.createITunesAlbum(dataAlbum)[1];
  }

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
