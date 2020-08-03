@echo off
setlocal
  SET DATABASE_URL=.\imdb.db
  SET movies=%~dp0\\..\\..\\rust-core\\data\\imdb_movies.csv
  SET names=%~dp0\\..\\..\\rust-core\\data\\imdb_names.csv
  SET ratings=%~dp0\\..\\..\\rust-core\\data\\imdb_ratings.csv
  SET titleprincipals=%~dp0\\..\\..\\rust-core\\data\\imdb_title_principals.csv

  del .\imdb.db

  echo Migrating data...
  call npm run typeorm migration:run

  echo Importing movies...
  sqlite3 imdb.db ".mode csv" ".import %movies% imdb_movies"

  echo Importing names...
  sqlite3 imdb.db ".mode csv" ".import %names% imdb_names"

  echo Importing ratings...
  sqlite3 imdb.db ".mode csv" ".import %ratings% imdb_ratings"

  echo Importing title principals...
  sqlite3 imdb.db ".mode csv" ".import %titleprincipals% imdb_title_principals"

echo Done!

endlocal
