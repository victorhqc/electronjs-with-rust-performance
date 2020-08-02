import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { forwardToRenderer, replayActionMain, triggerAlias } from 'electron-redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootSaga from '../rootSaga';
import rootReducer from '../rootReducer';

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware({});

const buildStore = () => {
  const store = createStore(
    rootReducer(),
    {},
    composeEnhancers(
      applyMiddleware(
        triggerAlias,
        sagaMiddleware,
        forwardToRenderer, // this goes last!
      ),
    ),
  );

  replayActionMain(store);
  sagaMiddleware.run(rootSaga);

  return store;
};

export type Store = ReturnType<typeof buildStore>;

export default buildStore;
