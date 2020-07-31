import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ImdbRatings } from './ImdbRatings';
import { ImdbTitlePrincipal } from './ImdbTitlePrincipal';

@Entity({ name: 'imdb_movies' })
export class ImdbMovie {
  @PrimaryColumn()
  imdb_title_id: string;

  @Column()
  title: string;

  @Column()
  original_title: string;

  @Column()
  year: number;

  @Column()
  date_published: string;

  @Column()
  genre: string;

  @Column()
  duration: number;

  @Column()
  country: string;

  @Column()
  language: string;

  @Column()
  director: string;

  @Column()
  writer: string;

  @Column()
  production_company: string;

  @Column()
  actors: string;

  @Column()
  description: string;

  @Column('double')
  avg_vote: number;

  @Column()
  votes: number;

  @Column()
  budget: string;

  @Column()
  usa_gross_income: number;

  @Column()
  worlwide_gross_income: number;

  @Column()
  metascore: number;

  @Column()
  reviews_from_users: number;

  @Column()
  reviews_from_critics: number;

  @OneToMany((type) => ImdbRatings, (rating) => rating.imdb_title_id)
  ratings: ImdbRatings[];

  @OneToMany((type) => ImdbTitlePrincipal, (principal) => principal.imdb_title_id)
  principals: ImdbTitlePrincipal[];
}
