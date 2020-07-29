import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { forwardToMain, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from '../rootReducer';

const composeEnhancers = composeWithDevTools({});

const sagaMiddleware = createSagaMiddleware({});

const buildStore = () => {
  const initialState = getInitialStateRenderer();

  const store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(
        forwardToMain, // this goes fitst!
        sagaMiddleware,
      ),
    ),
  );

  replayActionRenderer(store);

  return store;
};

export default buildStore;
