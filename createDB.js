const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webchatdb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});
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

let user = new User({login: "itgenik", password: "itgenio"});
user.save(function (err, docs) {
  if (err) return console.error(err);
  user.done();
});


// // Connect using a MongoClient instance

// const MongoClient = require('mongodb').MongoClient;

// const test = require('assert');

// // Connection url

// const url = 'mongodb://localhost:27017';

// // Database Name

// const dbName = 'webchatdb';

// // Connect using MongoClient

// const mongoClient = new MongoClient(url,
//   {useNewUrlParser: true,useUnifiedTopology: true});

// mongoClient.connect(function(err, client) {

//   const db = client.db(dbName);
  
//   const collection = db.collection("users");

//   let user = {login: "tom", password: "tom123"};
//   collection.insertOne(user, function(err, result){   
//     if(err){ 
//       return console.log(err);
//     }
//     console.log(`Пользователь ${result.ops[0].login} добавлен в базу данных`);
//     client.close();
//   });

// });

