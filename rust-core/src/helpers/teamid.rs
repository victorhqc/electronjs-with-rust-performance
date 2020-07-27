use diesel::backend::Backend;
use diesel::deserialize;
use diesel::serialize;
use diesel::sql_types::Integer;
use diesel::sqlite::Sqlite;
use diesel::types::{FromSql, ToSql};
use std::io::Write;

#[derive(
  Debug, EnumString, Eq, PartialEq, Serialize, Deserialize, Clone, Copy, AsExpression, FromSqlRow,
)]
#[sql_type = "Integer"]
pub enum Team {
  Blue,
  Red,
}

impl ToSql<Integer, Sqlite> for Team {
  fn to_sql<W: Write>(&self, out: &mut serialize::Output<W, Sqlite>) -> serialize::Result {
    match self {
      Team::Blue => ToSql::<Integer, Sqlite>::to_sql(&100, out),
      Team::Red => ToSql::<Integer, Sqlite>::to_sql(&200, out),
    }
  }
}

impl FromSql<Integer, Sqlite> for Team {
  fn from_sql(value: Option<&<Sqlite as Backend>::RawValue>) -> deserialize::Result<Self> {
    let text: i32 = FromSql::<Integer, Sqlite>::from_sql(value)?;

    match text {
      100 => Ok(Team::Blue),
      200 => Ok(Team::Red),
      _ => unreachable!(),
    }
  }
}
