import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMoviesTotal } from '../../store/movies';
import SearchByNames from '../SearchByNames';

import './style.css';

const App: FC<Props> = ({ getTotal }) => {
  useEffect(() => {
    getTotal();
  }, [getTotal]);

  return (
    <div className="m-2">
      <SearchByNames />
    </div>
  );
};

const mapDispatchToProps = {
  getTotal: getMoviesTotal.request,
};

type Props = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(App);
