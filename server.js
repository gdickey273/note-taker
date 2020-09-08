const express = require("express");

const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

var path = require("path");

//----------HTML ROUTES--------------
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//-------------API ROUTES--------------


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});