import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ImdbMovie } from './ImdbMovie';

@Entity({ name: 'imdb_ratings' })
export class ImdbRatings {
  @PrimaryColumn()
  imdb_rating_id: number;

  @Column()
  imdb_title_id: string;

  @Column('float')
  weighted_average_vote: number;

  @Column()
  total_votes: number;

  @Column('float')
  mean_vote: number;

  @Column('float')
  median_vote: number;

  @Column()
  votes_10: number;

  @Column()
  votes_9: number;

  @Column()
  votes_8: number;

  @Column()
  votes_7: number;

  @Column()
  votes_6: number;

  @Column()
  votes_5: number;

  @Column()
  votes_4: number;

  @Column()
  votes_3: number;

  @Column()
  votes_2: number;

  @Column()
  votes_1: number;

  @Column('float')
  allgenders_0age_avg_vote: number;

  @Column()
  allgenders_0age_votes: number;

  @Column('float')
  allgenders_18age_avg_vote: number;

  @Column()
  allgenders_18age_votes: number;

  @Column('float')
  allgenders_30age_avg_vote: number;

  @Column()
  allgenders_30age_votes: number;

  @Column('float')
  allgenders_45age_avg_vote: number;

  @Column()
  allgenders_45age_votes: number;

  @Column('float')
  males_allages_avg_vote: number;

  @Column()
  males_allages_votes: number;

  @Column('float')
  males_0age_avg_vote: number;

  @Column()
  males_0age_votes: number;

  @Column('float')
  males_18age_avg_vote: number;

  @Column()
  males_18age_votes: number;

  @Column('float')
  males_30age_avg_vote: number;

  @Column()
  males_30age_votes: number;

  @Column('float')
  males_45age_avg_vote: number;

  @Column()
  males_45age_votes: number;

  @Column('float')
  females_allages_avg_vote: number;

  @Column()
  females_allages_votes: number;

  @Column('float')
  females_0age_avg_vote: number;

  @Column()
  females_0age_votes: number;

  @Column('float')
  females_18age_avg_vote: number;

  @Column()
  females_18age_votes: number;

  @Column('float')
  females_30age_avg_vote: number;

  @Column()
  females_30age_votes: number;

  @Column('float')
  females_45age_avg_vote: number;

  @Column()
  females_45age_votes: number;

  @Column('float')
  top1000_voters_rating: number;

  @Column()
  top1000_voters_votes: number;

  @Column('float')
  us_voters_rating: number;

  @Column()
  us_voters_votes: number;

  @Column('float')
  non_us_voters_rating: number;

  @Column()
  non_us_voters_votes: number;
}
