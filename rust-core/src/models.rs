use crate::dsl::{movies::Columns as MovieColumns, ratings::Columns as RatingColumns};
use crate::schema::{imdb_movies, imdb_names, imdb_ratings, imdb_title_principals};

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
#[table_name = "imdb_movies"]
#[primary_key(imdb_title_id)]
pub struct ImdbMovie {
    pub imdb_title_id: String,
    pub title: String,
    pub original_title: String,
    pub year: i32,
    pub date_published: String,
    pub genre: String,
    pub duration: i32,
    pub country: String,
    pub language: String,
    pub director: String,
    pub writer: String,
    pub production_company: String,
    pub actors: String,
    pub description: String,
    pub avg_vote: f32,
    pub votes: i32,
    pub budget: String,
    pub usa_gross_income: i32,
    pub worlwide_gross_income: i32,
    pub metascore: i32,
    pub reviews_from_users: i32,
    pub reviews_from_critics: i32,
}

impl ImdbMovie {
    pub fn from_tuple(data: MovieColumns) -> Self {
        Self {
            imdb_title_id: data.0,
            title: data.1,
            original_title: data.2,
            year: data.3,
            date_published: data.4,
            genre: data.5,
            duration: data.6,
            country: data.7,
            language: data.8,
            director: data.9,
            writer: data.10,
            production_company: data.11,
            actors: data.12,
            description: data.13,
            avg_vote: data.14,
            votes: data.15,
            budget: data.16,
            usa_gross_income: data.17,
            worlwide_gross_income: data.18,
            metascore: data.19,
            reviews_from_users: data.20,
            reviews_from_critics: data.21,
        }
    }
}

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
#[table_name = "imdb_names"]
#[primary_key(imdb_name_id)]
pub struct ImdbName {
    pub imdb_name_id: String,
    pub name: String,
    pub birth_name: String,
    pub height: i32,
    pub bio: Option<String>,
    pub birth_details: Option<String>,
    pub birth_year: i32,
    pub date_of_birth: Option<String>,
    pub place_of_birth: Option<String>,
    pub death_details: Option<String>,
    pub death_year: Option<i32>,
    pub date_of_death: Option<String>,
    pub place_of_death: Option<String>,
    pub reason_of_death: Option<String>,
    pub spouses: i32,
    pub divorces: i32,
    pub spouses_with_children: i32,
    pub children: i32,
    pub primary_profession: String,
    pub known_for_titles: String,
}

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
#[table_name = "imdb_ratings"]
#[primary_key(imdb_rating_id)]
pub struct ImdbRatings {
    pub imdb_rating_id: i32,
    pub imdb_title_id: String,
    pub weighted_average_vote: f32,
    pub total_votes: i32,
    pub mean_vote: f32,
    pub median_vote: f32,
    pub votes_10: i32,
    pub votes_9: i32,
    pub votes_8: i32,
    pub votes_7: i32,
    pub votes_6: i32,
    pub votes_5: i32,
    pub votes_4: i32,
    pub votes_3: i32,
    pub votes_2: i32,
    pub votes_1: i32,
    pub allgenders_0age_avg_vote: f32,
    pub allgenders_0age_votes: i32,
    pub allgenders_18age_avg_vote: f32,
    pub allgenders_18age_votes: i32,
    pub allgenders_30age_avg_vote: f32,
    pub allgenders_30age_votes: i32,
    pub allgenders_45age_avg_vote: f32,
    pub allgenders_45age_votes: i32,
    pub males_allages_avg_vote: f32,
    pub males_allages_votes: i32,
    pub males_0age_avg_vote: f32,
    pub males_0age_votes: i32,
    pub males_18age_avg_vote: f32,
    pub males_18age_votes: i32,
    pub males_30age_avg_vote: f32,
    pub males_30age_votes: i32,
    pub males_45age_avg_vote: f32,
    pub males_45age_votes: i32,
    pub females_allages_avg_vote: f32,
    pub females_allages_votes: i32,
    pub females_0age_avg_vote: f32,
    pub females_0age_votes: i32,
    pub females_18age_avg_vote: f32,
    pub females_18age_votes: i32,
    pub females_30age_avg_vote: f32,
    pub females_30age_votes: i32,
    pub females_45age_avg_vote: f32,
    pub females_45age_votes: i32,
    pub top1000_voters_rating: f32,
    pub top1000_voters_votes: i32,
    pub us_voters_rating: f32,
    pub us_voters_votes: i32,
    pub non_us_voters_rating: f32,
    pub non_us_voters_votes: i32,
}

impl ImdbRatings {
    pub fn from_tuple(data: RatingColumns) -> Self {
        Self {
            imdb_rating_id: data.0,
            imdb_title_id: data.1,
            weighted_average_vote: data.2,
            total_votes: data.3,
            mean_vote: data.4,
            median_vote: data.5,
            votes_10: data.6,
            votes_9: data.7,
            votes_8: data.8,
            votes_7: data.9,
            votes_6: data.10,
            votes_5: data.11,
            votes_4: data.12,
            votes_3: data.13,
            votes_2: data.14,
            votes_1: data.15,
            allgenders_0age_avg_vote: data.16,
            allgenders_0age_votes: data.17,
            allgenders_18age_avg_vote: data.18,
            allgenders_18age_votes: data.19,
            allgenders_30age_avg_vote: data.20,
            allgenders_30age_votes: data.21,
            allgenders_45age_avg_vote: data.22,
            allgenders_45age_votes: data.23,
            males_allages_avg_vote: data.24,
            males_allages_votes: data.25,
            males_0age_avg_vote: data.26,
            males_0age_votes: data.27,
            males_18age_avg_vote: data.28,
            males_18age_votes: data.29,
            males_30age_avg_vote: data.30,
            males_30age_votes: data.31,
            males_45age_avg_vote: data.32,
            males_45age_votes: data.33,
            females_allages_avg_vote: data.34,
            females_allages_votes: data.35,
            females_0age_avg_vote: data.36,
            females_0age_votes: data.37,
            females_18age_avg_vote: data.38,
            females_18age_votes: data.39,
            females_30age_avg_vote: data.40,
            females_30age_votes: data.41,
            females_45age_avg_vote: data.42,
            females_45age_votes: data.43,
            top1000_voters_rating: data.44,
            top1000_voters_votes: data.45,
            us_voters_rating: data.46,
            us_voters_votes: data.47,
            non_us_voters_rating: data.48,
            non_us_voters_votes: data.49,
        }
    }
}

#[derive(Debug, Clone, Identifiable, Associations, Serialize, Deserialize, Queryable)]
#[serde(rename_all = "camelCase")]
#[table_name = "imdb_title_principals"]
#[primary_key(imdb_title_principal_id)]
pub struct ImdbTitlePrincipal {
    pub imdb_title_principal_id: i32,
    pub imdb_title_id: String,
    pub ordering: i32,
    pub imdb_name_id: String,
    pub category: String,
    pub job: Option<String>,
    pub characters: Option<String>,
}
