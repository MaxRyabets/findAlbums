export interface ITunesAlbums {
  resultCount: number;
  results: ITunesAlbum;
}

export interface ITunesAlbum {
  artworkUrl60: string;
  collectionName: string;
  collectionPrice: number;
}

export interface Artist {
  id: number;
  link: number;
  name: string;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

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

export interface AlbumTracks {
  title: string;
  preview: string;
}
