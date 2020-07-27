use diesel::backend::Backend;
use diesel::deserialize;
use diesel::serialize;
use diesel::sql_types::{Text, VarChar};
use diesel::sqlite::Sqlite;
use diesel::types::{FromSql, ToSql};
use std::io::Write;

#[derive(
  Debug, EnumString, Eq, PartialEq, Serialize, Deserialize, Clone, Copy, AsExpression, FromSqlRow,
)]
#[sql_type = "Text"]
pub enum Position {
  Bot,
  Jungle,
  Mid,
  Top,
}

impl ToSql<Text, Sqlite> for Position {
  fn to_sql<W: Write>(&self, out: &mut serialize::Output<W, Sqlite>) -> serialize::Result {
    match self {
      Position::Bot => ToSql::<VarChar, Sqlite>::to_sql("BOT", out),
      Position::Jungle => ToSql::<VarChar, Sqlite>::to_sql("JUNGLE", out),
      Position::Mid => ToSql::<VarChar, Sqlite>::to_sql("MID", out),
      Position::Top => ToSql::<VarChar, Sqlite>::to_sql("TOP", out),
    }
  }
}

impl FromSql<VarChar, Sqlite> for Position {
  fn from_sql(value: Option<&<Sqlite as Backend>::RawValue>) -> deserialize::Result<Self> {
    let text: String = FromSql::<Text, Sqlite>::from_sql(value)?;

    match &text[..] {
      "BOT" => Ok(Position::Bot),
      "JUNGLE" => Ok(Position::Jungle),
      "MID" => Ok(Position::Mid),
      "TOP" => Ok(Position::Top),
      _ => unreachable!(),
    }
  }
}
