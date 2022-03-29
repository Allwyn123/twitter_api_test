const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    _id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        match: [/^[a-zA-Z, ]+$/, "Enter Valid Name"],
        trim: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
        match: [/^\d{10}$/, "Enter Valid Phone no."]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [(e) => {
            const email_pattern = /.+\@.+\..+/;
            return email_pattern.test(e);
        }, "Enter Valid Email Address"]
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Enter Valid Password"]
    },
});

exports.User = new mongoose.model("user", user_schema);