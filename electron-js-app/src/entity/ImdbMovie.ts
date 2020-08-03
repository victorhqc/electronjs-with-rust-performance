import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export class ImdbMovie extends Model {
  readonly imdb_title_id: string;
  readonly title: string;
  readonly original_title: string;
  readonly year: number;
  readonly date_published: string;
  readonly genre: string;
  readonly duration: number;
  readonly country: string;
  readonly language: string;
  readonly director: string;
  readonly writer: string;
  readonly production_company: string;
  readonly actors: string;
  readonly description: string;
  readonly avg_vote: number;
  readonly votes: number;
  readonly budget: string;
  readonly usa_gross_income: number;
  readonly worlwide_gross_income: number;
  readonly metascore: number;
  readonly reviews_from_users: number;
  readonly reviews_from_critics: number;
}

ImdbMovie.init(
  {
    imdb_title_id: {
      primaryKey: true,
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    original_title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    year: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    date_published: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    duration: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    country: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    language: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    director: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    writer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    production_company: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    actors: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    budget: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    usa_gross_income: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    worlwide_gross_income: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    metascore: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    reviews_from_users: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    reviews_from_critics: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'imdb_movies',
    timestamps: false,
  },
);
