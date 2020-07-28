use rust_core::{db_pool as core_db_pool, DbPool};

#[allow(dead_code)]
pub fn db_pool() -> DbPool {
    core_db_pool(None).unwrap()
}
