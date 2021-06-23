var express = require('express');
var router = express.Router();
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

router.get('/:login/:password', function(req, res, next) {
  let user = new User({login: req.params.login, password: req.params.password});
  user.save(function (err, docs) {
    if (err) return console.error(err);
    user.done();
    res.send(`Пользователь ${user.login} успешно зарегистрирован`)
  });
});

module.exports = router;