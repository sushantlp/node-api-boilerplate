"use strict";

require("dotenv").config();

// Import Package
const express = require("express");
const chalk = require("chalk");
const sass = require("node-sass-middleware");
const path = require("path");
const favicon = require("serve-favicon");
const robots = require("express-robots");

// Create Express server.
const app = express();

// Import Route
const v1RouteApi = require("./routes/routes_v1");

// Import Middleware
const middlewares = require("./middlewares/middleware");

// Controllers (route handlers).
const database = require("./controllers/database.controller");

// Wrap all the middlewares with the server
middlewares.default(app);

app.use(
  sass({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public")
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(robots(path.join(__dirname, "public", "robots.txt")));
app.disable("etag");

// Index Route
app.get("/", (req, res) => {
  return res.status(200).redirect("/index.html");
});

// Add the apiRoutes stack to the server
app.use("/api/v1", v1RouteApi);

// Call Sequelize Connection
database.sequelizeConnection();

// Start Express server.
app.listen(app.get("port"), () => {
  console.log(
    chalk.green.bold(
      `
        Yep this is working 🍺
        App listen on port: ${process.env.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `
    )
  );
});

app.all("*", function(req, res) {
  res.redirect(process.env.BASE_URL);
});

// Export
module.exports = app;
