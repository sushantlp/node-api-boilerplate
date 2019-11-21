/**
 * Club Card Routes
 */

// Import Package
const { Router } = require("express");

const routes = new Router();

// Controllers (route handlers).
const ChatApiController = require("../../controllers/chat.controller");

// Merchant Verify
routes.post("/signup", ChatApiController.requestChat);

module.exports = routes;
