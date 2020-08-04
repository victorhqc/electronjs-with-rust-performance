use diesel::connection::SimpleConnection;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::result::QueryResult;
use diesel::SqliteConnection;
use diesel_migrations::embed_migrations;
use snafu::{ResultExt, Snafu};
use std::env;
use std::time::Duration;

embed_migrations!();

#[derive(Debug)]
pub struct ConnectionOptions {
    pub enable_foreign_keys: bool,
    pub busy_timeout: Option<Duration>,
}

impl ConnectionOptions {
    pub fn apply(&self, conn: &SqliteConnection) -> QueryResult<()> {
        if self.enable_foreign_keys {
            conn.batch_execute("PRAGMA foreign_keys = ON;")?;
        }
        if let Some(duration) = self.busy_timeout {
            conn.batch_execute(&format!("PRAGMA busy_timeout = {};", duration.as_millis()))?;
        }
        Ok(())
    }
}

impl Default for ConnectionOptions {
    fn default() -> Self {
        Self {
            enable_foreign_keys: true,
            busy_timeout: Some(Duration::from_millis(1)),
        }
    }
}

impl diesel::r2d2::CustomizeConnection<SqliteConnection, diesel::r2d2::Error>
    for ConnectionOptions
{
    fn on_acquire(&self, conn: &mut SqliteConnection) -> Result<(), diesel::r2d2::Error> {
        self.apply(conn).map_err(diesel::r2d2::Error::QueryError)
    }
}

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
