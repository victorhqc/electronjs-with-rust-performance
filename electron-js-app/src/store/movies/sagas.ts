import { spawn, fork, put } from 'redux-saga/effects';
import { take, select, call } from 'typed-redux-saga';
import { ActionMatchingPattern as ActionType } from '@redux-saga/types';
import { getType } from 'typesafe-actions';
import { errorMessage } from '../../utils/error';
import { getMoviesTotal } from '../../db/movies';
import { selectTotalStatus } from './selectors';
import { getMoviesTotal as total } from './actions';

function* moviesRootSaga() {
  yield spawn(fetchMoviesTotalFlow);
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
