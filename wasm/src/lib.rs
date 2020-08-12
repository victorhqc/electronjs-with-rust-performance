mod utils;

#[macro_use]
extern crate serde_derive;

use rust_core::connect;
use rust_core::models::EnrichedImdbName;
use rust_core::movies::{search_movies_by_name, search_movies_where_actress_is_taller_than_star};
use tokio::task;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub async fn search_by_name_wrapper(args: SearchMoviesArgs) -> JsValue {
    let res: Vec<EnrichedImdbName> = task::spawn_blocking(move || {
        let conn = connect(args.db_path).unwrap();

        let res = search_movies_by_name(&conn, &args.needle).unwrap();

        res
    })
    .await
    .unwrap();

    JsValue::from_serde(&res).unwrap()
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SearchMoviesArgs {
    needle: String,
    db_path: Option<String>,
}
