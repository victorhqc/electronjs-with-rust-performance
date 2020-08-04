mod bindings;
mod config;

#[macro_use]
extern crate serde_derive;

use neon::prelude::*;

register_module!(mut cx, {
    cx.export_function(
        "searchMoviesByName",
        bindings::movies::search_movies_by_name,
    )?;

    Ok(())
});
