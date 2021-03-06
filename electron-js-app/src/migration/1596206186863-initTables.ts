// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class initTables1596206186863 implements MigrationInterface {
//   name = 'initTables1596206186863';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`CREATE TABLE imdb_movies (
//           imdb_title_id TEXT PRIMARY KEY NOT NULL,
//           title TEXT NOT NULL,
//           original_title TEXT NOT NULL,
//           year INTEGER NOT NULL,
//           date_published TEXT NOT NULL,
//           genre TEXT NOT NULL,
//           duration INTEGER NOT NULL,
//           country TEXT NOT NULL,
//           language TEXT NOT NULL DEFAULT 'unknown',
//           director TEXT NOT NULL,
//           writer TEXT NOT NULL,
//           production_company TEXT NOT NULL,
//           actors TEXT NOT NULL,
//           description TEXT NOT NULL,
//           avg_vote REAL NOT NULL,
//           votes INTEGER NOT NULL,
//           budget TEXT NOT NULL DEFAULT 'unknown',
//           usa_gross_income INTEGER NOT NULL DEFAULT 0,
//           worlwide_gross_income INTEGER NOT NULL DEFAULT 0,
//           metascore INTEGER NOT NULL DEFAULT 0,
//           reviews_from_users INTEGER NOT NULL DEFAULT 0,
//           reviews_from_critics INTEGER NOT NULL DEFAULT 0
//         )`);

//     await queryRunner.query(`CREATE TABLE imdb_names (
//           imdb_name_id TEXT PRIMARY KEY NOT NULL,
//           name TEXT NOT NULL,
//           birth_name TEXT NOT NULL,
//           height INTEGER NOT NULL DEFAULT 0,
//           bio TEXT,
//           birth_details TEXT,
//           birth_year INTEGER NOT NULL DEFAULT 0,
//           date_of_birth TEXT,
//           place_of_birth TEXT,
//           death_details TEXT,
//           death_year INTEGER,
//           date_of_death TEXT,
//           place_of_death TEXT,
//           reason_of_death TEXT,
//           spouses INTEGER NOT NULL DEFAULT 0,
//           divorces INTEGER NOT NULL DEFAULT 0,
//           spouses_with_children INTEGER NOT NULL DEFAULT 0,
//           children INTEGER NOT NULL DEFAULT 0,
//           primary_profession TEXT NOT NULL,
//           known_for_titles TEXT NOT NULL
//         )`);

//     await queryRunner.query(`CREATE TABLE imdb_ratings (
//           imdb_rating_id INTEGER PRIMARY KEY NOT NULL,
//           imdb_title_id TEXT NOT NULL,
//           weighted_average_vote REAL NOT NULL DEFAULT 0,
//           total_votes INTEGER NOT NULL DEFAULT 0,
//           mean_vote REAL NOT NULL DEFAULT 0,
//           median_vote REAL NOT NULL DEFAULT 0,
//           votes_10 INTEGER NOT NULL DEFAULT 0,
//           votes_9 INTEGER NOT NULL DEFAULT 0,
//           votes_8 INTEGER NOT NULL DEFAULT 0,
//           votes_7 INTEGER NOT NULL DEFAULT 0,
//           votes_6 INTEGER NOT NULL DEFAULT 0,
//           votes_5 INTEGER NOT NULL DEFAULT 0,
//           votes_4 INTEGER NOT NULL DEFAULT 0,
//           votes_3 INTEGER NOT NULL DEFAULT 0,
//           votes_2 INTEGER NOT NULL DEFAULT 0,
//           votes_1 INTEGER NOT NULL DEFAULT 0,
//           allgenders_0age_avg_vote REAL NOT NULL DEFAULT 0,
//           allgenders_0age_votes INTEGER NOT NULL DEFAULT 0,
//           allgenders_18age_avg_vote REAL NOT NULL DEFAULT 0,
//           allgenders_18age_votes INTEGER NOT NULL DEFAULT 0,
//           allgenders_30age_avg_vote REAL NOT NULL DEFAULT 0,
//           allgenders_30age_votes INTEGER NOT NULL DEFAULT 0,
//           allgenders_45age_avg_vote REAL NOT NULL DEFAULT 0,
//           allgenders_45age_votes INTEGER NOT NULL DEFAULT 0,
//           males_allages_avg_vote REAL NOT NULL DEFAULT 0,
//           males_allages_votes INTEGER NOT NULL DEFAULT 0,
//           males_0age_avg_vote REAL NOT NULL DEFAULT 0,
//           males_0age_votes INTEGER NOT NULL DEFAULT 0,
//           males_18age_avg_vote REAL NOT NULL DEFAULT 0,
//           males_18age_votes INTEGER NOT NULL DEFAULT 0,
//           males_30age_avg_vote REAL NOT NULL DEFAULT 0,
//           males_30age_votes INTEGER NOT NULL DEFAULT 0,
//           males_45age_avg_vote REAL NOT NULL DEFAULT 0,
//           males_45age_votes INTEGER NOT NULL DEFAULT 0,
//           females_allages_avg_vote REAL NOT NULL DEFAULT 0,
//           females_allages_votes INTEGER NOT NULL DEFAULT 0,
//           females_0age_avg_vote REAL NOT NULL DEFAULT 0,
//           females_0age_votes INTEGER NOT NULL DEFAULT 0,
//           females_18age_avg_vote REAL NOT NULL DEFAULT 0,
//           females_18age_votes INTEGER NOT NULL DEFAULT 0,
//           females_30age_avg_vote REAL NOT NULL DEFAULT 0,
//           females_30age_votes INTEGER NOT NULL DEFAULT 0,
//           females_45age_avg_vote REAL NOT NULL DEFAULT 0,
//           females_45age_votes INTEGER NOT NULL DEFAULT 0,
//           top1000_voters_rating REAL NOT NULL DEFAULT 0,
//           top1000_voters_votes INTEGER NOT NULL DEFAULT 0,
//           us_voters_rating REAL NOT NULL DEFAULT 0,
//           us_voters_votes INTEGER NOT NULL DEFAULT 0,
//           non_us_voters_rating REAL NOT NULL DEFAULT 0,
//           non_us_voters_votes INTEGER NOT NULL DEFAULT 0,
//           FOREIGN KEY (imdb_title_id)
//             REFERENCES imdb_movies (imdb_title_id)
//         )`);

//     await queryRunner.query(`CREATE TABLE imdb_title_principals (
//           imdb_title_principal_id INTEGER PRIMARY KEY NOT NULL,
//           imdb_title_id TEXT NOT NULL,
//           ordering INTEGER NOT NULL,
//           imdb_name_id TEXT KEY NOT NULL,
//           category TEXT NOT NULL,
//           job TEXT,
//           characters TEXT,
//           FOREIGN KEY (imdb_title_id)
//             REFERENCES imdb_movies (imdb_title_id),
//           FOREIGN KEY (imdb_name_id)
//             REFERENCES imdb_names (imdb_name_id)
//         )`);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`DROP TABLE IF EXISTS imdb_title_principals`);
//     await queryRunner.query(`DROP TABLE IF EXISTS imdb_ratings`);
//     await queryRunner.query(`DROP TABLE IF EXISTS imdb_names`);
//     await queryRunner.query(`DROP TABLE IF EXISTS imdb_movies`);
//   }
// }
