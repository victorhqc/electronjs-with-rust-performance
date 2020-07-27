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
pub enum Role {
  Duo,
  None,
  Solo,
  DuoCarry,
  DuoSupport,
}

impl ToSql<Text, Sqlite> for Role {
  fn to_sql<W: Write>(&self, out: &mut serialize::Output<W, Sqlite>) -> serialize::Result {
    match self {
      Role::Duo => ToSql::<VarChar, Sqlite>::to_sql("DUO", out),
      Role::None => ToSql::<VarChar, Sqlite>::to_sql("NONE", out),
      Role::Solo => ToSql::<VarChar, Sqlite>::to_sql("SOLO", out),
      Role::DuoCarry => ToSql::<VarChar, Sqlite>::to_sql("DUO_CARRY", out),
      Role::DuoSupport => ToSql::<VarChar, Sqlite>::to_sql("DUO_SUPPORT", out),
    }
  }
}

impl FromSql<VarChar, Sqlite> for Role {
  fn from_sql(value: Option<&<Sqlite as Backend>::RawValue>) -> deserialize::Result<Self> {
    let text: String = FromSql::<Text, Sqlite>::from_sql(value)?;

    match &text[..] {
      "DUO" => Ok(Role::Duo),
      "NONE" => Ok(Role::None),
      "SOLO" => Ok(Role::Solo),
      "DUO_CARRY" => Ok(Role::DuoCarry),
      "DUO_SUPPORT" => Ok(Role::DuoSupport),
      _ => unreachable!(),
    }
  }
}
