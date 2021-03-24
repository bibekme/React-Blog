const express = require("express");
const { Blog } = require("../models/blog");
const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

router.post("/", async (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  });
  blog = await blog.save();

  res.send(blog);
});

router.put("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, body: req.body.body, author: req.body.author },
    {
      new: true,
    }
  );

  if (!blog)
    return res
      .status(404)
      .json({ msg: "The blog with the given id was not found" });

  res.send(blog);
});

router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id);

  if (!blog)
    return res
      .status(404)
      .json({ msg: "The blog with the given id was not found" });

  res.send(blog);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog)
    return res
      .status(404)
      .json({ msg: "The blog with the given id was not found" });

  res.send(blog);
});

module.exports = router;
