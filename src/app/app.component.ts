import {Component, OnInit} from '@angular/core';
import {TracksService} from './tracks.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pSub: Subscription;
  dSub: Subscription;
  tracks: [] = [];
  album: [] = [];
  form: FormGroup;

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
      console.log(this.tracks);
    });

  }

  private formControls() {
    this.form = new FormGroup({
      querySearch: new FormControl(null, Validators.required)
    });
  }
}
