use crate::models::{
    EnrichedImdbName, ImdbMovie, ImdbName, ImdbNameWithMoviesAndActresses, ImdbTitlePrincipal,
};
use crate::Conn;
#[cfg(feature = "parallel")]
use crate::DbPool;
use diesel::prelude::*;
#[cfg(feature = "parallel")]
use rayon::prelude::*;
use snafu::{ResultExt, Snafu};
use std::cmp::Ordering::Equal;
use std::collections::HashMap;
#[cfg(feature = "parallel")]
use std::sync::{Arc, Mutex};

#[cfg(feature = "parallel")]
pub fn parallel_search_movies_where_actress_is_taller_than_star(
    pool: &DbPool,
    p_name: &str,
) -> Result<Vec<ImdbNameWithMoviesAndActresses>> {
    let conn = pool.get().context(GetConnection)?;
    let arc_pool = Arc::new(Mutex::new(pool.clone()));

    let names: Vec<ImdbName> = {
        use crate::schema::imdb_names::dsl::*;
        let needle = format!("%{}%", p_name);

        imdb_names
            .filter(name.like(&needle))
            .or_filter(birth_name.like(&needle))
            .load(&conn)
            .context(Query)?
    };

    let result: Vec<ImdbNameWithMoviesAndActresses> = names
        .into_par_iter()
        .map(|name| {
            let pool = Arc::clone(&arc_pool);
            let conn = pool.lock().unwrap().get().unwrap();

            if name.height == 0 {
                return ImdbNameWithMoviesAndActresses {
                    data: name,
                    movies: Vec::new(),
                };
            }

            let principals: Vec<ImdbTitlePrincipal> = {
                use crate::schema::imdb_title_principals::dsl::*;

                imdb_title_principals
                    .filter(imdb_name_id.eq(&name.imdb_name_id))
                    .load::<ImdbTitlePrincipal>(&conn)
                    .unwrap()
            };

            let co_actresses_principal: Vec<ImdbTitlePrincipal> = {
                use crate::schema::imdb_title_principals::dsl::*;

                if principals.len() == 0 {
                    vec![]
                } else {
                    let principal_ids: Vec<String> =
                        principals.iter().map(|p| p.imdb_title_id.clone()).collect();
                    let mut query = imdb_title_principals.into_boxed();
                    for principal_id in principal_ids {
                        query = query.or_filter(imdb_title_id.eq(principal_id));
                    }
                    query = query.filter(category.eq("actress"));
                    query.get_results::<ImdbTitlePrincipal>(&conn).unwrap()
                }
            };

            let actresses: Vec<ImdbName> = {
                use crate::schema::imdb_names;

                if co_actresses_principal.len() == 0 {
                    vec![]
                } else {
                    let mut query = imdb_names::table.into_boxed();
                    for c_a in co_actresses_principal.clone() {
                        query = query.or_filter(imdb_names::imdb_name_id.eq(c_a.imdb_name_id));
                    }
                    query = query.filter(imdb_names::height.gt(name.height));
                    query.get_results::<ImdbName>(&conn).unwrap()
                }
            };

            let actresses_map: HashMap<String, ImdbName> = {
                let mut actresses_map: HashMap<String, ImdbName> = HashMap::new();
                actresses.iter().for_each(|actress| {
                    actresses_map.insert(actress.imdb_name_id.clone(), actress.clone());
                });

                actresses_map
            };

            let filtered_co_actresses_principal: Vec<ImdbTitlePrincipal> = co_actresses_principal
                .into_iter()
                .filter(|p| actresses_map.contains_key(&p.imdb_name_id))
                .collect();

            let filtered_principals: Vec<ImdbTitlePrincipal> = principals
                .into_iter()
                .filter(|p| {
                    let exists = filtered_co_actresses_principal
                        .iter()
                        .find(|a_p| a_p.imdb_title_id == p.imdb_title_id);

                    match exists {
                        Some(_) => true,
                        None => false,
                    }
                })
                .collect();

            let movies: Vec<ImdbMovie> = {
                use crate::schema::imdb_movies::dsl::*;

                if filtered_principals.len() == 0 {
                    vec![]
                } else {
                    let mut query = imdb_movies.into_boxed();
                    for filtered_id in filtered_principals {
                        query = query.or_filter(imdb_title_id.eq(filtered_id.imdb_title_id));
                    }
                    query.get_results::<ImdbMovie>(&conn).unwrap()
                }
            };

            let movies_with_actresses: Vec<(ImdbMovie, Vec<ImdbName>)> = movies
                .into_iter()
                .map(|movie| {
                    let actress_in_movie: Vec<ImdbName> = filtered_co_actresses_principal
                        .iter()
                        .filter(|p| p.imdb_title_id == movie.imdb_title_id)
                        .map(|p| actresses_map[&p.imdb_name_id].clone())
                        .collect();

                    (movie, actress_in_movie)
                })
                .collect();

            ImdbNameWithMoviesAndActresses {
                data: name,
                movies: movies_with_actresses,
            }
        })
        .collect();

    Ok(result)
}

