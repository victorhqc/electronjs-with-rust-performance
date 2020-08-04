import React, { FC } from 'react';
import SearchByNames from '../SearchByNames';

import './style.css';

const App: FC = () => {
  return (
    <div className="m-2">
      <SearchByNames />
    </div>
  );
};

export default App;
