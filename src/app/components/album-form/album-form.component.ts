import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DeezerAlbums, ITunesAlbums} from '../../shared/interfaces';
import {AlbumsService} from '../../services/albums.service';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {

  @Output() addDeezAlbums: EventEmitter<DeezerAlbums> = new EventEmitter<DeezerAlbums>();
  @Output() addITunAlbums: EventEmitter<ITunesAlbums> = new EventEmitter<ITunesAlbums>();
  @Output() querySearchITunes: EventEmitter<string> = new EventEmitter<string>();
  @Output() itunesPageSize: EventEmitter<number> = new EventEmitter<number>();

  dSub: Subscription;
  iSub: Subscription;
  form: FormGroup;
  querySearch: string;
  defaultArtist = 'eminem';

  constructor(
    private albumsService: AlbumsService
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
    this.querySearch = this.form.getRawValue().querySearch;
    this.querySearchITunes.emit(this.querySearch);
    this.dSub = this.albumsService.getDataDeezerAlbums(this.querySearch).subscribe(dataDeezerAlbums => {
      this.addDeezerAlbums(dataDeezerAlbums);
    });
    this.iSub = this.albumsService.getDataITunesAlbums(this.querySearch).subscribe(dataITunesAlbums => {
      this.addITunesAlbums(dataITunesAlbums);
      this.itunesPageSize.emit(dataITunesAlbums.resultCount);
    });
  }

  private addDeezerAlbums(dataDeezerAlbums: DeezerAlbums) {
    this.addDeezAlbums.emit(dataDeezerAlbums);
  }

  private addITunesAlbums(dataITunesAlbums: ITunesAlbums) {
    this.addITunAlbums.emit(dataITunesAlbums);
  }
}
