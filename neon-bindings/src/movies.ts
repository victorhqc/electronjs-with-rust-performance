import { callNative } from './utils';

type SearchMoviesByNameArgs = { needle: string };
export function searchMoviesByName(args: SearchMoviesByNameArgs): Promise<EnrichedImdbName[]> {
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
  originalTitle: string;
  year: number;
  datePublished: string;
  genre: string;
  duration: number;
  country: string;
  language: string;
  director: string;
  writer: string;
  productionCompany: string;
  actors: string;
  description: string;
  avgVote: number;
  votes: number;
  budget: string;
  usaGrossIncome: number;
  worlwideGrossIncome: number;
  metascore: number;
  reviewsFromUsers: number;
  reviewsFromCritics: number;
};

export type ImdbName = {
  imdbNameId: string;
  name: string;
  birthName: string;
  height: number;
  bio: string | null;
  birthDetails: string | null;
  birthYear: number;
  dateOfBirth: string | null;
  placeOfBirth: string | null;
  deathDetails: string | null;
  deathYear: number | null;
  dateOfDeath: string | null;
  placeOfDeath: string | null;
  reasonOfDeath: string | null;
  spouses: number;
  divorces: number;
  spousesWithChildren: number;
  children: number;
  primaryProfession: string;
  knownForTitles: string;
};

export type ImdbRatings = {
  imdbRatingId: number;
  imdbTitleId: string;
  weightedAverageVote: number;
  totalVotes: number;
  meanVote: number;
  medianVote: number;
  votes10: number;
  votes9: number;
  votes8: number;
  votes7: number;
  votes6: number;
  votes5: number;
  votes4: number;
  votes3: number;
  votes2: number;
  votes1: number;
  allgenders0ageAvgVote: number;
  allgenders0ageVotes: number;
  allgenders18ageAvgVote: number;
  allgenders18ageVotes: number;
  allgenders30ageAvgVote: number;
  allgenders30ageVotes: number;
  allgenders45ageAvgVote: number;
  allgenders45ageVotes: number;
  malesAllagesAvgVote: number;
  malesAllagesVotes: number;
  males0ageAvgVote: number;
  males0ageVotes: number;
  males18ageAvgVote: number;
  males18ageVotes: number;
  males30ageAvgVote: number;
  males30ageVotes: number;
  males45ageAvgVote: number;
  males45ageVotes: number;
  femalesAllagesAvgVote: number;
  femalesAllagesVotes: number;
  females0ageAvgVote: number;
  females0ageVotes: number;
  females18ageAvgVote: number;
  females18ageVotes: number;
  females30ageAvgVote: number;
  females30ageVotes: number;
  females45ageAvgVote: number;
  females45ageVotes: number;
  top1000VotersRating: number;
  top1000VotersVotes: number;
  usVotersRating: number;
  usVotersVotes: number;
  nonUsVotersRating: number;
  nonUsVotersVotes: number;
};
