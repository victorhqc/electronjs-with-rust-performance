use crate::db::DbPool;
use crate::models::ImdbMovie;
use diesel::prelude::*;
use snafu::{ResultExt, Snafu};

pub fn get_all(pool: &DbPool, offset: i64, limit: i64) -> Result<Vec<ImdbMovie>> {
  let conn = pool.get().context(GetConnection)?;

  let movies: Vec<ImdbMovie> = {
    use crate::schema::imdb_movies::dsl::*;

    imdb_movies
      .limit(limit)
      .offset(offset)
      .load(&conn)
      .context(Query)?
  };

  Ok(movies)
}

pub fn total(pool: &DbPool) -> Result<i64> {
  use crate::schema::imdb_movies::dsl::*;

  let conn = pool.get().context(GetConnection)?;

  let total = imdb_movies.count().get_result(&conn).context(Query)?;
  Ok(total)
}

pub fn rated_by_year(
  pool: &DbPool,
  desired_year: i32,
  offset: i64,
  limit: i64,
) -> Result<Vec<ImdbMovie>> {
  let conn = pool.get().context(GetConnection)?;

  let movies: Vec<ImdbMovie> = {
    use crate::schema::imdb_movies::dsl::*;

    imdb_movies
      .filter(year.eq(desired_year))
      .order_by(votes.desc())
      .then_order_by(avg_vote.desc())
      .limit(limit)
      .offset(offset)
      .load(&conn)
      .context(Query)?
  };

  Ok(movies)
}

pub type Result<T, E = RatingsError> = std::result::Result<T, E>;

#[derive(Debug, Snafu)]
pub enum RatingsError {
  #[snafu(display("Could not get SQLite connection: {}", source))]
  GetConnection { source: diesel::r2d2::PoolError },

  #[snafu(display("Query Failed: {}", source))]
  Query { source: diesel::result::Error },
}
