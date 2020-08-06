use crate::config::Config;
use neon::prelude::*;
use neon_serde::from_value;

mod tasks;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SearchMoviesArgs {
    needle: String,
    parallel: bool,
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
        parallel: args.parallel,
        db_path: config.db_path,
    };
    task.schedule(cb);

    Ok(result)
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SearchTallerArgs {
    needle: String,
    parallel: bool,
}

pub fn search_movies_where_actress_is_taller(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let arg: Handle<JsValue> = cx.argument(0)?;
    let config_arg: Handle<JsValue> = cx.argument(1)?;
    let cb = cx.argument::<JsFunction>(2).expect("Callback is missing");

    let result = cx.undefined();
    let args: SearchMoviesArgs = from_value(&mut cx, arg)?;
    let config: Config = from_value(&mut cx, config_arg)?;

    let task = tasks::SearchMoviesWhereTallerTask {
        needle: args.needle,
        parallel: args.parallel,
        db_path: config.db_path,
    };
    task.schedule(cb);

    Ok(result)
}
