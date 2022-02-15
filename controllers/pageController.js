const nodemailer = require("nodemailer");

exports.getHomePage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.sendEmail = (req, res) => {
  const outputMessage = `
    <h1>Mail Details</h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
  `
}