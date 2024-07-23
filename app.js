const path = require("path");
// Load the Express library and store it in a constant named 'express'.
const express = require("express");
// Import body-parser package which was installed
const bodyParser = require("body-parser");
// Unlike Pug, handlebars need to be imported.
const expressHbs = require("express-handlebars");

// Create a new Express application instance and store it in a constant named 'app'.
const app = express();

// Registering Handlebars as the template engine for .hbs files.
// First argument (extension) is up to you.
// app.engine function is an Express function used to register a templating engine.
// expressHbs.engine function initializes Handlebars, making it compatible with Express and allowing us to use Handlebars templates in our app.
app.engine("hbs", expressHbs.engine({ layoutsDir: "views/layouts/", defaultLayout: "main-layout", extname: "hbs" }));
// Set the templating engine to Handlebars using the 'view engine' property
app.set("view engine", "hbs");
// Set the location of the views directory (default is 'views')
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

// Make the public folder accessible to be able to use the files inside it statically
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found", layout: false });
});

app.listen(3000);
