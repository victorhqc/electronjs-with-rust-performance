import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { ImdbMovie } from './ImdbMovie';

@Entity({ name: 'imdb_title_principals' })
export class ImdbTitlePrincipal {
  @PrimaryColumn()
  imdb_title_principal_id: number;

  @ManyToOne((type) => ImdbMovie, (movie) => movie.principals)
  @Column()
  imdb_title_id: string;

  @Column()
  ordering: number;

  @Column()
  imdb_name_id: string;

  @Column()
  category: string;

  @Column({ nullable: true, type: 'text' })
  job: string | null;

  @Column({ nullable: true, type: 'text' })
  characters: string | null;
}
