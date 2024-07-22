export interface ICharacters {
  info: IInfo;
  results: ICharacter[];
}

export interface IInfo {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ILocation;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface ILocation {
  name: string;
  url: string;
}
