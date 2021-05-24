// Connect using a MongoClient instance

const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const url = 'mongodb://localhost:27017';

// Database Name

const dbName = 'webchatdb';

// Connect using MongoClient

const mongoClient = new MongoClient(url,
  {useNewUrlParser: true,useUnifiedTopology: true});

mongoClient.connect(function(err, client) {

  const db = client.db(dbName);

  client.close();

});

