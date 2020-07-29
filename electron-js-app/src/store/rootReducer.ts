import { combineReducers } from 'redux';

import moviesReducer, { MovieAction } from './movies/reducer';

const rootReducer = () =>
  combineReducers({
    ...moviesReducer,
  });

export default rootReducer;

export type ApplicationState = ReturnType<ReturnType<typeof rootReducer>>;
export type ApplicationAction = MovieAction;
