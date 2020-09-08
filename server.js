const express = require("express");
const fs = require("fs");

const app = express();


var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

var path = require("path");

const noteData = require("./db/db.json");
const { json } = require("express");
const { fstat } = require("fs");


//-------------API ROUTES--------------
app.get("/api/notes", function(req, res) {
  console.log(noteData)
  res.json(noteData);
});

app.post("/api/notes", function(req, res){
  let jsonData = req.body;
  jsonData["id"] = noteData.length + 1;
  noteData.push(jsonData);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
  res.json(true);
});

app.delete("/api/notes/:id", function(req, res){
  const arr = noteData.filter(note => note.id != req.params.id);
  console.log(arr);
  fs.writeFileSync("./db/db.json", JSON.stringify(arr));

  res.json(true);
});


//----------HTML ROUTES--------------
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});




//---------APP LISTENER----------------
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});