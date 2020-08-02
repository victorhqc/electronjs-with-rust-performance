import { createAsyncAction } from 'typesafe-actions';
import { ImdbMovie } from '../../entity/ImdbMovie';
import { ErrorLike } from '../../utils/types';

export const getMoviesTotal = createAsyncAction(
  'movies/get_total',
  'movies/get_total_success',
  'movies/get_total_error',
  'movies/get_total_cancel',
)<void, { total: number }, ErrorLike, void>();

export const getAllMovies = createAsyncAction(
  'movies/get_all',
  'movies/get_all_success',
  'movies/get_all_error',
  'movies/get_all_cancel',
)<void, { movies: ImdbMovie[] }, ErrorLike, void>();
