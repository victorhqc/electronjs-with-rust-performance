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
  const [parallel, setParallel] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      search({ needle, parallel });
    },
    [search, needle, parallel],
  );

  const handleType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNeedle(e.target.value);
  }, []);

  const handleParallelClick = useCallback(() => {
    setParallel((p) => !p);
  }, []);

  return (
    <div className="search-taller" data-testid="search-taller">
      <h1 className="search-taller__title">Search Where Actresses Are Taller 💃 than the ⭐</h1>
      <form className="search-taller__form" onSubmit={handleSubmit}>
        <div>
          <input
            className="search-taller__input"
            type="text"
            value={needle}
            onChange={handleType}
            placeholder="Type a name..."
          />
          <button className="search-taller__button">Search</button>
        </div>
        <div>
          <label className="search-taller__input-label" htmlFor="parallel-input">
            Parallel?
          </label>
          <input
            type="checkbox"
            id="parallel-input"
            className="search-by-names__checkbox"
            checked={parallel}
            onChange={handleParallelClick}
          />
        </div>
      </form>
      <div className="search-taller__items-wrapper">
        {status === 'loading' && <h2>Loading...</h2>}
        {items.length === 0 && status !== 'loading' && (
          <p className="search-taller__no-results">No results found.</p>
        )}
        {status === 'done' && (
          <ul className="search-taller__items">
            {items.map(({ data, movies }) => (
              <div key={data.imdbNameId} className="search-taller__item">
                <p className="search-taller__item--name">
                  {data.name}{' '}
                  <small className="search-taller__item--birth-name">
                    <i>{data.birthName}</i>
                  </small>{' '}
                  <span>({data.height} cm)</span>
                </p>
                <ul className="search-taller__item--movies">
                  {movies.map(([movie, actresses]) => (
                    <div key={movie.imdbTitleId} className="search-taller__item--movie">
                      <p>{movie.originalTitle}</p>
                      <p>Taller Actresses:</p>
                      <ul>
                        {actresses.map((actress) => (
                          <li key={actress.imdbNameId}>
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
