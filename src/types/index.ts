export interface IResponse<T> {
  info: IInfo;
  results: T[];
}

export interface IInfo {
  count: number;
  pages: number;
  next: string;
  prev: null;
}
