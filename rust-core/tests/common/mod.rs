use rust_core::{connect as core_connect, Conn};
#[cfg(feature = "parallel")]
use rust_core::{db_pool as core_db_pool, DbPool};

#[cfg(feature = "parallel")]
#[allow(dead_code)]
pub fn db_pool() -> DbPool {
    core_db_pool(None).unwrap()
}

#[allow(dead_code)]
pub fn connect() -> Conn {
    core_connect(None).unwrap()
}
