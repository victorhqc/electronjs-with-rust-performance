mod common;

use common::db_pool;
use rust_core::movies::{get_all, rated_by_year, total};

#[test]
fn get_all_movies() {
  let pool = db_pool();

  let movies = get_all(&pool, 0, 500).unwrap();

  assert_eq!(movies.len(), 500);
}

#[test]
fn get_total() {
  let pool = db_pool();

  let t = total(&pool).unwrap();

  assert_eq!(t, 81_273);
}

#[test]
fn get_rated_by_year() {
  let pool = db_pool();

  let movies = rated_by_year(&pool, 2010, 0, 1).unwrap();
  let best_movie = match movies.first() {
    Some(m) => m,
    None => {
      unreachable!();
    }
  };

  assert_eq!(best_movie.original_title, String::from("Inception"));
}
