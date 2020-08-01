import 'reflect-metadata';
import { createConnection } from 'typeorm';
import path from 'path';
import { app } from 'electron';
import { isProduction } from '../utils/env';
import { ImdbMovie } from '../entity/ImdbMovie';
import { ImdbName } from '../entity/ImdbName';
import { ImdbRatings } from '../entity/ImdbRatings';
import { ImdbTitlePrincipal } from '../entity/ImdbTitlePrincipal';

export function init() {
  return createConnection({
    type: 'sqlite',
    database: isProduction() ? path.join(app.getPath('userData'), 'imdb.db') : './imdb.db',
    synchronize: false,
    logging: false,
    entities: [ImdbMovie, ImdbName, ImdbRatings, ImdbTitlePrincipal],
  });
}
