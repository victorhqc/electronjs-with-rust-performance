import { AsyncList, AsyncData } from '../../utils/types';
import { ImdbMovie, EnrichedImdbName } from 'neon-bindings';

export type MovieListState = AsyncList<ImdbMovie[]>;

export type MoviesTotalState = AsyncData<number>;

export type MoviesByNameState = AsyncList<EnrichedImdbName[]>;
