use super::helpers::position::Position;
use super::helpers::role::Role;
use super::schema::{champs, matches, participants, stats, teambans, teamstats};
use chrono::naive::serde::ts_seconds;
use chrono::NaiveDateTime;

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[table_name = "champs"]
pub struct Champion {
  pub id: i32,
  pub name: String,
}

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[table_name = "matches"]
pub struct Match {
  pub id: i32,
  pub gameid: i32,
  pub platformid: String,
  pub queueid: i32,
  pub seasonid: i32,
  pub duration: i32,
  #[serde(with = "ts_seconds")]
  pub creation: NaiveDateTime,
  pub version: String,
}

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[table_name = "participants"]
pub struct Participant {
  pub id: i32,
  pub matchid: i32,
  pub player: i32,
  pub championid: i32,
  pub ss1: i32,
  pub ss2: i32,
  pub role: Role,
  pub position: Position,
}

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[table_name = "stats"]
#[primary_key(participantid)]
pub struct Stats {
  pub participantid: i32,
  pub win: bool,
  pub item1: i32,
  pub item2: i32,
  pub item3: i32,
  pub item4: i32,
  pub item5: i32,
  pub item6: i32,
  pub trinket: i32,
  pub kills: i32,
  pub deaths: i32,
  pub assists: i32,
  pub largestkillingspree: i32,
  pub largestmultilill: i32,
  pub killingsprees: i32,
  pub longesttimespentliving: i32,
  pub doublekills: i32,
  pub triplekills: i32,
  pub quadrakills: i32,
  pub pentakills: i32,
  pub legendarykills: i32,
  pub totdmgdealt: i32,
  pub magicdmgdealt: i32,
  pub physicaldmgdealt: i32,
  pub truedmgdealt: i32,
  pub largestcrit: i32,
  pub totdmgtochamp: i32,
  pub magicdmgtochamp: i32,
  pub physdmgtochamp: i32,
  pub truedmgtochamp: i32,
  pub totheal: i32,
  pub totunitshealed: i32,
  pub dmgselfmit: i32,
  pub dmgtoobj: i32,
  pub dmgtoturrets: i32,
  pub visionscore: i32,
  pub timecc: i32,
  pub totdmgtaken: i32,
  pub magicdmgtaken: i32,
  pub physdmgtaken: i32,
  pub truedmgtaken: i32,
  pub goldearned: i32,
  pub goldspent: i32,
  pub turretkills: i32,
  pub inhibkills: i32,
  pub totminionskilled: i32,
  pub neutralminionskilled: i32,
  pub ownjunglekills: i32,
  pub enemyjunglekills: i32,
  pub totcctimedealt: i32,
  pub champlvl: i32,
  pub pinksbought: i32,
  pub wardsbought: i32,
  pub wardsplaced: i32,
  pub wardskilled: i32,
  pub firstblood: bool,
}

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[table_name = "teambans"]
pub struct TeamBan {
  pub id: i32,
  pub matchid: i32,
  pub teamid: i32,
  pub championid: i32,
  pub banturn: i32,
}

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[table_name = "teamstats"]
pub struct TeamStats {
  pub id: i32,
  pub matchid: i32,
  pub teamid: i32,
  pub firstblood: bool,
  pub firsttower: bool,
  pub firstinhib: bool,
  pub firstbaron: bool,
  pub firstdragon: bool,
  pub firstharry: i32,
  pub towerkills: i32,
  pub inhibkills: i32,
  pub baronkills: i32,
  pub dragonkills: i32,
  pub harrykills: i32,
}
