import { all, spawn } from 'redux-saga/effects';
import moviesSaga from './movies/sagas';

export default function* rootSaga() {
  yield all([spawn(moviesSaga)]);
}
