#!/bin/sh

rm lol_matches.db

CHAMPS="$PWD/data/champs_no-header.csv"
MATCHES="$PWD/data/matches_no-header.csv"
PARTICIPANTS="$PWD/data/participants_no-header.csv"
TEAMSTATS="$PWD/data/teamstats_no-header.csv"
TEAMBANS="$PWD/data/teambans_no-header.csv"
STATS1="$PWD/data/stats1_no-header.csv"
STATS2="$PWD/data/stats2_no-header.csv"


echo "Migrating data"
diesel migration run

echo "Importing champions..."
sqlite3 lol_matches.db -cmd ".mode csv" ".import $CHAMPS champs"

echo "Importing matches..."
sqlite3 lol_matches.db -cmd ".mode csv" ".import $MATCHES matches"

echo "Importing participants..."
sqlite3 lol_matches.db -cmd ".mode csv" ".import $PARTICIPANTS participants"

echo "Importing team stats..."
sqlite3 lol_matches.db -cmd ".mode csv" ".import $TEAMSTATS teamstats"

echo "Importing team bans..."
sqlite3 lol_matches.db -cmd ".mode csv" ".import $TEAMBANS teambans"

echo "Importing stats..."
sqlite3 lol_matches.db -cmd ".mode csv" ".import $STATS1 stats"
echo "Importing stats (second part)..."
sqlite3 lol_matches.db -cmd ".mode csv" ".import $STATS2 stats"

echo "Done!"
