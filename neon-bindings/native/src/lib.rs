mod bindings;
mod config;
mod helpers;

#[macro_use]
extern crate serde_derive;

use neon::prelude::*;

register_module!(mut cx, {
    cx.export_function("getMovies", bindings::movies::get_movies)?;
    cx.export_function("getTotalMovies", bindings::movies::get_total_movies)?;
    cx.export_function(
        "getRatedMoviesByYear",
        bindings::movies::get_rated_movies_by_year,
    )?;

    cx.export_function(
        "getRatedMoviesByGenderInYear",
        bindings::movies::get_rated_movies_by_gender_in_year,
    )?;

    Ok(())
});
