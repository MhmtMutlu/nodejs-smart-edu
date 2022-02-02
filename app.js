const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");

const app = express();
const port = 3000;

// Connect DB
mongoose
  .connect("mongodb://localhost/smartedu-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to DB");
  });

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));

// Routes
app.use("/", pageRoute);

app.listen(port, () => {
  console.log(`App startred on port ${port}`);
});
