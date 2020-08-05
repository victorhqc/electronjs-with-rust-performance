use neon::prelude::*;
use neon_serde::to_value;
use rust_core::{
    db_pool,
    models::EnrichedImdbName,
    movies::{search_movies_by_name, MoviesError},
    DbError,
};
use snafu::{ResultExt, Snafu};
use std::result::Result;

pub struct SearchMoviesByNameTask {
    pub needle: String,
    pub db_path: Option<String>,
}

impl Task for SearchMoviesByNameTask {
    type Output = Vec<EnrichedImdbName>;
    type Error = MoviesTaskError;
    type JsEvent = JsValue;
    fn perform(&self) -> Result<Self::Output, Self::Error> {
        let pool = db_pool(self.db_path.clone()).context(DBIssue)?;
        let names: Vec<EnrichedImdbName> =
            search_movies_by_name(&pool, &self.needle).context(MoviesIssue)?;

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
