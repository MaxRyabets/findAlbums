import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ItunesAlbumComponent } from './albums/itunes-album/itunes-album.component';
import { DeezerAlbumComponent } from './albums/deezer-album/deezer-album.component';
import { AlbumFormComponent } from './albums/album-form/album-form.component';
import { ArtistComponent } from './albums/artist/artist.component';

import { SortDeezerAlbumsTitlePipe } from './albums/deezer-album/shared/sort-deezer-albums-title.pipe';
import { SortItunesAlbumsTitlePipe } from './albums/itunes-album/shared/sort-itunes-albums-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ItunesAlbumComponent,
    DeezerAlbumComponent,
    SortDeezerAlbumsTitlePipe,
    SortItunesAlbumsTitlePipe,
    AlbumFormComponent,
    ArtistComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
