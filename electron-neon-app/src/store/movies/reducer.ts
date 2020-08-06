import { combineReducers, Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';
import { MoviesByNameState, MoviesWithTallerActressState } from './types';

export type MovieAction = ActionType<typeof actions>;

const initialByNameState: MoviesByNameState = {
  items: [],
  status: 'idle',
};

export const byName: Reducer<MoviesByNameState, MovieAction> = (
  state = initialByNameState,
  action,
) => {
  switch (action.type) {
    case getType(actions.searchMoviesByName.request):
      return {
        status: 'loading',
        items: [],
      };

    case getType(actions.searchMoviesByName.success):
      return {
        status: 'done',
        items: action.payload,
      };

    case getType(actions.searchMoviesByName.failure):
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };

    case getType(actions.searchMoviesByName.cancel):
      return {
        ...state,
        status: 'idle',
      };
    default:
      return state;
  }
};

const initialTallerActressState: MoviesWithTallerActressState = {
  items: [],
  status: 'idle',
};

export const tallerActress: Reducer<MoviesWithTallerActressState, MovieAction> = (
  state = initialTallerActressState,
  action,
) => {
  switch (action.type) {
    case getType(actions.searchMoviesWhereActressIsTaller.request):
      return {
        status: 'loading',
        items: [],
      };

    case getType(actions.searchMoviesWhereActressIsTaller.success):
      return {
        status: 'done',
        items: action.payload.result,
      };

    case getType(actions.searchMoviesWhereActressIsTaller.failure):
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };

    case getType(actions.searchMoviesWhereActressIsTaller.cancel):
      return {
        ...state,
        status: 'idle',
      };
    default:
      return state;
  }
};

export const movies = combineReducers({ byName, tallerActress });

export default { movies };
