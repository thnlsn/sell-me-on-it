require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");



var app = express();
const path =require('path');
var PORT = process.env.PORT || 3030;

// Middleware
// let bodyParser = require('body-parser');

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
//   }))
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/pieces")
});


// Handlebars
app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

var db = require("./models");
require("./routes/apiRoutes")(app);

const Role = db.role;

function initial() {
  Role.create({
    // id:1,
    name: "USER"
  });

  Role.create({
    // id:2,
    name: "Signed In"
  });
  Role.create({
    // id:3,
    name: "Logged Off"
  });
}


//force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  // console.log('Drop and Resync with {force:true}');
  initial();
});

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
