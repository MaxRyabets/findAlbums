import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ItunesAlbumsComponent } from './albums/itunes-album/itunes-albums.component';
import { DeezerAlbumsComponent } from './albums/deezer-albums/deezer-albums.component';
import { AlbumFormComponent } from './albums/album-form/album-form.component';
import { ArtistComponent } from './albums/artist/artist.component';
import { DeezerTracksComponent } from './albums/deezer-tracks/deezer-tracks.component';

import { SortDeezerAlbumsTitlePipe } from './albums/deezer-albums/shared/sort-deezer-albums-title.pipe';
import { SortItunesAlbumsTitlePipe } from './albums/itunes-album/shared/sort-itunes-albums-title.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    ItunesAlbumsComponent,
    DeezerAlbumsComponent,
    SortDeezerAlbumsTitlePipe,
    SortItunesAlbumsTitlePipe,
    AlbumFormComponent,
    ArtistComponent,
    DeezerTracksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
