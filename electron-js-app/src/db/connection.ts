import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config({});

console.log('DB: ', process.env.DATABASE_PATH);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH,
});

export default sequelize;
