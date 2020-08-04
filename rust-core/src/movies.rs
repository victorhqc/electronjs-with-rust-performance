use crate::models::{EnrichedImdbName, ImdbMovie, ImdbName, ImdbTitlePrincipal};
use crate::DbPool;
use diesel::prelude::*;
use rayon::prelude::*;
use snafu::{ResultExt, Snafu};
use std::cmp::Ordering::Equal;
// use std::sync::Mutex;
use std::sync::Arc;
// use threads_pool::*;

pub fn search_movies_by_name(pool: &DbPool, p_name: &str) -> Result<Vec<EnrichedImdbName>> {
    let conn = pool.get().context(GetConnection)?;
    // let m_conn = Mutex::new(pool.get().context(GetConnection)?);
    // let a_conn = Arc::new(pool.get().context(GetConnection)?);
    // let t_pool = ThreadPool::new(12);
    let arc_pool = Arc::new(pool);

    let names: Vec<ImdbName> = {
        use crate::schema::imdb_names::dsl::*;
        let needle = format!("%{}%", p_name);

        imdb_names
            .filter(name.like(&needle))
            .or_filter(birth_name.like(&needle))
            .load(&conn)
            .context(Query)?
    };

    // let m_result = Mutex::new(Vec::mew<EnrichedImdbName>());

    // Split the work in chunks of 1_000
    // for chunk in names.chunks(1000) {
    //     t_pool.execute(move || {
    //         let conn = a_conn.clone();

    //         let principals: Vec<ImdbTitlePrincipal> = {
    //             use crate
    //         };
    //     });
    // }

    let mut result: Vec<EnrichedImdbName> = names
        .into_par_iter()
        .map(move |name| {
            let p = Arc::clone(&arc_pool);
            let conn = p.get().unwrap();
            let principals: Vec<ImdbTitlePrincipal> = {
                use crate::schema::imdb_title_principals::dsl::*;

                imdb_title_principals
                    .filter(imdb_name_id.eq(&name.imdb_name_id))
                    .load::<ImdbTitlePrincipal>(&conn)
                    .unwrap()
            };

            let mut movies: Vec<ImdbMovie> = principals
                .par_iter()
                .map(move |principal| {
                    use crate::schema::imdb_movies::dsl::*;
                    let conn = p.get().unwrap();

                    let movie: ImdbMovie = imdb_movies
                        .filter(imdb_title_id.eq(&principal.imdb_title_id))
                        .get_result::<ImdbMovie>(&conn)
                        .unwrap();

                    movie
                })
                .collect();

            // Sort by metascore
            movies.sort_by(|a, b| b.metascore.cmp(&a.metascore));

            let metascore = calculate_overall_metascore(&movies);
            EnrichedImdbName {
                data: name,
                movies,
                metascore,
            }
        })
        .collect();

    // unimplemented!();

    // Sort by amount of movies
    result.sort_by(|a, b| b.movies.len().cmp(&a.movies.len()));

    // Sort by overall metascore
    result.sort_by(|a, b| b.metascore.partial_cmp(&a.metascore).unwrap_or(Equal));

    Ok(result)
}

fn calculate_overall_metascore(m: &Vec<ImdbMovie>) -> f32 {
    if m.len() == 0 {
        return 0.0;
    }

    let mut length = m.len();
    let amount = m.iter().fold(0, |acc, movie| {
        if movie.metascore == 0 {
            length -= 1;
            return acc;
        }

        acc + movie.metascore
    });

    if length <= 0 {
        return 0.0;
    }

    (amount as f32) / (length as f32)
}

pub type Result<T, E = MoviesError> = std::result::Result<T, E>;

#[derive(Debug, Snafu)]
pub enum MoviesError {
    #[snafu(display("Could not get SQLite connection: {}", source))]
    GetConnection { source: diesel::r2d2::PoolError },

    #[snafu(display("Query Failed: {}", source))]
    Query { source: diesel::result::Error },
}
