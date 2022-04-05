const mongoose = require("mongoose");

const tweet_schema = new mongoose.Schema({
    t_id: {
        type: Number,
        unique: true,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    tweet_message: {
        type: String,
        required: true
    },
    liked_by: { type: Array }
},
{ timestamps: true });

exports.Tweet = new mongoose.model("tweet", tweet_schema);