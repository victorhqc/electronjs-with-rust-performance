import { Op } from 'sequelize';
import { ImdbMovie } from '../../entity/ImdbMovie';
import { ImdbName } from '../../entity/ImdbName';
import { ImdbTitlePrincipal } from '../../entity/ImdbTitlePrincipal';
import { TallerThanTuple, NameWithMoviesTuple } from '../../store/movies';

export async function getMoviesTotal() {
  const total = await ImdbMovie.count();

  return total;
}

export async function searchMoviesWhereActressIsTallerThan(
  name: string,
): Promise<TallerThanTuple[]> {
  if (name.length <= 2) {
    return Promise.resolve([]);
  }

  const result: TallerThanTuple[] = [];
  const actors = await findActorsBy(name);

  for (const actor of actors) {
    const principals = await findPrincipalsFrom(actor);
    const whereIds = principals.map((p) => ({ imdb_title_id: p.imdb_title_id }));

    if (principals.length === 0) {
      result.push([actor, []]);
      break;
    }

    const coActressesPrincipal = (
      await ImdbTitlePrincipal.findAll({
        where: {
          [Op.or]: whereIds,
          [Op.and]: {
            category: 'actress',
          },
        },
      })
    ).map<ImdbTitlePrincipal>((p) => p.get());

    const coActressesIds = coActressesPrincipal.map((a) => ({ imdb_name_id: a.imdb_name_id }));
    // Get all the actresses that are taller than the actor.
    let actresses: ImdbName[] = [];

    if (coActressesPrincipal.length > 0) {
      actresses = (
        await ImdbName.findAll({
          where: {
            [Op.or]: coActressesIds,
          },
        })
      )
        .map<ImdbName>((a) => a.get())
        .filter((a) => (a.height || 0) > actor.height);
    }

    const actressesMap: Record<string, ImdbName> = actresses.reduce(
      (acc, actress) => ({
        ...acc,
        [actress.imdb_name_id]: actress,
      }),
      {},
    );

    const filteredCoActressesPrincipal = coActressesPrincipal.filter((principal) => {
      return Boolean(actressesMap[principal.imdb_name_id]);
    });

    const filteredPrincipals = principals.filter((principal) => {
      const index = filteredCoActressesPrincipal.findIndex(
        (actressPrincipal) => actressPrincipal.imdb_title_id === principal.imdb_title_id,
      );

      return index >= 0;
    });
    const filteredPrincipalIds = filteredPrincipals.map((p) => ({
      imdb_title_id: p.imdb_title_id,
    }));

    let movies: ImdbMovie[] = [];

    if (filteredPrincipals.length > 0) {
      movies = await searchtMoviesFrom(filteredPrincipalIds);
    }

    const moviesWithActresses = movies
      .map((movie) => {
        const actressesInMovie = filteredCoActressesPrincipal
          .filter((principal) => {
            return principal.imdb_title_id === movie.imdb_title_id;
          })
          .map((principal) => {
            return actressesMap[principal.imdb_name_id];
          });

        return {
          movie,
          actress: actressesInMovie,
        };
      })
      .filter(({ actress }) => actress.length > 0);

    result.push([actor, moviesWithActresses]);
  }

  return result;
}

// Why not joins? Primarily to stress the JavaScript side, as it may actually be needed in some
// kind of applications as stated here: https://github.com/petehunt/rowrm#why-cant-i-do-joins
/**
 * Searches actors/people by name and finds the movies they participated in. The result gets ordered
 * by metascore.
 *
 * @param name
 */
export async function searchMoviesByName(name: string): Promise<NameWithMoviesTuple[]> {
  if (name.length <= 2) {
    return Promise.resolve([]);
  }

  const result: NameWithMoviesTuple[] = [];

  const actors = await findActorsBy(name);

  for (const actor of actors) {
    const principals = await findPrincipalsFrom(actor);

    const whereIds = principals.map((p) => ({ imdb_title_id: p.imdb_title_id }));
    const movies = await searchtMoviesFrom(whereIds);

    result.push([actor, movies.sort(byMetascore).reverse()]);
  }

  return result.sort(byMoviesAmount).sort(byMoviesOverallMetascore).reverse();
}

async function findActorsBy(name: string) {
  const actors = (
    await ImdbName.findAll({
      where: {
        [Op.or]: {
          name: {
            [Op.like]: `%${name}%`,
          },
          birth_name: {
            [Op.like]: `%${name}%`,
          },
        },
      },
    })
  ).map<ImdbName>((a) => a.get());

  return actors;
}

async function findPrincipalsFrom(actor: ImdbName) {
  const principals = (
    await ImdbTitlePrincipal.findAll({
      where: {
        imdb_name_id: actor.imdb_name_id,
      },
    })
  ).map<ImdbTitlePrincipal>((p) => p.get());

  return principals;
}

async function searchtMoviesFrom(ids: { imdb_title_id: string }[]) {
  const movies = (
    await ImdbMovie.findAll({
      where: {
        [Op.or]: ids,
      },
    })
  ).map<ImdbMovie>((m) => m.get());

  return movies;
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
