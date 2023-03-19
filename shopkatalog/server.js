const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Bodyparser Anfrage - Anwendung/json
app.use(bodyParser.json());

// Bodyparser Anfrage - Anwendnung/urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple Get Prüfung


//Routen für Get/POST/DELETE
require("./app/routes/routes.js")(app);


// Warten auf Requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Aufrufen Routenliste
require("./app/routes/routes")(app);

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

 