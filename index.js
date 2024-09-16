"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 10000;

const path = require("node:path");
console.log("ilker");
//!-----------------------------------------------------------------!//
// asyncErrors to errorHandler:
require("express-async-errors");

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

// Middlewares:

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "./public")));

// Call static uploadFile:
app.use("/upload", express.static("./upload"));

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
app.use(require("./src/middlewares/logger"));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

// HomePath:
app.all("/api/v1", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Stock Management API",
    documents: {
      swagger: "/api/v1/documents/swagger",
      redoc: "/api/v1/documents/redoc",
      json: "/api/v1/documents/json",
    },
    user: req.user,
  });
});

// Routes:
app.use("/api/v1", require("./src/routes"));

app.get("/", (req, res) => {
  /* 
  #swagger.ignore = true
  */

  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

//!-----------------------------------------------------------------!//

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
