import { AsyncList, AsyncData } from '../../utils/types';
import { ImdbMovie } from '../../entity/ImdbMovie';

export type MovieListState = AsyncList<ImdbMovie[]>;

export type MoviesTotalState = AsyncData<number>;
