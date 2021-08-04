var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator"); //check author and title
const Blogs = require("../models/blogs");
/* GET users listing. */
router.get("/", function (req, res, next) {
  Blogs.getAllBlogs(function (err, blogs) {
    if (err) throw err;
    res.render("blogs/index", { data: "ข้อมูลบทความ", blogs: blogs });
  });
});
router.get("/add", function (req, res, next) {
  res.render("blogs/addform", { data: "เพิ่มข้อมูลบทความ" });
});
router.get("/delete/:id", function (req, res, next) {
  Blogs.deleteBlog([req.params.id], function (err) {
    if (err) throw err;
    console.log("DELETE COMPLETE");
    res.redirect("/blogs");
  });
});

router.get("/edit/:id", function (req, res, next) {
  Blogs.getBlogId([req.params.id], function (err, blog) {
    if (err) throw err;
    res.render("blogs/editform", { data: "แก้ไขบทความ", blog: blog });
  });
});

router.post(
  "/add",
  [
    check("title", "กรุณากรอกชื่อบทความ").not().isEmpty(),
    check("author", "กรุณากรอกชื่อผู้แต่ง").not().isEmpty(),
  ],
  function (req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    for (var key in errors) {
      console.log(errors[key].value);
    }
    if (!result.isEmpty()) {
      //กรอกข้อมูลไม่ครบ
      res.render("blogs/addform", { data: "เขียนบทความ", errors: errors });
    } else {
      var data = new Blogs({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
      });
      Blogs.createBlog(data, function (err) {
        if (err) console.log(err);
        res.redirect("/blogs");
      });
    }
  }
);

router.post(
  "/update",
  [
    check("title", "กรุณากรอกชื่อบทความ").not().isEmpty(),
    check("author", "กรุณากรอกชื่อผู้แต่ง").not().isEmpty(),
  ],
  function (req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    for (var key in errors) {
      console.log(errors[key].value);
    }
    if (!result.isEmpty()) {
      //กรอกข้อมูลไม่ครบ
      res.render("/blogs", { data: "เขียนบทความ", errors: errors });
    } else {
      var data = new Blogs({
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
      });
      Blogs.updateBlog(data, function (err) {
        if (err) console.log(err);
        res.redirect("/blogs");
      });
    }
  }
);
module.exports = router;
