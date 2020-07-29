#[macro_use]
extern crate diesel;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate diesel_migrations;

#[macro_use]
extern crate strum_macros;

mod db;
pub mod dsl;
pub mod models;
pub mod movies;
pub mod schema;
mod types;

pub use db::*;
pub use types::*;
