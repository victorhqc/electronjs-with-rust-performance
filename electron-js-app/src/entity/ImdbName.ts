import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'imdb_names' })
export class ImdbName {
  @PrimaryColumn()
  imdb_name_id: string;

  @Column()
  name: string;

  @Column()
  birth_name: string;

  @Column()
  height: number;

  @Column({ nullable: true, type: 'text' })
  bio: string | null;

  @Column({ nullable: true, type: 'text' })
  birth_details: string | null;

  @Column()
  birth_year: number;

  @Column({ nullable: true, type: 'text' })
  date_of_birth: string | null;

  @Column({ nullable: true, type: 'text' })
  place_of_birth: string | null;

  @Column({ nullable: true, type: 'text' })
  death_details: string | null;

  @Column({ nullable: true, type: 'integer' })
  death_year: number | null;

  @Column({ nullable: true, type: 'text' })
  date_of_death: string | null;

  @Column({ nullable: true, type: 'text' })
  place_of_death: string | null;

  @Column({ nullable: true, type: 'text' })
  reason_of_death: string | null;

  @Column()
  spouses: number;

  @Column()
  divorces: number;

  @Column()
  spouses_with_children: number;

  @Column()
  children: number;

  @Column()
  primary_profession: string;

  @Column()
  known_for_titles: string;
}
