import { AsyncList } from '../../utils/types';
import { ImdbMovie, EnrichedImdbName, ImdbNameWithMoviesAndActresses } from 'neon-bindings';

export type MoviesByNameState = AsyncList<EnrichedImdbName[]>;
export type MoviesWithTallerActressState = AsyncList<ImdbNameWithMoviesAndActresses[]>;
