@echo off
setlocal
  SET DATABASE_URL=.\lol_matches.db
  SET champs=%~dp0\..\\data\\champs_no-header.csv
  SET matches=%~dp0\..\\data\\matches_no-header.csv
  SET participants=%~dp0\..\\data\\participants_no-header.csv
  SET teamstats=%~dp0\..\\data\\teamstats_no-header.csv
  SET teambans=%~dp0\..\\data\\teambans_no-header.csv
  SET stats1=%~dp0\..\\data\\stats1_no-header.csv
  SET stats2=%~dp0\..\\data\\stats2_no-header.csv

  del .\lol_matches.db

  echo Migrating data
  diesel migration run

  echo Importing champions...
  sqlite3 lol_matches.db ".mode csv" ".import %champs% champs"

  echo Importing matches...
  sqlite3 lol_matches.db ".mode csv" ".import %matches% matches"

  echo Importing participants...
  sqlite3 lol_matches.db ".mode csv" ".import %participants% participants"

  echo Importing team stats...
  sqlite3 lol_matches.db ".mode csv" ".import %teamstats% teamstats"

  echo Importing team bans...
  sqlite3 lol_matches.db ".mode csv" ".import %teambans% teambans"

  echo Importing stats...
  sqlite3 lol_matches.db ".mode csv" ".import %stats1% stats"
  echo Importing stats (second part)...
  sqlite3 lol_matches.db ".mode csv" ".import %stats2% stats"

echo Done!

endlocal