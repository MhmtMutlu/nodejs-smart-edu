const express = require("express");

const app = express();
const port = 3000;

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Index Page");
});

app.listen(port, () => {
  console.log(`App startred on port ${port}`);
});
