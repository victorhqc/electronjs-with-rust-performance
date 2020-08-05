mod common;

use common::db_pool;
use rust_core::movies::search_movies_by_name;

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

    let names = search_movies_by_name(&pool, "brad pitt").unwrap();
    assert!(names.len() > 0);
    let names = search_movies_by_name(&pool, "brad pitt").unwrap();
    assert!(names.len() > 0);
}
