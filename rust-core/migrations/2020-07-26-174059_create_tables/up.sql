CREATE TABLE champs (
  name TEXT NOT NULL UNIQUE,
  id INTEGER PRIMARY KEY NOT NULL
);

CREATE TABLE matches (
  id INTEGER PRIMARY KEY NOT NULL,
  gameid INTEGER NOT NULL,
  platformid TEXT NOT NULL,
  queueid INTEGER NOT NULL,
  seasonid INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  creation INTEGER NOT NULL,
  version TEXT NOT NULL
);

CREATE TABLE participants (
  id INTEGER PRIMARY KEY NOT NULL,
  matchid INTEGER NOT NULL,
  player INTEGER NOT NULL,
  championid INTEGER NOT NULL,
  ss1 INTEGER NOT NULL,
  ss2 INTEGER NOT NULL,
  role TEXT NOT NULL,
  position TEXT NOT NULL,
  FOREIGN KEY (matchid)
    REFERENCES matches (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (championid)
    REFERENCES champs (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE teamstats (
  id INTEGER PRIMARY KEY NOT NULL,
  matchid INTEGER NOT NULL,
  teamid INTEGER NOT NULL,
  firstblood BOOLEAN NOT NULL,
  firsttower BOOLEAN NOT NULL,
  firstinhib BOOLEAN NOT NULL,
  firstbaron BOOLEAN NOT NULL,
  firstdragon BOOLEAN NOT NULL,
  firstharry INTEGER NOT NULL,
  towerkills INTEGER NOT NULL,
  inhibkills INTEGER NOT NULL,
  baronkills INTEGER NOT NULL,
  dragonkills INTEGER NOT NULL,
  harrykills INTEGER NOT NULL,
  FOREIGN KEY (matchid)
    REFERENCES matches (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE teambans (
  id INTEGER PRIMARY KEY NOT NULL,
  matchid INTEGER NOT NULL,
  teamid INTEGER NOT NULL,
  championid INTEGER NOT NULL,
  banturn INTEGER NOT NULL,
  FOREIGN KEY (matchid)
    REFERENCES matches (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (championid)
    REFERENCES champs (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE stats (
  participantid INTEGER PRIMARY KEY NOT NULL,
  win BOOLEAN NOT NULL,
  item1 INTEGER NOT NULL,
  item2 INTEGER NOT NULL,
  item3 INTEGER NOT NULL,
  item4 INTEGER NOT NULL,
  item5 INTEGER NOT NULL,
  item6 INTEGER NOT NULL,
  trinket INTEGER NOT NULL,
  kills INTEGER NOT NULL,
  deaths INTEGER NOT NULL,
  assists INTEGER NOT NULL,
  largestkillingspree INTEGER NOT NULL,
  largestmultilill INTEGER NOT NULL,
  killingsprees INTEGER NOT NULL,
  longesttimespentliving INTEGER NOT NULL,
  doublekills INTEGER NOT NULL,
  triplekills INTEGER NOT NULL,
  quadrakills INTEGER NOT NULL,
  pentakills INTEGER NOT NULL,
  legendarykills INTEGER NOT NULL,
  totdmgdealt INTEGER NOT NULL,
  magicdmgdealt INTEGER NOT NULL,
  physicaldmgdealt INTEGER NOT NULL,
  truedmgdealt INTEGER NOT NULL,
  largestcrit INTEGER NOT NULL,
  totdmgtochamp INTEGER NOT NULL,
  magicdmgtochamp INTEGER NOT NULL,
  physdmgtochamp INTEGER NOT NULL,
  truedmgtochamp INTEGER NOT NULL,
  totheal INTEGER NOT NULL,
  totunitshealed INTEGER NOT NULL,
  dmgselfmit INTEGER NOT NULL,
  dmgtoobj INTEGER NOT NULL,
  dmgtoturrets INTEGER NOT NULL,
  visionscore INTEGER NOT NULL,
  timecc INTEGER NOT NULL,
  totdmgtaken INTEGER NOT NULL,
  magicdmgtaken INTEGER NOT NULL,
  physdmgtaken INTEGER NOT NULL,
  truedmgtaken INTEGER NOT NULL,
  goldearned INTEGER NOT NULL,
  goldspent INTEGER NOT NULL,
  turretkills INTEGER NOT NULL,
  inhibkills INTEGER NOT NULL,
  totminionskilled INTEGER NOT NULL,
  neutralminionskilled INTEGER NOT NULL,
  ownjunglekills INTEGER NOT NULL,
  enemyjunglekills INTEGER NOT NULL,
  totcctimedealt INTEGER NOT NULL,
  champlvl INTEGER NOT NULL,
  pinksbought INTEGER NOT NULL,
  wardsbought INTEGER NOT NULL,
  wardsplaced INTEGER NOT NULL,
  wardskilled INTEGER NOT NULL,
  firstblood BOOLEAN NOT NULL,
  FOREIGN KEY (participantid)
    REFERENCES participants (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);