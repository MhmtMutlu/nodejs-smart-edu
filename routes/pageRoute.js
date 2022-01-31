const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.route("/", pageController.getHomePage);
router.route("/about", pageController.getAboutPage);

module.exports = router;
