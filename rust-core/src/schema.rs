table! {
    imdb_movies (imdb_title_id) {
        imdb_title_id -> Text,
        title -> Text,
        original_title -> Text,
        year -> Integer,
        date_published -> Text,
        genre -> Text,
        duration -> Integer,
        country -> Text,
        language -> Text,
        director -> Text,
        writer -> Text,
        production_company -> Text,
        actors -> Text,
        description -> Text,
        avg_vote -> Float,
        votes -> Integer,
        budget -> Text,
        usa_gross_income -> Integer,
        worlwide_gross_income -> Integer,
        metascore -> Integer,
        reviews_from_users -> Integer,
        reviews_from_critics -> Integer,
    }
}

table! {
    imdb_names (imdb_name_id) {
        imdb_name_id -> Text,
        name -> Text,
        birth_name -> Text,
        height -> Integer,
        bio -> Nullable<Text>,
        birth_details -> Nullable<Text>,
        birth_year -> Integer,
        date_of_birth -> Nullable<Text>,
        place_of_birth -> Nullable<Text>,
        death_details -> Nullable<Text>,
        death_year -> Nullable<Integer>,
        date_of_death -> Nullable<Text>,
        place_of_death -> Nullable<Text>,
        reason_of_death -> Nullable<Text>,
        spouses -> Integer,
        divorces -> Integer,
        spouses_with_children -> Integer,
        children -> Integer,
        primary_profession -> Text,
        known_for_titles -> Text,
    }
}

table! {
    imdb_ratings (imdb_rating_id) {
        imdb_rating_id -> Integer,
        imdb_title_id -> Text,
        weighted_average_vote -> Float,
        total_votes -> Integer,
        mean_vote -> Float,
        median_vote -> Float,
        votes_10 -> Integer,
        votes_9 -> Integer,
        votes_8 -> Integer,
        votes_7 -> Integer,
        votes_6 -> Integer,
        votes_5 -> Integer,
        votes_4 -> Integer,
        votes_3 -> Integer,
        votes_2 -> Integer,
        votes_1 -> Integer,
        allgenders_0age_avg_vote -> Float,
        allgenders_0age_votes -> Integer,
        allgenders_18age_avg_vote -> Float,
        allgenders_18age_votes -> Integer,
        allgenders_30age_avg_vote -> Float,
        allgenders_30age_votes -> Integer,
        allgenders_45age_avg_vote -> Float,
        allgenders_45age_votes -> Integer,
        males_allages_avg_vote -> Float,
        males_allages_votes -> Integer,
        males_0age_avg_vote -> Float,
        males_0age_votes -> Integer,
        males_18age_avg_vote -> Float,
        males_18age_votes -> Integer,
        males_30age_avg_vote -> Float,
        males_30age_votes -> Integer,
        males_45age_avg_vote -> Float,
        males_45age_votes -> Integer,
        females_allages_avg_vote -> Float,
        females_allages_votes -> Integer,
        females_0age_avg_vote -> Float,
        females_0age_votes -> Integer,
        females_18age_avg_vote -> Float,
        females_18age_votes -> Integer,
        females_30age_avg_vote -> Float,
        females_30age_votes -> Integer,
        females_45age_avg_vote -> Float,
        females_45age_votes -> Integer,
        top1000_voters_rating -> Float,
        top1000_voters_votes -> Integer,
        us_voters_rating -> Float,
        us_voters_votes -> Integer,
        non_us_voters_rating -> Float,
        non_us_voters_votes -> Integer,
    }
}

table! {
    imdb_title_principals (imdb_title_principal_id) {
        imdb_title_principal_id -> Integer,
        imdb_title_id -> Text,
        ordering -> Integer,
        imdb_name_id -> Text,
        category -> Text,
        job -> Nullable<Text>,
        characters -> Nullable<Text>,
    }
}

joinable!(imdb_ratings -> imdb_movies (imdb_title_id));
joinable!(imdb_title_principals -> imdb_movies (imdb_title_id));
joinable!(imdb_title_principals -> imdb_names (imdb_name_id));

allow_tables_to_appear_in_same_query!(imdb_movies, imdb_names, imdb_ratings, imdb_title_principals,);
