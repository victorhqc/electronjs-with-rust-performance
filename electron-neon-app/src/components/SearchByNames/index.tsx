import React, { FC, useCallback, useState, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  searchMoviesByName as search,
  selectByNameItems,
  selectByNameStatus,
} from '../../store/movies';
import { ApplicationState } from '../../store';

import './style.css';

const SearchByNames: FC<Props> = ({ search, items, status }) => {
  const [needle, setNeedle] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      search(needle);
    },
    [search, needle],
  );

  const handleType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNeedle(e.target.value);
  }, []);

  return (
    <div className="search-by-names" data-testid="search-by-names">
      <h1 className="search-by-names__title">Search Hollywood Stars ⭐</h1>
      <form className="search-by-names__form" onSubmit={handleSubmit}>
        <input
          className="search-by-names__input"
          type="text"
          value={needle}
          onChange={handleType}
          placeholder="Type a name..."
        />
        <button className="search-by-names__button">Search</button>
      </form>
      <div className="search-by-names__items-wrapper">
        {status === 'loading' && <h2>Loading...</h2>}
        {items.length === 0 && status !== 'loading' && (
          <p className="search-by-names__no-results">No results found.</p>
        )}
        {status === 'done' && (
          <ul className="search-by-names__items">
            {items.map(({ data: person, metascore, movies }) => (
              <div key={person.imdbNameId} className="search-by-names__item">
                <p className="search-by-names__item--name">
                  {person.name}{' '}
                  <small className="search-by-names__item--birth-name">
                    <i>{person.birthName}</i>
                  </small>{' '}
                  (Metascore: <span>{metascore.toFixed(2)}</span>)
                </p>
                <ul className="search-by-names__item--movies">
                  {movies.map((movie) => (
                    <div key={movie.imdbTitleId} className="search-by-names__item--movie">
                      <p>{movie.originalTitle}</p>
                      <p>Metascore: {movie.metascore}</p>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  status: selectByNameStatus(state),
  items: selectByNameItems(state),
});

const mapDispatchToProps = {
  search: search.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SearchByNames);
