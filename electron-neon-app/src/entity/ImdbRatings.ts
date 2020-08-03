import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export class ImdbRatings extends Model {
  readonly imdb_rating_id: number;
  readonly imdb_title_id: string;
  readonly weighted_average_vote: number;
  readonly total_votes: number;
  readonly mean_vote: number;
  readonly median_vote: number;
  readonly votes_10: number;
  readonly votes_9: number;
  readonly votes_8: number;
  readonly votes_7: number;
  readonly votes_6: number;
  readonly votes_5: number;
  readonly votes_4: number;
  readonly votes_3: number;
  readonly votes_2: number;
  readonly votes_1: number;
  readonly allgenders_0age_avg_vote: number;
  readonly allgenders_0age_votes: number;
  readonly allgenders_18age_avg_vote: number;
  readonly allgenders_18age_votes: number;
  readonly allgenders_30age_avg_vote: number;
  readonly allgenders_30age_votes: number;
  readonly allgenders_45age_avg_vote: number;
  readonly allgenders_45age_votes: number;
  readonly males_allages_avg_vote: number;
  readonly males_allages_votes: number;
  readonly males_0age_avg_vote: number;
  readonly males_0age_votes: number;
  readonly males_18age_avg_vote: number;
  readonly males_18age_votes: number;
  readonly males_30age_avg_vote: number;
  readonly males_30age_votes: number;
  readonly males_45age_avg_vote: number;
  readonly males_45age_votes: number;
  readonly females_allages_avg_vote: number;
  readonly females_allages_votes: number;
  readonly females_0age_avg_vote: number;
  readonly females_0age_votes: number;
  readonly females_18age_avg_vote: number;
  readonly females_18age_votes: number;
  readonly females_30age_avg_vote: number;
  readonly females_30age_votes: number;
  readonly females_45age_avg_vote: number;
  readonly females_45age_votes: number;
  readonly top1000_voters_rating: number;
  readonly top1000_voters_votes: number;
  readonly us_voters_rating: number;
  readonly us_voters_votes: number;
  readonly non_us_voters_rating: number;
  readonly non_us_voters_votes: number;
}

ImdbRatings.init(
  {
    imdb_rating_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    imdb_title_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    weighted_average_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    total_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    mean_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    median_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    votes_10: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_9: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_8: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_7: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_6: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_5: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_4: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_3: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_2: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    votes_1: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    allgenders_0age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    allgenders_0age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    allgenders_18age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    allgenders_18age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    allgenders_30age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    allgenders_30age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    allgenders_45age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    allgenders_45age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    males_allages_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    males_allages_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    males_0age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    males_0age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    males_18age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    males_18age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    males_30age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    males_30age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    males_45age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    males_45age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    females_allages_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    females_allages_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    females_0age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    females_0age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    females_18age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    females_18age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    females_30age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    females_30age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    females_45age_avg_vote: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    females_45age_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    top1000_voters_rating: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    top1000_voters_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    us_voters_rating: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    us_voters_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    non_us_voters_rating: {
      type: DataTypes.REAL,
      allowNull: false,
    },

    non_us_voters_votes: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'imdb_ratings',
    timestamps: false,
  },
);
