import { spawn, fork, put } from 'redux-saga/effects';
import { take, select, call } from 'typed-redux-saga';
import { performance } from 'perf_hooks';
import { ActionMatchingPattern as ActionType } from '@redux-saga/types';
import { getType } from 'typesafe-actions';
import { errorMessage } from '../../utils/error';
import { getMoviesTotal, searchMoviesByName } from '../../db/movies';
import { selectTotalStatus, selectByNameStatus } from './selectors';
import { getMoviesTotal as total, searchMoviesByName as search } from './actions';

function* moviesRootSaga() {
  yield spawn(fetchMoviesTotalFlow);
  yield spawn(searchMoviesByNameFlow);
}

export default moviesRootSaga;

function* fetchMoviesTotalFlow() {
  while (true) {
    const status = yield* select(selectTotalStatus);
    if (status === 'loading') {
      yield put(total.cancel());
    }

    yield* take(total.request);

    yield fork(handleFetchTotal);

    yield take([getType(total.failure), getType(total.request), getType(total.success)]);
  }
}

function* handleFetchTotal() {
  try {
    const result = yield* call(getMoviesTotal);

    yield put(total.success({ total: result }));
  } catch (e) {
    yield put(
      total.failure({
        message: errorMessage(e),
      }),
    );
  }
}

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

function* handleSearchByName(action: ActionType<typeof search.request>) {
  try {
    const t0 = performance.now();
    const result = yield* call(searchMoviesByName, action.payload);
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
    yield put(search.success({ actors: result }));
  } catch (e) {
    yield put(search.failure({ message: errorMessage(e) }));
  }
}
