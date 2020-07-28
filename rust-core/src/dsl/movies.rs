use crate::schema::imdb_movies;

pub type Columns = (
  String,
  String,
  String,
  i32,
  String,
  String,
  i32,
  String,
  String,
  String,
  String,
  String,
  String,
  String,
  f32,
  i32,
  String,
  i32,
  i32,
  i32,
  i32,
  i32,
);

pub type AllColumns = (
  imdb_movies::imdb_title_id,
  imdb_movies::title,
  imdb_movies::original_title,
  imdb_movies::year,
  imdb_movies::date_published,
  imdb_movies::genre,
  imdb_movies::duration,
  imdb_movies::country,
  imdb_movies::language,
  imdb_movies::director,
  imdb_movies::writer,
  imdb_movies::production_company,
  imdb_movies::actors,
  imdb_movies::description,
  imdb_movies::avg_vote,
  imdb_movies::votes,
  imdb_movies::budget,
  imdb_movies::usa_gross_income,
  imdb_movies::worlwide_gross_income,
  imdb_movies::metascore,
  imdb_movies::reviews_from_users,
  imdb_movies::reviews_from_critics,
);

pub const ALL_COLUMNS: AllColumns = (
  imdb_movies::imdb_title_id,
  imdb_movies::title,
  imdb_movies::original_title,
  imdb_movies::year,
  imdb_movies::date_published,
  imdb_movies::genre,
  imdb_movies::duration,
  imdb_movies::country,
  imdb_movies::language,
  imdb_movies::director,
  imdb_movies::writer,
  imdb_movies::production_company,
  imdb_movies::actors,
  imdb_movies::description,
  imdb_movies::avg_vote,
  imdb_movies::votes,
  imdb_movies::budget,
  imdb_movies::usa_gross_income,
  imdb_movies::worlwide_gross_income,
  imdb_movies::metascore,
  imdb_movies::reviews_from_users,
  imdb_movies::reviews_from_critics,
);
