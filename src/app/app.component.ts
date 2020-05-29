import {Component, OnDestroy, OnInit} from '@angular/core';
import { AlbumsService } from './albums/shared/albums.service';
import {Subscription} from 'rxjs';
import {AlbumTracks, ITunesAlbum, ITunesAlbums} from './albums/itunes-album/shared/itunes-albums.interfaces';
import {DeezerAlbum, DeezerAlbums} from './albums/deezer-albums/shared/deezer-albums.interfaces';
import {Artist} from './albums/artist/artist.interface';

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
  dataNextDeezerAlbums: string;
  itunesAlbums: ITunesAlbum[] = [];
  deezerAlbums: DeezerAlbum[] = [];
  currentArtiest: Artist[] = [];
  albumTracks: AlbumTracks[] = [];
  querySearch: string;
  itunesPageSize: number;
  artistName: string;

  ngOnInit(): void {}

  updateDeezerAlbums(dataDeezerAlbums: DeezerAlbums) {
    this.deezerAlbums = this.albumsService.createDeezerAlbum(dataDeezerAlbums.data);
    this.addDeezerArtistAlbum(dataDeezerAlbums.data);
    this.dataNextDeezerAlbums = dataDeezerAlbums.next;
  }

  private addDeezerArtistAlbum(dataDeezerAlbums: DeezerAlbum) {
      if (this.artistName !== this.querySearch){
        this.artistName = this.querySearch;
        this.currentArtiest = [];
        this.currentArtiest.push(dataDeezerAlbums[0].artist);
      }
  }

  updateITunesAlbums(dataITunesAlbums: ITunesAlbums) {
    this.itunesAlbums = this.albumsService.createITunesAlbum(dataITunesAlbums.results);
  }

  updateQuerySearchITunes($event: string) {
    this.querySearch = $event;
  }

  updateITunesPageSize($event: number) {
    this.itunesPageSize = $event;
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
