const User = require("../models/user.js");

exports.registerPage = function(req, res) {
  res.render("register", {title: "Web-chat"});
}

exports.authorizationPage = function(req, res) {
  res.render("authorization", {title: "Web-chat"});
}

exports.addUser = function(req, res) {
  User.findOne({login: req.body.userName}, function(err, doc) {
    if (!doc) {
      let user = new User({login: req.body.userName, password: req.body.password});
      user.save(function (err, docs) {
        if (err) {
          if (err.errors.login) {
            res.render("register", {
              errSelector: "userName", title:"Web-chat", 
              password: req.body.password, login: req.body.userName
            })
          }
          else if (err.errors.password) {
            res.render("register", {
              errSelector: "password", title:"Web-chat", 
              password: req.body.password, login: req.body.userName
            })
          }
          return console.error(err);
        }
        user.done();
        res.send(`Пользователь ${user.login} успешно зарегистрирован`)
      });
    } else {
      res.render("register", {
        errMess: "Пользователь с таким логином уже существует",
        errSelector: "userName", title:"Web-chat", 
        password: req.body.password, login: req.body.userName
      })
    }
  })
}

exports.login = function(req, res) {
  User.findOne({
    login: req.body.userName, password: req.body.password
  }, function(err, doc) {
    if (!doc) {
      res.render("authorization", {
        errMessage: "Incorrect password or username",
        title: "Web-chat",
        password: req.body.password, login: req.body.userName
      })
    } else {
      res.redirect("/")
    }
  })
}

