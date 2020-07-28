use diesel::r2d2::{ConnectionManager, Pool};
use diesel::SqliteConnection;
use diesel_migrations::embed_migrations;
use snafu::{ResultExt, Snafu};
use std::env;

embed_migrations!();

pub fn db_pool(url: Option<String>) -> Result<DbPool> {
    let database_url = match url {
        Some(u) => format!("{}", u),
        None => env::var("DATABASE_URL").unwrap_or_else(|_| "./imdb.db".to_string()),
    };
    let manager = ConnectionManager::<SqliteConnection>::new(database_url);

    let pool = Pool::builder().build(manager).context(BuildPool)?;

    Ok(pool)
}

pub fn db_migrate(pool: &DbPool) -> Result<()> {
    let conn = pool.get().expect("Couldn't get DB connection");

    embedded_migrations::run_with_output(&conn, &mut std::io::stdout()).context(Migration)?;

    Ok(())
}

pub type DbPool = Pool<ConnectionManager<SqliteConnection>>;

#[derive(Debug, Snafu)]
pub enum DbError {
    #[snafu(display("Could not build pool connection: {}", source))]
    BuildPool { source: diesel::r2d2::PoolError },

    #[snafu(display("Failed to run migrations: {}", source))]
    Migration {
        source: diesel_migrations::RunMigrationsError,
    },
}

pub type Result<T, E = DbError> = std::result::Result<T, E>;
