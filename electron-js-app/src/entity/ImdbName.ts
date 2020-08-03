import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export class ImdbName extends Model {
  readonly imdb_name_id: string;
  readonly name: string;
  readonly birth_name: string;
  readonly height: number;
  readonly bio: string | null;
  readonly birth_details: string | null;
  readonly birth_year: number;
  readonly date_of_birth: string | null;
  readonly place_of_birth: string | null;
  readonly death_details: string | null;
  readonly death_year: number | null;
  readonly date_of_death: string | null;
  readonly place_of_death: string | null;
  readonly reason_of_death: string | null;
  readonly spouses: number;
  readonly divorces: number;
  readonly spouses_with_children: number;
  readonly children: number;
  readonly primary_profession: string;
  readonly known_for_titles: string;
}

ImdbName.init(
  {
    imdb_name_id: {
      primaryKey: true,
      type: DataTypes.TEXT,
      allowNull: false,
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    birth_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    height: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    birth_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    birth_year: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    date_of_birth: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    place_of_birth: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    death_details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    death_year: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },

    date_of_death: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    place_of_death: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    reason_of_death: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    spouses: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    divorces: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    spouses_with_children: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    children: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    primary_profession: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    known_for_titles: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'imdb_names',
    timestamps: false,
  },
);
