const mongoose = require("mongoose");

const tweet_schema = new mongoose.Schema({
    tweet_id: {
        type: String,
        unique: true,
        required: true
    },
    user_name: {
        type: String,
        unique: true,
        required: true
    },
    tweet_message: {
        type: String,
        required: true
    },
    likes: {
        total_likes: { type: Number },
        liked_by: { type: String }
    },
    date: {
        type: Date,
        required: true
    }
});

exports.Tweet = new mongoose.model("tweet", tweet_schema);