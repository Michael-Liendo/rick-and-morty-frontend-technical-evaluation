export interface IEpisodes {
  info: IInfo;
  results: IEpisodes[];
}

export interface IInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface IEpisodes {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
