use crate::dsl::{
    movies::Columns as MoviesColumns, movies::ALL_COLUMNS as MOVIES_ALL_COLUMNS,
    ratings::Columns as RatingsColumns, ratings::ALL_COLUMNS as RATINGS_ALL_COLUMNS,
};
use crate::models::{ImdbMovie, ImdbRatings};
use crate::{DbPool, Gender};
use diesel::prelude::*;
use snafu::{ResultExt, Snafu};

pub fn get_all(pool: &DbPool, offset: i64, limit: i64, bollywod: bool) -> Result<Vec<ImdbMovie>> {
    let conn = pool.get().context(GetConnection)?;

    let movies: Vec<ImdbMovie> = {
        use crate::schema::imdb_movies::dsl::*;

        let mut query = imdb_movies.limit(limit).offset(offset).into_boxed();

        if !bollywod {
            query = query.filter(country.ne(String::from("India")));
        }

        query.load(&conn).context(Query)?
    };

    Ok(movies)
}

pub fn total(pool: &DbPool, bollywood: bool) -> Result<i64> {
    use crate::schema::imdb_movies::dsl::*;

    let conn = pool.get().context(GetConnection)?;

    let mut query = imdb_movies.count().into_boxed();

    if !bollywood {
        query = query.filter(country.ne(String::from("India")));
    }

    let total = query.get_result(&conn).context(Query)?;
    Ok(total)
}

pub struct RatedByYearArgs {
    pub year: i32,
    pub offset: i64,
    pub limit: i64,
    pub bollywood: bool,
}

pub fn rated_by_year(pool: &DbPool, args: RatedByYearArgs) -> Result<Vec<ImdbMovie>> {
    let conn = pool.get().context(GetConnection)?;

    let movies: Vec<ImdbMovie> = {
        use crate::schema::imdb_movies::dsl::*;

        let mut query = imdb_movies
            .filter(year.eq(args.year))
            .order_by(votes.desc())
            .then_order_by(avg_vote.desc())
            .limit(args.limit)
            .offset(args.offset)
            .into_boxed();

        // @TODO: Abstract this into a DSL function
        if !args.bollywood {
            query = query.filter(country.ne(String::from("India")));
        }

        query.load(&conn).context(Query)?
    };

    Ok(movies)
}

pub struct RatedByGenderArgs {
    pub gender: Gender,
    pub year: i32,
    pub offset: i64,
    pub limit: i64,
    pub bollywood: bool,
}

pub fn rated_by_gender_in_year(
    pool: &DbPool,
    args: RatedByGenderArgs,
) -> Result<Vec<(ImdbMovie, ImdbRatings)>> {
    let conn = pool.get().context(GetConnection)?;

    let ratings: Vec<(ImdbMovie, ImdbRatings)> = {
        use crate::schema::{imdb_movies, imdb_ratings};

        let join = imdb_movies::table.inner_join(imdb_ratings::table);

        // @TODO: Move away from join & loop instead.
        // There's an interesting reason here: https://github.com/petehunt/rowrm#why-cant-i-do-joins
        let mut query = join
            .select((MOVIES_ALL_COLUMNS, RATINGS_ALL_COLUMNS))
            .filter(imdb_movies::year.eq(args.year))
            .limit(args.limit)
            .offset(args.offset)
            .into_boxed();
        match args.gender {
            Gender::Male => {
                query = query
                    .order_by(imdb_ratings::males_allages_votes.desc())
                    .then_order_by(imdb_ratings::males_allages_avg_vote.desc())
            }
            Gender::Female => {
                query = query
                    .order_by(imdb_ratings::females_allages_votes.desc())
                    .then_order_by(imdb_ratings::females_allages_avg_vote.desc())
            }
        };

        if !args.bollywood {
            query = query.filter(imdb_movies::country.ne(String::from("India")));
        }

        let data = query
            .load::<(MoviesColumns, RatingsColumns)>(&conn)
            .context(Query)?;

        data.into_iter()
            .map(|(raw_movie, raw_rating)| {
                (
                    ImdbMovie::from_tuple(raw_movie),
                    ImdbRatings::from_tuple(raw_rating),
                )
            })
            .collect()
    };

    Ok(ratings)
}

pub type Result<T, E = MoviesError> = std::result::Result<T, E>;

#[derive(Debug, Snafu)]
pub enum MoviesError {
    #[snafu(display("Could not get SQLite connection: {}", source))]
    GetConnection { source: diesel::r2d2::PoolError },

    #[snafu(display("Query Failed: {}", source))]
    Query { source: diesel::result::Error },
}
