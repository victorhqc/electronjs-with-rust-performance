import { createAsyncAction } from 'typesafe-actions';
import { ImdbMovie } from '../../entity/ImdbMovie';
import { ImdbName } from '../../entity/ImdbName';
import { ErrorLike } from '../../utils/types';
import { TallerThanTuple, NameWithMoviesTuple } from './types';

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
)<string, { actors: Array<NameWithMoviesTuple> }, ErrorLike, void>();

export const searchMoviesWhereActressIsTaller = createAsyncAction(
  'movies/taller_actress',
  'movies/taller_actress_success',
  'movies/taller_actress_error',
  'movies/taller_actress_cancel',
)<string, { result: Array<TallerThanTuple> }, ErrorLike, void>();
