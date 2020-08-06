import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import createStore from '../../store/createStore/renderer';
const store = createStore();

const Root: FC = ({ children }) => (
  <Provider store={store}>
    <HashRouter>{children}</HashRouter>
  </Provider>
);

export default Root;
