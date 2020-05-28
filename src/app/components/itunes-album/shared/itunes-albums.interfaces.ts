export interface ITunesAlbums {
  resultCount: number;
  results: ITunesAlbum;
}

export interface ITunesAlbum {
  artworkUrl60: string;
  collectionName: string;
  collectionPrice: number;
}

export interface AlbumTracks {
  title: string;
  preview: string;
}
