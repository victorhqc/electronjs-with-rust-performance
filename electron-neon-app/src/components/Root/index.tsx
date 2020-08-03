import React, { FC } from 'react';
import { Provider } from 'react-redux';
import createStore from '../../store/createStore/renderer';

const store = createStore();

const Root: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

export default Root;
