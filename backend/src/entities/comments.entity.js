const { create, find, update, remove } = require("../db/prisma/operations");

/**
 * Creates a new comment.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response containing the created comment or an error status.
 */
const createComment = async (req, res) => {
    try {
        if (!req.params.blogId) return res.status(400).send('Bad Request');

        const comment = await create({
            table: 'comment', payload: {
                data: {
                    blogId: Number(req.params.blogId),
                    ...req.body
                }
            }
        });

        return res.status(201).send(comment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Retrieves comments for a specific blog.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response containing the blog comments or an error status.
 */
const getblogsComments = async (req, res) => {
    try {
        if (!req.params.blogId) return res.status(400).send('Bad Request');

        const comments = await find({
            table: 'comment',
            payload: {
                query: {
                    where: {
                        blogId: {
                            equals: Number(req.params.blogId)
                        }
                    }
                }
            }
        });

        comments ? res.status(200).send(comments) : res.status(404).send('Not found');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Updates an existing comment.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response containing the updated comment or an error status.
 */
const updateComment = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).send('Bad Request');

        const comment = await update({
            table: 'comment', payload: {
                id: Number(req.params.id),
                data: req.body
            }
        });

        return res.status(200).send(comment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Deletes a comment.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response indicating the success of the deletion or an error status.
 */
const deleteComment = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).send('Bad Request');

        const commentId = Number(req.params.id);
        const comment = await remove({
            table: 'comment', payload: {
                id: commentId
            }
        });

        return res.status(200).send(comment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createComment, getblogsComments, updateComment, deleteComment };
