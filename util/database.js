const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; // Accessing mongodb constructor

let _db;

// A method for connecting to db and storing the connection
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://username:password@cluster0.wzyic.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"  )
    .then((result) => {
      console.log("Connected!");
      _db = result.db() // storing the connection
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

// A method that return access to the db, if it exists
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;