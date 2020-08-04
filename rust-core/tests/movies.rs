mod common;

use common::db_pool;
use rust_core::movies::search_movies_by_name;

#[test]
fn search_movies() {
    let pool = db_pool();

    let names = search_movies_by_name(&pool, "brad pitt").unwrap();

    assert_eq!(names[0].data.name, "Brad Pitt".to_string());
    assert_eq!(names[0].metascore, 61.058823);
    assert_eq!(names[0].movies.len(), 19);
}
