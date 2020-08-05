import React, { FC } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import SearchByNames from '../SearchByNames';
import SearchTaller from '../SearchTaller';

import './style.css';

const App: FC = () => {
  return (
    <>
      <header className="menu">
        <ul className="menu_item-wrapper">
          <li className="menu_item">
            <Link to="/">Search by name</Link>
          </li>
          <li className="menu_item">
            <Link to="/taller">Search by taller actress</Link>
          </li>
        </ul>
      </header>
      <div className="m-2">
        <Switch>
          <Route exact path="/">
            <SearchByNames />
          </Route>
          <Route exact path="/taller">
            <SearchTaller />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
