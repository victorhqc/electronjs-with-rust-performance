import { spawn, fork, put } from 'redux-saga/effects';
import { take, select, call } from 'typed-redux-saga';
import { performance } from 'perf_hooks';
import { ActionMatchingPattern as ActionType } from '@redux-saga/types';
import { getType } from 'typesafe-actions';
import { printCSVHeap } from '../../utils/memoryUsage';
import { errorMessage } from '../../utils/error';
import { searchMoviesByName, searchMoviesWhereActressIsTallerThan } from '../../db/movies';
import { selectByNameStatus, selectTallerStatus } from './selectors';
import {
  searchMoviesByName as search,
  searchMoviesWhereActressIsTaller as searchTaller,
} from './actions';

function* moviesRootSaga() {
  yield spawn(searchMoviesByNameFlow);
  yield spawn(searchMoviesByTallerActressFlow);
}

export default moviesRootSaga;

function* searchMoviesByNameFlow() {
  while (true) {
    const status = yield* select(selectByNameStatus);
    if (status === 'loading') {
      yield put(search.cancel());
    }

    const action = yield* take(search.request);
    yield fork(handleSearchByName, action);

    yield take([getType(search.failure), getType(search.request), getType(search.success)]);
  }
}

function* searchMoviesByTallerActressFlow() {
  while (true) {
    const status = yield* select(selectTallerStatus);
    if (status === 'loading') {
      yield put(searchTaller.cancel());
    }

    const action = yield* take(searchTaller.request);
    yield fork(handleSearchTaller, action);

    yield take([
      getType(searchTaller.failure),
      getType(searchTaller.request),
      getType(searchTaller.success),
    ]);
  }
}

function* handleSearchByName(action: ActionType<typeof search.request>) {
  try {
    const t0 = performance.now();
    const result = yield* call(searchMoviesByName, action.payload);
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
    printCSVHeap();
    yield put(search.success({ actors: result }));
  } catch (e) {
    yield put(search.failure({ message: errorMessage(e) }));
  }
}

function* handleSearchTaller(action: ActionType<typeof searchTaller.request>) {
  try {
    const t0 = performance.now();
    const result = yield* call(searchMoviesWhereActressIsTallerThan, action.payload);
    const t1 = performance.now();
    console.log(`Search taller took: ${t1 - t0} milliseconds.`);
    printCSVHeap();
    yield put(searchTaller.success({ result }));
  } catch (e) {
    yield put(searchTaller.failure({ message: errorMessage(e) }));
  }
}
