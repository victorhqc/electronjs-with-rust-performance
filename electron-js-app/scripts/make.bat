@echo off
setlocal
  SET DATABASE_PATH=%~dp0..\\imdb.db
  echo %DATABASE_PATH%
  npm run make

endlocal
