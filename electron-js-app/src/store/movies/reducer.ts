import { combineReducers, Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';
import { MovieListState, MoviesTotalState, MoviesByNameState } from './types';

export type MovieAction = ActionType<typeof actions>;

const initialListState: MovieListState = {
  items: [],
  status: 'idle',
};

export const list: Reducer<MovieListState, MovieAction> = (state = initialListState, action) => {
  switch (action.type) {
    case getType(actions.getAllMovies.request):
      return {
        status: 'loading',
        items: [],
      };

    default:
      return state;
  }
};

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
        items: action.payload.actors,
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

const totalsState: MoviesTotalState = {
  data: 0,
  status: 'idle',
};

export const total: Reducer<MoviesTotalState, MovieAction> = (state = totalsState, action) => {
  switch (action.type) {
    case getType(actions.getMoviesTotal.request):
      return {
        status: 'loading',
        data: 0,
      };
    case getType(actions.getMoviesTotal.success):
      return {
        status: 'done',
        data: action.payload.total,
      };
    case getType(actions.getMoviesTotal.failure):
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case getType(actions.getMoviesTotal.cancel):
      return {
        ...state,
        status: 'idle',
      };
    default:
      return state;
  }
};

export const movies = combineReducers({ list, total, byName });

export default { movies };
