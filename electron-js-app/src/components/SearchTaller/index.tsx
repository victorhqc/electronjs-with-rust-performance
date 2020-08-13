import React, { FC, useCallback, useState, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  searchMoviesWhereActressIsTaller as search,
  selectTallerStatus,
  selectTallerItems,
} from '../../store/movies';
import { ApplicationState } from '../../store';

import './style.css';

const SearchTaller: FC<Props> = ({ search, items, status }) => {
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
    <div className="search-taller" data-testid="search-taller">
      <h1 className="search-taller__title">Search Where Actresses Are Taller 💃 than the ⭐</h1>
      <form className="search-taller__form" onSubmit={handleSubmit}>
        <input
          className="search-taller__input"
          type="text"
          value={needle}
          onChange={handleType}
          placeholder="Type a name..."
        />
        <button className="search-taller__button">Search</button>
      </form>
      <div className="search-taller__items-wrapper">
        {status === 'loading' && <h2>Loading...</h2>}
        {items.length === 0 && status !== 'loading' && (
          <p className="search-taller__no-results">No results found.</p>
        )}
        {status === 'done' && (
          <ul className="search-taller__items">
            {items.map(([person, moviesWithActresses]) => (
              <div key={person.imdb_name_id} className="search-taller__item">
                <p className="search-taller__item--name">
                  {person.name}{' '}
                  <small className="search-taller__item--birth-name">
                    <i>{person.birth_name}</i>
                  </small>{' '}
                  <span>({person.height} cm)</span>
                </p>
                <ul className="search-taller__item--movies">
                  {moviesWithActresses.map(({ movie, actress }) => (
                    <div key={movie.imdb_title_id} className="search-taller__item--movie">
                      <p>{movie.original_title}</p>
                      <p>Taller Actresses:</p>
                      <ul>
                        {actress.map((actress) => (
                          <li key={actress.imdb_name_id}>
                            {actress.name}
                            {': '}
                            {actress.height}
                            {' cm'}
                          </li>
                        ))}
                      </ul>
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
  status: selectTallerStatus(state),
  items: selectTallerItems(state),
});

const mapDispatchToProps = {
  search: search.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SearchTaller);
