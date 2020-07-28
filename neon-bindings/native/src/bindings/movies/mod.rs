use crate::{config::Config, helpers::Pagination};
use neon::prelude::*;
use neon_serde::from_value;

mod tasks;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct GetMoviesArgs {
    page: i64,
    page_size: Option<i64>,
    bollywood: Option<bool>,
}

pub fn get_movies(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let arg: Handle<JsValue> = cx.argument(0)?;
    let config_arg: Handle<JsValue> = cx.argument(1)?;
    let cb = cx.argument::<JsFunction>(2).expect("Callback is missing");

    let result = cx.undefined();
    let args: GetMoviesArgs = from_value(&mut cx, arg)?;
    let config: Config = from_value(&mut cx, config_arg)?;

    let pag = Pagination::from_js(args.page, args.page_size);
    let bollywood = match args.bollywood {
        Some(b) => b,
        None => false,
    };

    let task = tasks::GetMoviesTask {
        offset: pag.offset,
        limit: pag.limit,
        bollywood: bollywood,
        db_path: config.db_path,
    };
    task.schedule(cb);

    Ok(result)
}
