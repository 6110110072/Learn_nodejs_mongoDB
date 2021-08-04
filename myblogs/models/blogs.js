const mongoose = require("mongoose");
const mongo = require("mongodb");
const dbUrl = "mongodb://localhost:27017/blogDB";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Blogs = (module.exports = mongoose.model("blogs", blogSchema));
module.exports.createBlog = function (newBlogs, callback) {
  newBlogs.save(callback);
};
module.exports.getAllBlogs = function (data) {
  Blogs.find(data);
};

module.exports.deleteBlog = function (id, callback) {
  Blogs.findByIdAndDelete(id, callback);
};

module.exports.getBlogId = function (id, callback) {
  var query = {
    _id: id,
  };
  Blogs.findOne(query, callback);
};

module.exports.updateBlog = function (data, callback) {
  var query = {
    _id: data.id,
  };
  Blogs.findByIdAndUpdate(
    query,
    {
      $set: {
        title: data.title,
        author: data.author,
        category: data.category,
      },
    },
    { new: true },
    callback
  );
};
