import { AsyncList, AsyncData } from '../../utils/types';
import { ImdbMovie } from '../../entity/ImdbMovie';
import { ImdbName } from '../../entity/ImdbName';

export type MoviesByNameState = AsyncList<Array<[ImdbName, ImdbMovie[]]>>;
export type MoviesWithTallerActress = AsyncList<TallerThanTuple[]>;

export type TallerThanTuple = [ImdbName, { movie: ImdbMovie; actress: ImdbName[] }[]];
export type NameWithMoviesTuple = [ImdbName, ImdbMovie[]];
