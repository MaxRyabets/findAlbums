import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../shared/artist.interface';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  @Input() currentArtiest: Artist[];
  constructor() { }

  ngOnInit(): void {
  }

}
