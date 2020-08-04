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
