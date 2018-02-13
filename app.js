let express      = require('express');
let path         = require("path");
let session      = require("express-session");
let bodyParser   = require("body-parser");
let router       = require('./routes/index');
let exphbs       = require("express-handlebars");
let mongoose     = require("./config/mongoose.js");
let app          = express();


// Database connection
mongoose();


app.engine(".hbs", exphbs({
    defaultLayout: "default",
    extname: ".hbs"

}));
app.set("view engine", ".hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use('/', router)

app.listen(8000, function() {
  console.log('App listening on port 8000!');
});

app.use(function(req, res, next) {
    res.status(404).send("Sorry, that item can't be found!")
})

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Sorry, something is broken!")
})