pub fn search_movies_where_actress_is_taller_than_star(
    conn: &Conn,
    p_name: &str,
) -> Result<Vec<ImdbNameWithMoviesAndActresses>> {
    let names: Vec<ImdbName> = {
        use crate::schema::imdb_names::dsl::*;
        let needle = format!("%{}%", p_name);

        imdb_names
            .filter(name.like(&needle))
            .or_filter(birth_name.like(&needle))
            .load(conn)
            .context(Query)?
    };

    let result: Vec<ImdbNameWithMoviesAndActresses> = names
        .into_iter()
        .map(|name| {
            if name.height == 0 {
                return ImdbNameWithMoviesAndActresses {
                    data: name,
                    movies: Vec::new(),
                };
            }

            let principals: Vec<ImdbTitlePrincipal> = {
                use crate::schema::imdb_title_principals::dsl::*;

                imdb_title_principals
                    .filter(imdb_name_id.eq(&name.imdb_name_id))
                    .load::<ImdbTitlePrincipal>(conn)
                    .unwrap()
            };

            let co_actresses_principal: Vec<ImdbTitlePrincipal> = {
                use crate::schema::imdb_title_principals::dsl::*;

                if principals.len() == 0 {
                    vec![]
                } else {
                    let principal_ids: Vec<String> =
                        principals.iter().map(|p| p.imdb_title_id.clone()).collect();
                    let mut query = imdb_title_principals.into_boxed();
                    for principal_id in principal_ids {
                        query = query.or_filter(imdb_title_id.eq(principal_id));
                    }
                    query = query.filter(category.eq("actress"));
                    query.get_results::<ImdbTitlePrincipal>(conn).unwrap()
                }
            };

            let actresses: Vec<ImdbName> = {
                use crate::schema::imdb_names;

                if co_actresses_principal.len() == 0 {
                    vec![]
                } else {
                    let mut query = imdb_names::table.into_boxed();
                    for c_a in co_actresses_principal.clone() {
                        query = query.or_filter(imdb_names::imdb_name_id.eq(c_a.imdb_name_id));
                    }
                    query = query.filter(imdb_names::height.gt(name.height));
                    query.get_results::<ImdbName>(conn).unwrap()
                }
            }
            .into_iter()
            .filter(|a| a.height > name.height)
            .collect();

            let actresses_map: HashMap<String, ImdbName> = {
                let mut actresses_map: HashMap<String, ImdbName> = HashMap::new();
                actresses.iter().for_each(|actress| {
                    actresses_map.insert(actress.imdb_name_id.clone(), actress.clone());
                });

                actresses_map
            };

            let filtered_co_actresses_principal: Vec<ImdbTitlePrincipal> = co_actresses_principal
                .into_iter()
                .filter(|p| actresses_map.contains_key(&p.imdb_name_id))
                .collect();

            let filtered_principals: Vec<ImdbTitlePrincipal> = principals
                .into_iter()
                .filter(|p| {
                    let exists = filtered_co_actresses_principal
                        .iter()
                        .find(|a_p| a_p.imdb_title_id == p.imdb_title_id);

                    match exists {
                        Some(_) => true,
                        None => false,
                    }
                })
                .collect();

            let movies: Vec<ImdbMovie> = {
                use crate::schema::imdb_movies::dsl::*;

                if filtered_principals.len() == 0 {
                    vec![]
                } else {
                    let mut query = imdb_movies.into_boxed();
                    for filtered_id in filtered_principals {
                        query = query.or_filter(imdb_title_id.eq(filtered_id.imdb_title_id));
                    }
                    query.get_results::<ImdbMovie>(conn).unwrap()
                }
            };

            let movies_with_actresses: Vec<(ImdbMovie, Vec<ImdbName>)> = movies
                .into_iter()
                .map(|movie| {
                    let actress_in_movie: Vec<ImdbName> = filtered_co_actresses_principal
                        .iter()
                        .filter(|p| p.imdb_title_id == movie.imdb_title_id)
                        .map(|p| actresses_map[&p.imdb_name_id].clone())
                        .collect();

                    (movie, actress_in_movie)
                })
                .collect();

            ImdbNameWithMoviesAndActresses {
                data: name,
                movies: movies_with_actresses,
            }
        })
        .collect();

    Ok(result)
}

