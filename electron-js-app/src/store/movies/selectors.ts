import { ApplicationState } from '../index';
import { App } from 'electron';

export const selectByNameStatus = (state: ApplicationState) => state.movies.byName.status;
export const selectByNameItems = (state: ApplicationState) => state.movies.byName.items;

export const selectTallerStatus = (state: ApplicationState) => state.movies.tallerActress.status;
export const selectTallerItems = (state: ApplicationState) => state.movies.tallerActress.items;
