const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose specific for communicating and doing REST Operations w/ MongoDB.
// MongoDB is the actual DB. Mongoose communicating w/ data in MongoDB.

// this will be our data base's data structure
const WishSchema = new Schema({
    name: String,
    link: String,
    rating: Number,
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Wish", WishSchema);
