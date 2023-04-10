require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cookieparser = require('cookie-parser');
const port = 3000;
const handlebars = require("express-handlebars");
const route = require("./router/index");
const bodyParser = require('body-parser')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require("./config/db");
app.use(cookieParser());
var methodOverride = require('method-override')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.use(bodyParser.json())
app.use(session({
  secret : 'jkashdkjasdhuiosydghanf234',
  resave:false,
  saveUninitialized:false
}))
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
// app.get('/a',(req,res) =>{
//   res.setHeader
// })

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
