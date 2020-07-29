import { callNative } from './utils';

export function getMovies(): Promise<ImdbMovie[]> {
  return callNative('getMovies');
}

export function getTotalMovies(): Promise<Number> {
  return callNative('getTotalMovies');
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
