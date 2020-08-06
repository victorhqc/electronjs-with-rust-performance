import { searchMoviesByName, searchMoviesWhereActressIsTaller } from 'neon-bindings';

describe('Search by name', () => {
  beforeEach(() => {
    jest.setTimeout(60 * 5 * 1000);
  });

  it('Search brad pitt', async () => {
    const names = await searchMoviesByName({ needle: 'brad pitt', parallel: false });
    expect(names.length > 0).toBeTruthy();
  });

  it('Search brad', async () => {
    const names = await searchMoviesByName({ needle: 'brad', parallel: false });
    expect(names.length > 0).toBeTruthy();
  });

  it('Search brad twice', async () => {
    const names = await searchMoviesByName({ needle: 'brad', parallel: true });
    expect(names.length > 0).toBeTruthy();
    const names_2 = await searchMoviesByName({ needle: 'brad', parallel: true });
    expect(names_2.length > 0).toBeTruthy();
  });
});

describe('Search where actresses are taller', () => {
  beforeEach(() => {
    jest.setTimeout(60 * 5 * 1000);
  });

  it('Search tom cruise', async () => {
    const names = await searchMoviesWhereActressIsTaller({ needle: 'tom cruise', parallel: false });
    expect(names.length > 0).toBeTruthy();
  });

  it('Search liam neeson in parallel', async () => {
    const names = await searchMoviesWhereActressIsTaller({ needle: 'liam neeson', parallel: true });
    expect(names.length > 0).toBeTruthy();
  });
});
