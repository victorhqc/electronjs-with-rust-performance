import { ApplicationState } from '../index';

export const selectByNameStatus = (state: ApplicationState) => state.movies.byName.status;

export const selectByNameItems = (state: ApplicationState) => state.movies.byName.items;
