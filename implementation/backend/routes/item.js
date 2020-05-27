var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Wish = require("./Wish");
const axios = require("axios");

/* Cluster is where the data is stored.  */

const dbRoute =
    "mongodb+srv://dbUser:dbUserPassword@finalexam-8pwgu.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

router.get("/", function (req, res, next) {
    Wish.find(function (err, data) {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true, info: data });
        }
    });
});

router.get("/:name", function (req, res, next) {
    Wish.findOne({ name: req.params.name }, function (err, data) {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            if (data) {
                return res.json({ success: true, info: data });
            } else {
                return res.json({ success: false });
            }
        }
    });
});

router.post("/", function (req, res, next) {
    if (req.body.name.length == 0 || req.body.link.length == 0) {
        return res.json({ success: false, errorCode: "EMPTY_ERR" });
    } else {
        axios(`/items/${req.body.name}`)
            .then((res) => res.data)
            .then((result) => {
                if (!result.success) {
                    let po = new Wish();
                    po.name = req.body.name;
                    po.link = req.body.link;
                    po.rating = req.body.rating;
                    po.save((err) => {
                        if (err)
                            return res.json({
                                success: false,
                                error: err,
                                errorCode: "DB_POST_ERR",
                            });
                        return res.json({ success: true });
                    });
                } else {
                    return res.json({
                        success: false,
                        errorCode: "ITEM_EXISTS_ERR",
                    });
                }
            });
    }
});

router.put("/", function (req, res, next) {
    Wish.updateOne(
        { name: req.body.name },
        { $set: { rating: req.body.rating } },
        function (err, data) {
            if (err) {
                return res.json({ success: false, error: err });
            } else {
                return res.json({ success: true, info: data });
            }
        }
    );
});

router.delete("/", function (req, res, next) {
    Wish.deleteOne({ name: req.body.name }, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;
