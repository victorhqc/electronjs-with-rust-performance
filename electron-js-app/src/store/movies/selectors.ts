import { ApplicationState } from '../index';

export const selectTotalStatus = (state: ApplicationState) => state.movies.total.status;
