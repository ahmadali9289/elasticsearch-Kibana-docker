const express = require("express");
const controller = require("../../controllers");
const routes = express.Router();

routes.route("/").get(controller.getStudents);
routes.route("/new").post(controller.addStudent);

module.exports = routes;
