const { validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");

exports.getPosts = (req, res, next) => {
  const pageNumber = req.query.pageNumber || 1;
  const pageSize = req.query.pageSize || 2;
  let totalItems;
  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Post.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
    })
    .then((posts) => {
      res
        .status(200)
        .json({
          message: "Success",
          posts: posts,
          totalItems: totalItems,
          pageNumber: pageNumber,
          pageSize: pageSize,
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((result) => {
      if (!result) {
        const err = new Error("Not Found");
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({ message: "Success", post: result });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createPosts = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("Error Encountered: ", error);
    const error = new Error("Validation failed");
    error.statusCode = 422;
    throw error;
  }
  //   if(!req.file) {
  //     console.log("No file uploaded");
  //     imageUrl = "Not Uploaded"
  //   } else {
  //     imageUrl = req.file.path;
  //   }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = "Not Uploaded";
  let creator;
  // create post in DB
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });

  post
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Post Created successfully",
        post: post,
        creator: { id: creator._id, name: creator.name },
      });
    })
    .catch((error) => {
      //   console.log("Error Encountered while saving to DB: ", error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.updatePost = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    throw error;
  }
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Post Not Found");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("User not authorized!");
        error.statusCode = 403;
        throw error;
      }
      post.title = req.body.title;
      post.content = req.body.content;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Post Updated", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteById = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Post Not Found");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("User not authorized to delete this post!");
        error.statusCode = 403;
        throw error;
      }
      // Check if the post was created by the loggedin User
      return Post.findByIdAndDelete(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
