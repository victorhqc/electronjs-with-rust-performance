use neon::prelude::*;
use neon_serde::to_value;
use rust_core::{
    db_pool,
    models::EnrichedImdbName,
    movies::{search_movies_by_name, MoviesError},
    DbError,
};
use snafu::{ResultExt, Snafu};

pub struct SearchMoviesByNameTask {
    pub needle: String,
    pub db_path: Option<String>,
}

impl Task for SearchMoviesByNameTask {
    type Output = Vec<EnrichedImdbName>;
    type Error = MoviesTaskError;
    type JsEvent = JsValue;

    fn perform(&self) -> Result<Self::Output, Self::Error> {
        let names: Vec<EnrichedImdbName> = {
            let pool = db_pool(self.db_path.clone()).context(DBIssue)?;

            search_movies_by_name(&pool, &self.needle).context(MoviesIssue)?
        };

        Ok(names)
    }

    fn complete(
        self,
        mut cx: TaskContext,
        result: Result<Self::Output>,
    ) -> JsResult<Self::JsEvent> {
        let data = to_value(&mut cx, &result.unwrap())
            .context(Serialization)
            .unwrap();

        Ok(data)
    }
}

type Result<T, E = MoviesTaskError> = std::result::Result<T, E>;

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
