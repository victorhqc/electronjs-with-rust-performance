import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { forwardToMain, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';
import rootReducer from '../rootReducer';
import { ApplicationAction, ApplicationState } from '../';

const sagaMiddleware = createSagaMiddleware({});

const buildStore = () => {
  const initialState = getInitialStateRenderer();

  const store = createStore(
    rootReducer(),
    initialState,
    applyMiddleware(
      forwardToMain, // this goes fitst!
      sagaMiddleware,
    ),
  );

  replayActionRenderer(store);

  global.__redux_store__ = store;

  return store;
};

export default buildStore;
