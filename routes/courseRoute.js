const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.route("/").get(courseController.createCourse);

module.exports = router;
