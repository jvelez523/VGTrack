module.exports = {
  currentUser: function(req, res, next) {
    let currentUser = null;
    if (req.cookies) {
      currentUser = req.cookies.currentUser;
    }
    if (currentUser) {
      res.render("error", { message: "You are already Logged in" });
    } else {
      next();
    }
  },
  noCurrentUser: function(req, res, next) {
    let currentuser = null;
    if (req.cookies) {
      currentuser = req.cookies.currentuser;
    }
    if (currentuser) {
      next();
    } else {
      res.redirect("/");
    }
  },
  homePage: function(req, res, next) {
    let currentuser = null;
    if (req.cookies) {
      currentUser = req.cookies.currentuser;
    }
    if (currentUser) {
      res.redirect("/dashboard");
    } else {
      next();
    }
  }
};