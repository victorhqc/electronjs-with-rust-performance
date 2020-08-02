import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMoviesTotal } from '../../store/movies';

import './style.css';

const App: FC<Props> = ({ getTotal }) => {
  useEffect(() => {
    getTotal();
  }, [getTotal]);

  return (
    <div className="m-2">
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
    </div>
  );
};

const mapDispatchToProps = {
  getTotal: getMoviesTotal.request,
};

type Props = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(App);
