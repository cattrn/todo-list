const express = require("express");
const path = require("path");
const morgan = require("morgan");
const ejs = require('ejs');

const { port } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));



app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}\n`)
);
