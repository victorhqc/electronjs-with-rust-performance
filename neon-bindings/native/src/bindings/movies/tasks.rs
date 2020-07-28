use neon::prelude::*;
use neon_serde::to_value;
use rust_core::{
    db_pool,
    models::{ImdbMovie, ImdbRatings},
    movies::{get_all, MoviesError},
    DbError,
};
use snafu::{ResultExt, Snafu};

pub struct GetMoviesTask {
    pub offset: i64,
    pub limit: i64,
    pub bollywood: bool,
    pub db_path: Option<String>,
}

impl Task for GetMoviesTask {
    type Output = Vec<ImdbMovie>;
    type Error = MoviesTaskError;
    type JsEvent = JsValue;

    fn perform(&self) -> Result<Self::Output> {
        let movies: Vec<ImdbMovie> = {
            let pool = db_pool(self.db_path.clone()).context(DBIssue)?;

            get_all(&pool, self.offset, self.limit, self.bollywood).context(MoviesIssue)?
        };

        Ok(movies)
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