pub fn search_movies_by_name(conn: &Conn, p_name: &str) -> Result<Vec<EnrichedImdbName>> {
    let names: Vec<ImdbName> = {
        use crate::schema::imdb_names::dsl::*;
        let needle = format!("%{}%", p_name);

        imdb_names
            .filter(name.like(&needle))
            .or_filter(birth_name.like(&needle))
            .load(conn)
            .context(Query)?
    };

    let mut result: Vec<EnrichedImdbName> = names
        .into_iter()
        .map(move |name| {
            let principals: Vec<ImdbTitlePrincipal> = {
                use crate::schema::imdb_title_principals::dsl::*;

                imdb_title_principals
                    .filter(imdb_name_id.eq(&name.imdb_name_id))
                    .load::<ImdbTitlePrincipal>(conn)
                    .unwrap()
            };

            let movie_ids: Vec<String> =
                principals.iter().map(|p| p.imdb_title_id.clone()).collect();

            let mut movies: Vec<ImdbMovie> = {
                use crate::schema::imdb_movies::dsl::*;

                let mut query = imdb_movies.into_boxed();
                for id in movie_ids {
                    query = query.or_filter(imdb_title_id.eq(id));
                }

                query.get_results::<ImdbMovie>(conn).unwrap()
            };

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

    // Sort by amount of movies
    result.sort_by(|a, b| b.movies.len().cmp(&a.movies.len()));

    // Sort by overall metascore
    result.sort_by(|a, b| b.metascore.partial_cmp(&a.metascore).unwrap_or(Equal));

    Ok(result)
}

#[cfg(feature = "parallel")]
pub fn parallel_search_movies_by_name(
    pool: &DbPool,
    p_name: &str,
) -> Result<Vec<EnrichedImdbName>> {
    let conn = pool.get().context(GetConnection)?;
    let arc_pool = Arc::new(Mutex::new(pool.clone()));

    let names: Vec<ImdbName> = {
        use crate::schema::imdb_names::dsl::*;
        let needle = format!("%{}%", p_name);

        imdb_names
            .filter(name.like(&needle))
            .or_filter(birth_name.like(&needle))
            .load(&conn)
            .context(Query)?
    };

    let mut result: Vec<EnrichedImdbName> = names
        .into_par_iter()
        .map(move |name| {
            let pool = Arc::clone(&arc_pool);
            let conn = pool.lock().unwrap().get().unwrap();
            let principals: Vec<ImdbTitlePrincipal> = {
                use crate::schema::imdb_title_principals::dsl::*;

                imdb_title_principals
                    .filter(imdb_name_id.eq(&name.imdb_name_id))
                    .load::<ImdbTitlePrincipal>(&conn)
                    .unwrap()
            };

            let movie_ids: Vec<String> = principals
                .par_iter()
                .map(|p| p.imdb_title_id.clone())
                .collect();

            let mut movies: Vec<ImdbMovie> = {
                use crate::schema::imdb_movies::dsl::*;

                let mut query = imdb_movies.into_boxed();
                for id in movie_ids {
                    query = query.or_filter(imdb_title_id.eq(id));
                }

                query.get_results::<ImdbMovie>(&conn).unwrap()
            };

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
    #[cfg(feature = "parallel")]
    #[snafu(display("Could not get SQLite connection: {}", source))]
    GetConnection { source: diesel::r2d2::PoolError },

    #[snafu(display("Query Failed: {}", source))]
    Query { source: diesel::result::Error },
}
