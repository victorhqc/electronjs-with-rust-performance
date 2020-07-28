mod common;

use common::db_pool;
use rust_core::movies::{
    get_all, rated_by_females_in_year, rated_by_males_in_year, rated_by_year, total,
};

#[test]
fn get_all_movies() {
    let pool = db_pool();

    let movies = get_all(&pool, 0, 500, true).unwrap();

    assert_eq!(movies.len(), 500);
}

#[test]
fn get_total() {
    let pool = db_pool();

    let t = total(&pool, true).unwrap();

    assert_eq!(t, 81_273);
}

#[test]
fn get_rated_by_year() {
    let pool = db_pool();

    let movies = rated_by_year(&pool, 2010, 0, 1, false).unwrap();
    let best_movie = match movies.first() {
        Some(m) => m,
        None => {
            panic!("There's no best movie by males!");
        }
    };

    assert_eq!(best_movie.original_title, String::from("Inception"));
}

#[test]
fn get_rated_by_males() {
    let pool = db_pool();

    let movies = rated_by_males_in_year(&pool, 2010, 0, 2, false).unwrap();

    assert_eq!(movies[0].0.title, String::from("Inception"));
    assert_eq!(movies[1].0.title, String::from("Shutter Island"));
}

#[test]
fn get_rated_by_females() {
    let pool = db_pool();

    let movies = rated_by_females_in_year(&pool, 2010, 0, 2, false).unwrap();

    assert_eq!(movies[0].0.title, String::from("Inception"));
    assert_eq!(movies[1].0.title, String::from("Black Swan"));
}
