const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    
    req.flash("success", `${category.name} has been created successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("danger", `Category could not created!`);
    res.status(400).redirect("/users/dashboard");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);

    req.flash("success", `${category.name} has been deleted successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("danger", `Category could not deleted!`);
    res.status(400).redirect("/users/dashboard");
  }
};