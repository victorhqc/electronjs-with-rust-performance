import { ApplicationState } from '../index';

export const selectTotalStatus = (state: ApplicationState) => state.movies.total.status;

export const selectByNameStatus = (state: ApplicationState) => state.movies.byName.status;

export const selectByNameItems = (state: ApplicationState) => state.movies.byName.items;
