import { createAsyncAction } from 'typesafe-actions';
import { ErrorLike } from '../../utils/types';

export const getAllMovies = createAsyncAction(
  'movies/get_all',
  'movies/get_all_success',
  'movies/get_all_error',
  'movies/get_all_cancel',
)<void, { movies: {}[] }, ErrorLike, void>();
