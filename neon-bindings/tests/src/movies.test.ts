import { searchMoviesByName } from 'neon-bindings';

describe('Search by name', () => {
  beforeEach(() => {
    jest.setTimeout(60 * 5 * 1000);
  });

  it('Search brad pitt', async () => {
    const names = await searchMoviesByName({ needle: 'brad pitt' });
    expect(names.length > 0).toBeTruthy();
  });

  it('Search brad', async () => {
    const names = await searchMoviesByName({ needle: 'brad' });
    expect(names.length > 0).toBeTruthy();
  });

  it('Search brad twice', async () => {
    const names = await searchMoviesByName({ needle: 'brad' });
    expect(names.length > 0).toBeTruthy();
    const names_2 = await searchMoviesByName({ needle: 'brad' });
    expect(names_2.length > 0).toBeTruthy();
  });
});
