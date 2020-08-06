mod common;

use common::db_pool;
use rust_core::movies::{
    parallel_search_movies_by_name, parallel_search_movies_where_actress_is_taller_than_star,
    search_movies_by_name, search_movies_where_actress_is_taller_than_star,
};
use std::time::Instant;

#[test]
fn search_brad_pitt() {
    let pool = db_pool();

    let names = search_movies_by_name(&pool, "brad pitt").unwrap();

    assert_eq!(names[0].data.name, "Brad Pitt".to_string());
    assert_eq!(names[0].metascore, 61.058823);
    assert_eq!(names[0].movies.len(), 19);
}

#[test]
fn search_brad() {
    let pool = db_pool();

    let names = search_movies_by_name(&pool, "brad").unwrap();

    assert!(names.len() > 0);
}

#[test]
fn search_twice() {
    let pool = db_pool();

    let names = parallel_search_movies_by_name(&pool, "brad pitt").unwrap();
    assert!(names.len() > 0);
    let names = parallel_search_movies_by_name(&pool, "brad pitt").unwrap();
    assert!(names.len() > 0);
}

#[test]
fn search_taller() {
    let pool = db_pool();

    let names = search_movies_where_actress_is_taller_than_star(&pool, "liam neeson").unwrap();
    assert!(names.len() > 0);
}

#[test]
fn search_parallel_taller() {
    let pool = db_pool();

    let names =
        parallel_search_movies_where_actress_is_taller_than_star(&pool, "liam neeson").unwrap();
    assert!(names.len() > 0);
    let names =
        parallel_search_movies_where_actress_is_taller_than_star(&pool, "liam neeson").unwrap();
    assert!(names.len() > 0);
}

#[test]
fn search_liam() {
    let pool = db_pool();

    let start = Instant::now();
    let names = search_movies_where_actress_is_taller_than_star(&pool, "liam").unwrap();
    let duration = start.elapsed();
    println!("Time elapsed searching for liam is: {:?}", duration);

    assert!(names.len() > 0);
}

#[test]
fn search_parallel_liam() {
    let pool = db_pool();

    let start = Instant::now();
    let names = parallel_search_movies_where_actress_is_taller_than_star(&pool, "liam").unwrap();
    let duration = start.elapsed();
    println!(
        "Time elapsed parallel searching for liam is: {:?}",
        duration
    );

    assert!(names.len() > 0);
}
