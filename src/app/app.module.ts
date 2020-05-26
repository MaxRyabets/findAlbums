import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { AlbumsService } from './services/albums.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ItunesAlbumComponent } from './components/itunes-album/itunes-album.component';
import { DeezerAlbumComponent } from './components/deezer-album/deezer-album.component';
import {DeezerAlbumService} from './components/deezer-album/shared/deezer-album.service';
import {ItunesAlbumService} from './components/itunes-album/shared/itunes-album.service';
import { SortDeezerAlbumsTitlePipe } from './components/deezer-album/shared/sort-deezer-albums-title.pipe';
import { SortItunesAlbumsTitlePipe } from './components/itunes-album/shared/sort-itunes-albums-title.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AlbumFormComponent } from './components/album-form/album-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ItunesAlbumComponent,
    DeezerAlbumComponent,
    SortDeezerAlbumsTitlePipe,
    SortItunesAlbumsTitlePipe,
    AlbumFormComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [AlbumsService, DeezerAlbumService, ItunesAlbumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
