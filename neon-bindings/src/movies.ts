import { callNative } from './utils';

export type GetMoviesArgs = BollywoodArgs & PaginationArgs;
export function getMovies(args: GetMoviesArgs): Promise<ImdbMovie[]> {
  return callNative('getMovies', args);
}

export function getTotalMovies(args: BollywoodArgs): Promise<Number> {
  return callNative('getTotalMovies', args);
}

export type GetRatedMoviesByYearArgs = BollywoodArgs & PaginationArgs & { year: Number };
export function getRatedMoviesByYear(args: GetRatedMoviesByYearArgs): Promise<ImdbMovie[]> {
  return callNative('getRatedMoviesByYear', args);
}

export type ImdbMovie = {
  imdbTitleId: string;
  title: string;
  original_title: string;
  year: Number;
  date_published: string;
  genre: string;
  duration: Number;
  country: string;
  language: string;
  director: string;
  writer: string;
  production_company: string;
  actors: string;
  description: string;
  avg_vote: Number;
  votes: Number;
  budget: string;
  usa_gross_income: Number;
  worlwide_gross_income: Number;
  metascore: Number;
  reviews_from_users: Number;
  reviews_from_critics: Number;
};

export type BollywoodArgs = {
  bolywood?: boolean | null;
};

export type PaginationArgs = {
  page: Number;
  pageSize?: Number | null;
};
