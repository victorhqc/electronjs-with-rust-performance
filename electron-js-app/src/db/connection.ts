import { Sequelize } from 'sequelize';

const config = require('../../config.json');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.DATABASE_PATH,
  logging: false,
});

export default sequelize;
