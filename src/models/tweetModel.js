const mongoose = require("mongoose");

const tweet_schema = new mongoose.Schema({
    _id: {
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
    liked_by: { type: Array },
    date: {
        type: Date,
        required: true,
        validate: (input) => {
            return new Date(input).toDateString() == new Date().toDateString();
        },
        message: input => `${input} should be current date`
    }
});

exports.Tweet = new mongoose.model("tweet", tweet_schema);