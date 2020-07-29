#[derive(Serialize, Deserialize, Debug, Copy)]
#[serde(rename_all = "camelCase")]
pub struct Config {
    pub db_path: Option<String>,
}
