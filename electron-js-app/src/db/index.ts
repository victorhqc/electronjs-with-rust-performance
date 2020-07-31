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
  // .then(async (connection) => {
  //   console.log('Inserting a new user into the database...');
  //   const user = new User();
  //   user.firstName = 'Timber';
  //   user.lastName = 'Saw';
  //   user.age = 25;
  //   await connection.manager.save(user);
  //   console.log('Saved a new user with id: ' + user.id);

  //   console.log('Loading users from the database...');
  //   const users = await connection.manager.find(User);
  //   console.log('Loaded users: ', users);

  //   console.log('Here you can setup and run express/koa/any other framework.');
  // })
  // .catch((error) => console.log(error));
}
