import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ImdbMovie } from '../entity/ImdbMovie';
import { ImdbName } from '../entity/ImdbName';
import { ImdbRatings } from '../entity/ImdbRatings';
import { ImdbTitlePrincipal } from '../entity/ImdbTitlePrincipal';

export function init() {
  return createConnection({
    type: 'sqlite',
    database: process.env.DATABASE_PATH,
    synchronize: false,
    logging: false,
    entities: [ImdbMovie, ImdbName, ImdbRatings, ImdbTitlePrincipal],
  });
}
