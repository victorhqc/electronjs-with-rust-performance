import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export class ImdbTitlePrincipal extends Model {
  readonly imdb_title_principal_id: number;
  readonly imdb_title_id: string;
  readonly ordering: number;
  readonly imdb_name_id: string;
  readonly category: string;
  readonly job: string | null;
  readonly characters: string | null;
}

ImdbTitlePrincipal.init(
  {
    imdb_title_principal_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    imdb_title_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    ordering: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    imdb_name_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    job: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    characters: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'imdb_title_principals',
    timestamps: false,
  },
);
