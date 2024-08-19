const path = require("path");
// Load the Express library and store it in a constant named 'express'.
const express = require("express");
// Import body-parser package which was installed
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const Product = require("./models/product");
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

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  // .sync( { force: true } )
  .sync()
  .then(result => {
    // console.log(result);
    return User.findByPk(1); //Check if we have a user at least, if not we want to create a user
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Dave", email: "sacred@test.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
