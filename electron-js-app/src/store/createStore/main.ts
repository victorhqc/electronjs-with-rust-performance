import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { forwardToRenderer, replayActionMain, triggerAlias } from 'electron-redux';
import rootSaga from '../rootSaga';
import rootReducer from '../rootReducer';

const sagaMiddleware = createSagaMiddleware({});

const buildStore = () => {
  const store = createStore(
    rootReducer(),
    {},
    applyMiddleware(
      triggerAlias,
      sagaMiddleware,
      forwardToRenderer, // this goes last!
    ),
  );

  replayActionMain(store);
  sagaMiddleware.run(rootSaga);

  return store;
};

export default buildStore;
