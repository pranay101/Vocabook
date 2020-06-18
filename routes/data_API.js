const express = require("express");
const router = express.Router();
const https = require("https");






router.get("/word_of_the_day", function (req, res) {
    https
    .get(
      "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=" +
        process.env.API_KEY,
      (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          //console.log(JSON.parse(data));
          res.end(data);
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
});

////// for word searching

router.get("/searchexample/:word", function (req, res) {
  https
    .get(
      " https://api.wordnik.com/v4/word.json/" +
        req.params.word +
        "/topExample?useCanonical=false&api_key=" +
        process.env.API_KEY,
      (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          //console.log(JSON.parse(data));
          res.end(data);
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
});


///////// for example


router.get("/search/:word", function (req, res) {
  https
    .get(
      " https://api.wordnik.com/v4/word.json/" +
        req.params.word +
        "/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key=" +
        process.env.API_KEY,
      (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          //console.log(JSON.parse(data));
          res.end(data);
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
});

module.exports = router;
