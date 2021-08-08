const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength:6,
    maxlength:20
  }
});
userScheme.methods.done = function () {
  const greeting = `User ${this.login} has been successfully registered`;
  console.log(greeting);
}
const User = mongoose.model('User', userScheme);

router.post('/', function(req, res, next) {
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
  
});

module.exports = router;