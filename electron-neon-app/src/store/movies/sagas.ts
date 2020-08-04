import { spawn, fork, put } from 'redux-saga/effects';
import { take, select, call } from 'typed-redux-saga';
import { performance } from 'perf_hooks';
import { ActionMatchingPattern as ActionType } from '@redux-saga/types';
import { searchMoviesByName } from 'neon-bindings';
import { getType } from 'typesafe-actions';
import { errorMessage } from '../../utils/error';
import { selectByNameStatus } from './selectors';
import { searchMoviesByName as search } from './actions';

function* moviesRootSaga() {
  yield spawn(searchMoviesByNameFlow);
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

function* handleSearchByName(action: ActionType<typeof search.request>) {
  try {
    const t0 = performance.now();
    const result = yield* call(searchMoviesByName, { needle: action.payload });
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
    yield put(search.success(result));
  } catch (e) {
    yield put(search.failure({ message: errorMessage(e) }));
  }
}
