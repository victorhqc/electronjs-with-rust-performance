import { searchMoviesByName, searchMoviesWhereActressIsTaller } from 'neon-bindings';
import { performance } from 'perf_hooks';

describe('Search by name', () => {
  beforeEach(() => {
    jest.setTimeout(60 * 5 * 1000);
  });

  it('Search brad pitt', async () => {
    const t0 = performance.now();
    const names = await searchMoviesByName({ needle: 'brad pitt', parallel: false });
    expect(names.length > 0).toBeTruthy();
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
  });

  it('Search brad', async () => {
    const t0 = performance.now();
    const names = await searchMoviesByName({ needle: 'brad', parallel: false });
    expect(names.length > 0).toBeTruthy();
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
  });

  it('Search brad twice', async () => {
    const t0 = performance.now();
    const names = await searchMoviesByName({ needle: 'brad', parallel: true });
    expect(names.length > 0).toBeTruthy();
    const names_2 = await searchMoviesByName({ needle: 'brad', parallel: true });
    expect(names_2.length > 0).toBeTruthy();
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
  });
});

describe('Search where actresses are taller', () => {
  beforeEach(() => {
    jest.setTimeout(60 * 5 * 1000);
  });

  it('Search tom cruise', async () => {
    const t0 = performance.now();
    const names = await searchMoviesWhereActressIsTaller({ needle: 'tom cruise', parallel: false });
    expect(names.length > 0).toBeTruthy();
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
  });

  it.only('Search liam', async () => {
    const t0 = performance.now();
    const names = await searchMoviesWhereActressIsTaller({ needle: 'liam', parallel: false });
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
    expect(names.length > 0).toBeTruthy();
  });

  it('Search liam neeson in parallel', async () => {
    const t0 = performance.now();
    const names = await searchMoviesWhereActressIsTaller({ needle: 'liam neeson', parallel: true });
    expect(names.length > 0).toBeTruthy();
    const t1 = performance.now();
    console.log(`Search took: ${t1 - t0} milliseconds.`);
  });
});
