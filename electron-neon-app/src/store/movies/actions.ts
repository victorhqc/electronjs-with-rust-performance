import { createAsyncAction } from 'typesafe-actions';
import { ImdbMovie, EnrichedImdbName } from 'neon-bindings';
import { ErrorLike } from '../../utils/types';

export const getAllMovies = createAsyncAction(
  'movies/get_all',
  'movies/get_all_success',
  'movies/get_all_error',
  'movies/get_all_cancel',
)<void, { movies: ImdbMovie[] }, ErrorLike, void>();

export const searchMoviesByName = createAsyncAction(
  'movies/search_by_name',
  'movies/search_by_name_success',
  'movies/search_by_name_error',
  'movies/search_by_name_cancel',
)<string, EnrichedImdbName[], ErrorLike, void>();
