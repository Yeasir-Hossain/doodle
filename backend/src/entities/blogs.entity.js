const { create, find, update, remove, findOne } = require("../db/prisma/operations");
const getUser = require("../utils/getUser");

/**
 * Creates a new blog.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response containing the created blog or an error status.
 */
const createBlog = async (req, res) => {
    try {
        // Get the user id
        const userId = await getUser(req.body.email);
        if (!userId) return res.status(400).send('Bad Request');
        delete req.body.email;

        const blog = await create({
            table: 'blog', payload: {
                data: {
                    userId,
                    ...req.body
                }
            }
        });

        return res.status(201).send(blog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Retrieves all blogs.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response containing the blogs or a 404 status if not found.
 */
const getBlogs = async (req, res) => {
    try {
        const blogs = await find({ table: 'blog', payload: { query: { orderBy: { id: 'asc' } } } });

        blogs ? res.status(200).send(blogs) : res.status(404).send('Not found');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Retrieves a single blog by ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response containing the blog or an error status.
 */
const getSingleBlog = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).send('Bad Request');

        const blog = await findOne({
            table: 'blog', payload: {
                where: {
                    id: Number(req.params.id)
                },
                include: {
                    user: true
                }
            }
        });

        blog ? res.status(200).send(blog) : res.status(404).send('Not found');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Updates an existing blog.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response containing the updated blog or an error status.
 */
const updateBlog = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).send('Bad Request');

        const blog = await update({
            table: 'blog', payload: {
                id: Number(req.params.id),
                data: req.body,
                include: {
                    user: true
                }
            }
        });

        return res.status(200).send(blog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Deletes a blog by ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response indicating the success of the deletion or an error status.
 */
const deleteBlog = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).send('Bad Request');
        await update({
            table: 'blog', payload: {
                id: Number(req.params.id),
                data: {
                    comments: {
                        deleteMany: {},
                    }
                }
            }
        });

        const blog = await remove({
            table: 'blog', payload: {
                id: Number(req.params.id)
            }
        });
        return res.status(200).send(blog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog };
