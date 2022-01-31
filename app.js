const express = require("express");

const app = express();
const port = 3000;

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.status(200).render("index");
});
app.get("/about", (req, res) => {
  res.status(200).render("about");
});

app.listen(port, () => {
  console.log(`App startred on port ${port}`);
});
