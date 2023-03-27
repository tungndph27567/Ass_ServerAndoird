
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const handlebars = require("express-handlebars");
const route = require("./router/index");
const bodyParser = require('body-parser')
const db = require("./config/db");
var methodOverride = require('method-override')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
// parse application/json
app.use(bodyParser.json())
db.connect();
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    helpers:{
      sum :(a,b) => a+b
    }
  })
);
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources/views"));

route(app);


app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
