use crate::config::Config;
use neon::prelude::*;
use neon_serde::from_value;

mod tasks;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SearchMoviesArgs {
    needle: String,
}

pub fn search_movies_by_name(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let arg: Handle<JsValue> = cx.argument(0)?;
    let config_arg: Handle<JsValue> = cx.argument(1)?;
    let cb = cx.argument::<JsFunction>(2).expect("Callback is missing");

    let result = cx.undefined();
    let args: SearchMoviesArgs = from_value(&mut cx, arg)?;
    let config: Config = from_value(&mut cx, config_arg)?;

    let task = tasks::SearchMoviesByNameTask {
        needle: args.needle,
        db_path: config.db_path,
    };
    task.schedule(cb);

    Ok(result)
}
