const express = require("express");
const router = express.Router();
const authroute = require("./auth");
const gameroute = require("./gamepost");
const User = require("../models/users.js");
var glist = require("../models/gamelist");
const axios = require("axios");
var authMiddleware = require("./authMiddleware");
const IGDB = require("ts-igdb").default;

const igdb = new IGDB("1fda64715ca1971db849c092ce825dbf");

currentDate = Math.floor(Date.now() / 1000);

/* GET home page */
router.get("/", (req, res, next) => {
  axios({
    url:
      "https://api-v3.igdb.com/games?fields=name,popularity,cover,cover.url,cover.image_id,slug&order=popularity:desc&expand=cover&limit=4&filter[release_dates.platform][any]=48,49,130",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": "1fda64715ca1971db849c092ce825dbf"
    },
    data: "fields name artworks;"
  })
    .then(response => {
      if (req.cookies) {
        currentUser = req.cookies.currentuser;
      }
      console.log(req.cookies, 1421454253)
      res.render("index", { game: response.data, currentUser});
      console.log(response.data);
    })
    .catch(err => {
      console.error(err);
    });
});

/*Get Explore Page*/
router.get("/explore", (req, res, next) => {
  axios
    .all([
      axios({
        url:
          "https://api-v3.igdb.com/games?fields=cover.image_id,name&order=popularity:desc&expand=cover&limit=16&filter[release_dates.platform][any]=48,49,130",
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": "1fda64715ca1971db849c092ce825dbf"
        }
      }),
      axios({
        url: `https://api-v3.igdb.com/release_dates/?fields=*,game.cover,game.cover.image_id,game.name&filter[platform][any]=48&order=date:desc&filter[date][lt]=${currentDate}&expand=game,game.cover,game.name&limit=16`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": "1fda64715ca1971db849c092ce825dbf"
        }
      }),
      axios({
        url: `https://api-v3.igdb.com/release_dates/?fields=*,game.cover,game.cover.image_id,game.name&filter[platform][any]=48&order=date:asc&filter[date][gt]=${currentDate}&expand=game,game.cover,game.name&limit=16`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": "1fda64715ca1971db849c092ce825dbf"
        }
      })
    ])
    .then(
      axios.spread((popgames, recentgames, soongames) => {
        res.render("explore", {
          popgame: popgames.data,
          recentgames: recentgames.data,
          soongames: soongames.data
        });
        console.log("----------------->First Call", popgames.data);
        console.log("----------------->Second Call", recentgames.data);
      })
    )
    .catch(err => {
      console.log(err);
    });
});

/*Get Character Page*/
router.get("/gamepage", (req, res, next) => {
  var id = req.query.game_id;
  axios({
    url: `https://api-v3.igdb.com/games/${id}?fields=name,screenshots.image_id,cover.image_id,summary,platforms.name,similar_games.cover.image_id&expand=screenshots,cover,platforms,similar_games`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "user-key": "1fda64715ca1971db849c092ce825dbf"
    },
    data: "fields name artworks;"
  })
    .then(response => {
      res.render("gamepage", { game: response.data[0] });
      console.log(response.data[0]);
    })
    .catch(err => {
      console.error(err);
    });
});

// router.post("")

router.use("/", authroute);
router.use("/", gameroute);

/*Get Dashboard Page*/
router.get("/dashboard", authMiddleware.noCurrentUser, (req, res, next) => {
  let wtparr = [];
  let playingarr = [];
  let beatenarr = [];
  let backlogarr = [];

  User.findById(req.cookies.currentuser._id).then(user => {
    let promises = [];

    for (let i = 0; i < user.backlog.length; i++) {
      promises.push(
        glist.findById(user.backlog[i]._id).then(game => {
          backlogarr.push(game);
          console.log(game);
          console.log("this is the array ======>", beatenarr);
          return game + " yo!!!!";
        })
      );
    }

    for (let i = 0; i < user.wtpgames.length; i++) {
      promises.push(
        glist.findById(user.wtpgames[i]._id).then(game => {
          wtparr.push(game);
          console.log(game);
          console.log("this is the array ======>", wtparr);
          return game + " yo!!!!";
        })
      );
    }

    for (let i = 0; i < user.beaten.length; i++) {
      promises.push(
        glist.findById(user.beaten[i]._id).then(game => {
          beatenarr.push(game);
          console.log(game);
          console.log("this is the array ======>", beatenarr);
          return game + " yo!!!!";
        })
      );
    }

    for (let i = 0; i < user.playing.length; i++) {
      promises.push(
        glist.findById(user.playing[i]._id).then(game => {
          playingarr.push(game);
          console.log(game);
          console.log("this is the array ======>", playingarr);
          return game + " yo!!!!";
        })
      );
    }

    Promise.all(promises).then(function(values) {
      console.log("This is the promise results", values);
      res.render("dash", {
        currentUser: req.cookies.currentuser,
        wtp: wtparr,
        playing: playingarr,
        beaten: beatenarr,
        backlog: backlogarr
      });
    });
  });
  console.log("This is the array out of loop =========>", wtparr);
});

//Search Bar get
router.post("/search", (req, res, next) => {
  searchinput = req.body.search;
  console.log("I am the body!",req.body)
  axios({
    url: `https://api-v3.igdb.com/games?search=${searchinput}&fields=cover.image_id,name&expand=cover&filter[version_parent][not_exists]=1&limit=50`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "user-key": "1fda64715ca1971db849c092ce825dbf"
    }
  })
    .then(response => {
      nolink =
        '<img src="https://images.igdb.com/igdb/image/upload/t_cover_big_2x/.jpg">';
      console.log(response.data);
      res.render("search", { game: response.data, noimg: nolink });
    })
    .catch(err => {
      console.error(err);
    });
});

router.get('/searchmob', (req, res, next) => {
  res.render("searchmob")
})

module.exports = router;
