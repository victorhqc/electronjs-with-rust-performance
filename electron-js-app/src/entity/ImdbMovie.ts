import { Entity, Column, PrimaryColumn } from 'typeorm';

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
}
