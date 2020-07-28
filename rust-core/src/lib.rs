#[macro_use]
extern crate diesel;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate diesel_migrations;

mod db;
pub mod dsl;
pub mod models;
pub mod movies;
pub mod schema;

pub use db::*;
