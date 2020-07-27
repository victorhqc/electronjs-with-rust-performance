#!/bin/sh

rm -rf imdb.db

MOVIES="$PWD/data/imdb_movies.csv"
NAMES="$PWD/data/imdb_names.csv"
RATINGS="$PWD/data/imdb_ratings.csv"
TITLE_PRINCIPALS="$PWD/data/imdb_title_principals.csv"


echo "Migrating data"
diesel migration run

echo "Importing movies..."
sqlite3 imdb.db -cmd ".mode csv" ".import $MOVIES imdb_movies"

echo "Importing names..."
sqlite3 imdb.db -cmd ".mode csv" ".import $NAMES imdb_names"

echo "Importing ratings..."
sqlite3 imdb.db -cmd ".mode csv" ".import $RATINGS imdb_ratings"

echo "Importing team stats..."
sqlite3 imdb.db -cmd ".mode csv" ".import $TITLE_PRINCIPALS imdb_title_principals"

echo "Done!"
