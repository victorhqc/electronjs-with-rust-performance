import { getConnection } from 'typeorm';
import { ImdbMovie } from '../../entity/ImdbMovie';
import { ImdbName } from '../../entity/ImdbName';
import { ImdbTitlePrincipal } from '../../entity/ImdbTitlePrincipal';

export async function getMoviesTotal() {
  const conn = getConnection();
  const total = await conn.getRepository(ImdbMovie).createQueryBuilder('total').getCount();

  return total;
}

// Why not joins? Primarily to stress the JavaScript side, as it may actually be needed in some
// kind of applications as stated here: https://github.com/petehunt/rowrm#why-cant-i-do-joins
export async function searchMoviesByName(name: string): Promise<NameWithMoviesTuple[]> {
  if (name.length <= 2) {
    return Promise.resolve([]);
  }

  const conn = getConnection();
  const result: NameWithMoviesTuple[] = [];

  const actors = await conn
    .getRepository(ImdbName)
    .createQueryBuilder('actors')
    .where('name LIKE :name', { name: `%${name}%` })
    .orWhere('birth_name LIKE :name', { name: `%${name}%` })
    .printSql()
    .getMany();

  for (const actor of actors) {
    const principals = await conn
      .getRepository(ImdbTitlePrincipal)
      .createQueryBuilder('principals')
      .where('imdb_name_id = :id', { id: actor.imdb_name_id })
      .getMany();

    const movies: ImdbMovie[] = [];
    for (const principal of principals) {
      const movie = await conn
        .getRepository(ImdbMovie)
        .createQueryBuilder('movies')
        .where('imdb_title_id = :id', { id: principal.imdb_title_id })
        .getOne();

      movies.push(movie);
    }

    result.push([actor, movies.sort(byMetascore).reverse()]);
  }

  return result.sort(byMoviesAmount).sort(byMoviesOverallMetascore).reverse();
}

function byMoviesAmount(a: NameWithMoviesTuple, b: NameWithMoviesTuple) {
  if (a[1].length < b[1].length) {
    return -1;
  }

  if (a[1].length > b[1].length) {
    return 1;
  }

  return 0;
}

function byMoviesOverallMetascore(a: NameWithMoviesTuple, b: NameWithMoviesTuple) {
  if (calculateOverallMetascore(a) < calculateOverallMetascore(b)) {
    return -1;
  }

  if (calculateOverallMetascore(a) < calculateOverallMetascore(b)) {
    return 1;
  }

  return 0;
}

function byMetascore(a: ImdbMovie, b: ImdbMovie) {
  if (a.metascore < b.metascore) {
    return -1;
  }

  if (a.metascore > b.metascore) {
    return 1;
  }

  return 0;
}

export function calculateOverallMetascore([_, movies]: NameWithMoviesTuple): number {
  if (movies.length === 0) {
    return 0;
  }

  let length = movies.length;
  const amount = movies.reduce((acc, movie) => {
    // Ignore movies that doesn't have metascore.
    if (!movie.metascore) {
      length -= 1;
      return acc;
    }

    return acc + movie.metascore;
  }, 0);

  if (!length) {
    return 0;
  }

  return amount / length;
}

type NameWithMoviesTuple = [ImdbName, ImdbMovie[]];
