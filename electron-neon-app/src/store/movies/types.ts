import { AsyncList, AsyncData } from '../../utils/types';
import { ImdbMovie } from '../../entity/ImdbMovie';
import { ImdbName } from '../../entity/ImdbName';

export type MovieListState = AsyncList<ImdbMovie[]>;

export type MoviesTotalState = AsyncData<number>;

export type MoviesByNameState = AsyncList<Array<[ImdbName, ImdbMovie[]]>>;
