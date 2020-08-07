use neon::prelude::*;
use neon_serde::to_value;
use rust_core::{
    db_pool,
    models::{EnrichedImdbName, ImdbNameWithMoviesAndActresses},
    movies::{
        parallel_search_movies_by_name, parallel_search_movies_where_actress_is_taller_than_star,
        search_movies_by_name, search_movies_where_actress_is_taller_than_star, MoviesError,
    },
    DbError,
};
use snafu::{ResultExt, Snafu};
use std::result::Result;

pub struct SearchMoviesByNameTask {
    pub needle: String,
    pub parallel: bool,
    pub db_path: Option<String>,
}

impl Task for SearchMoviesByNameTask {
    type Output = Vec<EnrichedImdbName>;
    type Error = MoviesTaskError;
    type JsEvent = JsValue;
    fn perform(&self) -> Result<Self::Output, Self::Error> {
        let pool = db_pool(self.db_path.clone()).context(DBIssue)?;
        let conn = pool.get().unwrap();
        let names: Vec<EnrichedImdbName> = match self.parallel {
            true => parallel_search_movies_by_name(&pool, &self.needle).context(MoviesIssue)?,
            false => search_movies_by_name(&conn, &self.needle).context(MoviesIssue)?,
        };

        Ok(names)
    }

    fn complete(
        self,
        mut cx: TaskContext,
        result: Result<Self::Output, Self::Error>,
    ) -> JsResult<Self::JsEvent> {
        match result {
            Err(err) => cx.throw_error(format!("Something went wrong: {:?}", err)),
            Ok(d) => {
                let res = match to_value(&mut cx, &d) {
                    Err(err) => cx.throw_error(format!("Something went wrong: {:?}", err)),
                    Ok(r) => Ok(r),
                };
                res
            }
        }
    }
}

pub struct SearchMoviesWhereTallerTask {
    pub needle: String,
    pub parallel: bool,
    pub db_path: Option<String>,
}

impl Task for SearchMoviesWhereTallerTask {
    type Output = Vec<ImdbNameWithMoviesAndActresses>;
    type Error = MoviesTaskError;
    type JsEvent = JsValue;
    fn perform(&self) -> Result<Self::Output, Self::Error> {
        let pool = db_pool(self.db_path.clone()).context(DBIssue)?;
        let conn = pool.get().unwrap();

        let names: Vec<ImdbNameWithMoviesAndActresses> = match self.parallel {
            true => parallel_search_movies_where_actress_is_taller_than_star(&pool, &self.needle)
                .context(MoviesIssue)?,
            false => search_movies_where_actress_is_taller_than_star(&conn, &self.needle)
                .context(MoviesIssue)?,
        };

        Ok(names)
    }

    fn complete(
        self,
        mut cx: TaskContext,
        result: Result<Self::Output, Self::Error>,
    ) -> JsResult<Self::JsEvent> {
        match result {
            Err(err) => cx.throw_error(format!("Something went wrong: {:?}", err)),
            Ok(d) => {
                let res = match to_value(&mut cx, &d) {
                    Err(err) => cx.throw_error(format!("Something went wrong: {:?}", err)),
                    Ok(r) => Ok(r),
                };
                res
            }
        }
    }
}

#[derive(Debug, Snafu)]
pub enum MoviesTaskError {
    #[snafu(display("Failed to work with DB: {}", cause))]
    DBIssue {
        #[snafu(source)]
        cause: DbError,
    },

    #[snafu(display("Movies failed: {}", cause))]
    MoviesIssue {
        #[snafu(source)]
        cause: MoviesError,
    },

    #[snafu(display("Failed to serialize value: {}", source))]
    Serialization { source: neon_serde::errors::Error },
}
