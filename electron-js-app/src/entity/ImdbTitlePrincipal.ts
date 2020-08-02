import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ImdbMovie } from './ImdbMovie';

@Entity({ name: 'imdb_title_principals' })
export class ImdbTitlePrincipal {
  @PrimaryColumn()
  imdb_title_principal_id: number;

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
