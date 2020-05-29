export interface DeezerTracks {
  title: string;
  link: string;
  duration: string;
  track_position: number;
  disk_number: number;
  preview: string;
}
export interface DeezerTracksData {
  data: DeezerTracks;
}
