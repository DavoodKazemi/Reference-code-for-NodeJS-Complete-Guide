const path = require("path");
// Load the Express library and store it in a constant named 'express'.
const express = require("express");
// Import body-parser package which was installed
const bodyParser = require("body-parser");

const { mongodb } = require("mongodb");

const mongoConnect = require("./util/database").mongoConnect;
const getDb = require("./util/database").getDb;
const User = require("./models/user");

// Create a new Express application instance and store it in a constant named 'app'.
const app = express();

// Set the templating engine to Handlebars using the 'view engine' property
app.set("view engine", "ejs");
// Set the location of the views directory (default is 'views')
app.set("views", "views");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

// Make the public folder accessible to be able to use the files inside it statically
app.use(express.static(path.join(__dirname, "public")));

// Register a new middleware so to store the dummy user in request, making us able to use the User when creating a new Product
app.use((req, res, next) => {
  User.findById("66d223b2fd4145cffb038ce5")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id); //Store the user retrieved from DB into the request (by adding a new field to the request)
      console.log("user: ", user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
