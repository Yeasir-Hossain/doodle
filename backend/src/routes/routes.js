// routes.js
const express = require('express');
const { createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog } = require('../entities/blogs.entity');
const { getblogsComments, createComment, updateComment, deleteComment } = require('../entities/comments.entity');

const router = express.Router();

// blogs
router.route('/blog')
    .post(createBlog)
    .get(getBlogs);

router.route('/blog/:id')
    .get(getSingleBlog)
    .patch(updateBlog)
    .delete(deleteBlog);

// comments
router.route('/comment/:blogId')
    .post(createComment)
    .get(getblogsComments);

router.route('/comment/:id')
    .patch(updateComment)
    .delete(deleteComment);

module.exports = router;
