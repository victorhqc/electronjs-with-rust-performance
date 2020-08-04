import { callNative } from './utils';

type SearchMoviesByNameArgs = { needle: string };
export function searchMoviesByName(args: SearchMoviesByNameArgs): Promise<EnrichedImdbName> {
  return callNative('searchMoviesByName', args);
}

export type EnrichedImdbName = {
  data: ImdbName;
  metascore: number;
  movies: ImdbMovie[];
};

export type ImdbMovie = {
  imdbTitleId: string;
  title: string;
  original_title: string;
  year: number;
  date_published: string;
  genre: string;
  duration: number;
  country: string;
  language: string;
  director: string;
  writer: string;
  production_company: string;
  actors: string;
  description: string;
  avg_vote: number;
  votes: number;
  budget: string;
  usa_gross_income: number;
  worlwide_gross_income: number;
  metascore: number;
  reviews_from_users: number;
  reviews_from_critics: number;
};

export type ImdbName = {
  imdb_name_id: string;
  name: string;
  birth_name: string;
  height: number;
  bio: string | null;
  birth_details: string | null;
  birth_year: number;
  date_of_birth: string | null;
  place_of_birth: string | null;
  death_details: string | null;
  death_year: number | null;
  date_of_death: string | null;
  place_of_death: string | null;
  reason_of_death: string | null;
  spouses: number;
  divorces: number;
  spouses_with_children: number;
  children: number;
  primary_profession: string;
  known_for_titles: string;
};

export type ImdbRatings = {
  imdb_rating_id: number;
  imdb_title_id: string;
  weighted_average_vote: number;
  total_votes: number;
  mean_vote: number;
  median_vote: number;
  votes_10: number;
  votes_9: number;
  votes_8: number;
  votes_7: number;
  votes_6: number;
  votes_5: number;
  votes_4: number;
  votes_3: number;
  votes_2: number;
  votes_1: number;
  allgenders_0age_avg_vote: number;
  allgenders_0age_votes: number;
  allgenders_18age_avg_vote: number;
  allgenders_18age_votes: number;
  allgenders_30age_avg_vote: number;
  allgenders_30age_votes: number;
  allgenders_45age_avg_vote: number;
  allgenders_45age_votes: number;
  males_allages_avg_vote: number;
  males_allages_votes: number;
  males_0age_avg_vote: number;
  males_0age_votes: number;
  males_18age_avg_vote: number;
  males_18age_votes: number;
  males_30age_avg_vote: number;
  males_30age_votes: number;
  males_45age_avg_vote: number;
  males_45age_votes: number;
  females_allages_avg_vote: number;
  females_allages_votes: number;
  females_0age_avg_vote: number;
  females_0age_votes: number;
  females_18age_avg_vote: number;
  females_18age_votes: number;
  females_30age_avg_vote: number;
  females_30age_votes: number;
  females_45age_avg_vote: number;
  females_45age_votes: number;
  top1000_voters_rating: number;
  top1000_voters_votes: number;
  us_voters_rating: number;
  us_voters_votes: number;
  non_us_voters_rating: number;
  non_us_voters_votes: number;
};
