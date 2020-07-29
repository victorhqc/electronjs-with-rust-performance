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

export type GetRatedMoviesByGenderInYearArgs = BollywoodArgs &
  PaginationArgs & {
    year: Number;
    gender: Gender;
  };
export function getRatedMoviesByGenderInYear(
  args: GetRatedMoviesByGenderInYearArgs,
): Promise<[ImdbMovie, ImdbRatings][]> {
  return callNative('getRatedMoviesByGenderInYear', args);
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

export type ImdbRatings = {
  imdb_rating_id: Number;
  imdb_title_id: string;
  weighted_average_vote: Number;
  total_votes: Number;
  mean_vote: Number;
  median_vote: Number;
  votes_10: Number;
  votes_9: Number;
  votes_8: Number;
  votes_7: Number;
  votes_6: Number;
  votes_5: Number;
  votes_4: Number;
  votes_3: Number;
  votes_2: Number;
  votes_1: Number;
  allgenders_0age_avg_vote: Number;
  allgenders_0age_votes: Number;
  allgenders_18age_avg_vote: Number;
  allgenders_18age_votes: Number;
  allgenders_30age_avg_vote: Number;
  allgenders_30age_votes: Number;
  allgenders_45age_avg_vote: Number;
  allgenders_45age_votes: Number;
  males_allages_avg_vote: Number;
  males_allages_votes: Number;
  males_0age_avg_vote: Number;
  males_0age_votes: Number;
  males_18age_avg_vote: Number;
  males_18age_votes: Number;
  males_30age_avg_vote: Number;
  males_30age_votes: Number;
  males_45age_avg_vote: Number;
  males_45age_votes: Number;
  females_allages_avg_vote: Number;
  females_allages_votes: Number;
  females_0age_avg_vote: Number;
  females_0age_votes: Number;
  females_18age_avg_vote: Number;
  females_18age_votes: Number;
  females_30age_avg_vote: Number;
  females_30age_votes: Number;
  females_45age_avg_vote: Number;
  females_45age_votes: Number;
  top1000_voters_rating: Number;
  top1000_voters_votes: Number;
  us_voters_rating: Number;
  us_voters_votes: Number;
  non_us_voters_rating: Number;
  non_us_voters_votes: Number;
};

export type BollywoodArgs = {
  bolywood?: boolean | null;
};

export type PaginationArgs = {
  page: Number;
  pageSize?: Number | null;
};

export type Gender = 'Male' | 'Female';
