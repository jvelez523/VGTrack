const express = require("express");
const router = express.Router();
const authroute = require("./auth");
const axios = require("axios");
const IGDB = require('ts-igdb').default;

const igdb = new IGDB('1fda64715ca1971db849c092ce825dbf');

currentDate = Math.floor(Date.now() / 1000)

/* GET home page */
router.get("/", (req, res, next) => {
  axios({
    url:
      "https://api-v3.igdb.com/games?fields=name,popularity,cover,cover.url,cover.image_id&order=popularity:desc&expand=cover&limit=4&filter[release_dates.platform][any]=48,49,130",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": "1fda64715ca1971db849c092ce825dbf"
    },
    data: "fields name artworks;"
  })
    .then(response => {
      res.render("index", { game: response.data });
      console.log(response.data);
    })
    .catch(err => {
      console.error(err);
    });

});


/*Get Explore Page*/
router.get("/explore", (req, res, next) => {
  axios.all([
    axios({
        url:
          "https://api-v3.igdb.com/games?fields=cover.image_id,name&order=popularity:desc&expand=cover,genres&limit=16&filter[release_dates.platform][any]=48,49,130",
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": "1fda64715ca1971db849c092ce825dbf"
        }}),
        axios({
          url:
            `https://api-v3.igdb.com/release_dates/?fields=*,game.cover,game.cover.image_id,game.name&filter[platform][any]=48&order=date:desc&filter[date][lt]=${currentDate}&expand=game,game.cover,game.name&limit=16`
            ,
          method: "POST",
          headers: {
            Accept: "application/json",
            "user-key": "1fda64715ca1971db849c092ce825dbf"
          }}),
          axios({
            url:
              `https://api-v3.igdb.com/release_dates/?fields=*,game.cover,game.cover.image_id,game.name&filter[platform][any]=48&order=date:asc&filter[date][gt]=${currentDate}&expand=game,game.cover,game.name&limit=16`
              ,
            method: "POST",
            headers: {
              Accept: "application/json",
              "user-key": "1fda64715ca1971db849c092ce825dbf"
            }})
  ])
  .then(axios.spread((popgames, recentgames, soongames) => {
    res.render("explore", {popgame: popgames.data, recentgames: recentgames.data, soongames: soongames.data})
    console.log("----------------->First Call",popgames.data)
    console.log("----------------->Second Call",recentgames.data)
  }))
  .catch(err => {
    console.log(err)
  });
})

router.use("/", authroute);

module.exports = router;
