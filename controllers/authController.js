const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
    res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // SESSION
          req.session.userId = user._id;
          return res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", "Your password is not correct!");
          return res.status(400).redirect("/login");
        }
      });
    } else {
      req.flash("error", "Enter a valid user email!");
      return res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userId });
  const users = await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    users,
    categories,
    courses,
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({ user: req.params.id });

    req.flash("warning", `${user.name} has been deleted successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("danger", `User could not deleted!`);
    res.status(400).redirect("/users/dashboard");
  }
};
