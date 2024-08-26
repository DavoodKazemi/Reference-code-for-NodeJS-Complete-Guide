const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; // Accessing mongodb constructor

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://username:password@cluster0.wzyic.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"  )
    .then((result) => {
      console.log("Connected!");
      callback(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;