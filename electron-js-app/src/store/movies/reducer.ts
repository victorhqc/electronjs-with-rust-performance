import { combineReducers, Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';
import { MovieListState } from './types';

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

export const movies = combineReducers({ list });

export default { movies };
