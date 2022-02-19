const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userId,
    });
    req.flash("success", `${course.name} has been created successfully!`);
    res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("error", `Course couldn't created!`);
    res.status(400).redirect("/courses");
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const query = req.query.search;
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    if (query) {
      filter = { name: query };
    }
    if (!query && !categorySlug) {
      filter.name = "";
      filter.category = null;
    }
    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("user");
    const categories = await Category.find();
    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const user = await User.findById(req.session.userId);
    const categories = await Category.find();
    res.status(200).render("course", {
      course,
      user,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({ slug: req.params.slug });

    req.flash("warning", `${course.name} has been deleted successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("danger", `Course could not deleted!`);
    res.status(400).redirect("/users/dashboard");
  }
};
