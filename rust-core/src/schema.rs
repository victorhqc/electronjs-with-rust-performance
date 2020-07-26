table! {
    champs (id) {
        name -> Text,
        id -> Integer,
    }
}

table! {
    matches (id) {
        id -> Integer,
        gameid -> Integer,
        platformid -> Text,
        queueid -> Integer,
        seasonid -> Integer,
        duration -> Integer,
        creation -> Integer,
        version -> Text,
    }
}

table! {
    participants (id) {
        id -> Integer,
        matchid -> Integer,
        player -> Integer,
        championid -> Integer,
        ss1 -> Integer,
        ss2 -> Integer,
        role -> Text,
        position -> Text,
    }
}

table! {
    stats (participantid) {
        participantid -> Integer,
        win -> Bool,
        item1 -> Integer,
        item2 -> Integer,
        item3 -> Integer,
        item4 -> Integer,
        item5 -> Integer,
        item6 -> Integer,
        trinket -> Integer,
        kills -> Integer,
        deaths -> Integer,
        assists -> Integer,
        largestkillingspree -> Integer,
        largestmultilill -> Integer,
        killingsprees -> Integer,
        longesttimespentliving -> Integer,
        doublekills -> Integer,
        triplekills -> Integer,
        quadrakills -> Integer,
        pentakills -> Integer,
        legendarykills -> Integer,
        totdmgdealt -> Integer,
        magicdmgdealt -> Integer,
        physicaldmgdealt -> Integer,
        truedmgdealt -> Integer,
        largestcrit -> Integer,
        totdmgtochamp -> Integer,
        magicdmgtochamp -> Integer,
        physdmgtochamp -> Integer,
        truedmgtochamp -> Integer,
        totheal -> Integer,
        totunitshealed -> Integer,
        dmgselfmit -> Integer,
        dmgtoobj -> Integer,
        dmgtoturrets -> Integer,
        visionscore -> Integer,
        timecc -> Integer,
        totdmgtaken -> Integer,
        magicdmgtaken -> Integer,
        physdmgtaken -> Integer,
        truedmgtaken -> Integer,
        goldearned -> Integer,
        goldspent -> Integer,
        turretkills -> Integer,
        inhibkills -> Integer,
        totminionskilled -> Integer,
        neutralminionskilled -> Integer,
        ownjunglekills -> Integer,
        enemyjunglekills -> Integer,
        totcctimedealt -> Integer,
        champlvl -> Integer,
        pinksbought -> Integer,
        wardsbought -> Integer,
        wardsplaced -> Integer,
        wardskilled -> Integer,
        firstblood -> Bool,
    }
}

table! {
    teambans (id) {
        id -> Integer,
        matchid -> Integer,
        teamid -> Integer,
        championid -> Integer,
        banturn -> Integer,
    }
}

table! {
    teamstats (id) {
        id -> Integer,
        matchid -> Integer,
        teamid -> Integer,
        firstblood -> Bool,
        firsttower -> Bool,
        firstinhib -> Bool,
        firstbaron -> Bool,
        firstdragon -> Bool,
        firstharry -> Integer,
        towerkills -> Integer,
        inhibkills -> Integer,
        baronkills -> Integer,
        dragonkills -> Integer,
        harrykills -> Integer,
    }
}

joinable!(participants -> champs (championid));
joinable!(participants -> matches (matchid));
joinable!(stats -> participants (participantid));
joinable!(teambans -> champs (championid));
joinable!(teambans -> matches (matchid));
joinable!(teamstats -> matches (matchid));

allow_tables_to_appear_in_same_query!(
    champs,
    matches,
    participants,
    stats,
    teambans,
    teamstats,
);
