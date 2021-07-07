export enum RecordCondition {
  "poor",
  "fair",
  "good",
  "very_good",
  "mint",
}

export type RecordArtist = {
  name: string;
  id: number;
};

export type Record = {
  albumTitle: string;
  year: number;
  condition: RecordCondition;
  artist: RecordArtist;
};

export interface RecordResponse {
  year: number;
  condition: RecordCondition;
  artist: RecordArtist;
  album_title: string;
}
