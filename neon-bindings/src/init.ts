let db_path: null | string = null;

export function setDBPathIn(path: string) {
  db_path = path;
}

export function getDbPath() {
  return db_path;
}
