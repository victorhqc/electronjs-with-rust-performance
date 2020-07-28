mod bindings;
mod config;
mod helpers;

#[macro_use]
extern crate serde_derive;

use neon::prelude::*;

register_module!(mut cx, {
    cx.export_function("getMovies", bindings::movies::get_movies)?;

    Ok(())
});
