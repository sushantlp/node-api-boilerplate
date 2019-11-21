/**
 * API Routes
 */

// Import Package
const { Router } = require("express");

// Import Route
const chat = require("./chat.routes.js");

const routes = new Router();

routes.use("/chats", chat);

module.exports = routes;
