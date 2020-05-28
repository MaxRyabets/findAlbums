import {Artist} from '../../../shared/artist.interface';

export interface DeezerAlbums {
  data: DeezerAlbum;
  next: string;
  prev?: string;
}

export interface DeezerAlbum {
  id: number;
  cover: string;
  title: string;
  explicit_lyrics: boolean;
  tracklist: string;
  artist: Artist;
}
