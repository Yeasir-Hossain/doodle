const { findOne, create } = require("../db/prisma/operations");

/**
 * Check if a user exists, and create one if not.
 * @param {Object} email - The email.
 * @returns {Object} - The user.
 */
const getUser = async (email) => {
    try {
        // Check if the user already exists
        const existUser = await findOne({
            table: 'user',
            payload: {
                where: {
                    email,
                },
            },
        });
        if (existUser) return existUser.id;

        // Create a new user
        const newUser = await create({
            table: 'user',
            payload: {
                data: {
                    email
                }
            },
        });

        return newUser.id;
    } catch (e) {
        console.log(e);
    }
};



module.exports = getUser