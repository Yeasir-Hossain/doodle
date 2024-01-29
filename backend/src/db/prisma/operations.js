const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Finds records in the database based on specified criteria.
 *
 * @async
 * @param {Object} options - Options for the find operation.
 * @param {string} options.table - The table name to query.
 * @param {Object} [options.payload={}] - Payload containing query parameters.
 * @param {Object} [options.payload.query={}] - Query parameters for filtering.
 * @returns {Promise<Array>|Promise<Object>} An array of records or a paginated result object.
 * @throws {Error} Throws an error if an exception occurs during the operation.
 */
async function find({ table, payload = {} }) {
    try {
        // Destructure query parameters from the payload object
        let { query: { where = {}, orderBy } = {}, select } = payload;

        // Parse the 'where' JSON string if it's provided as a string
        if (typeof where === 'string') where = JSON.parse(where);

        const result = await prisma[table].findMany({
            where,
            ...(select && { select }),
            orderBy,
        });
        return result;
    } catch (error) {
        // Catch and re-throw any errors that occur
        throw new Error(error.message);
    }
}


/**
 * Finds a single record in the database based on specified criteria.
 *
 * @async
 * @param {Object} options - Options for the findOne operation.
 * @param {string} options.table - The table name to query.
 * @param {rest} options.rest - if any select or include is needed
 * @returns {Promise<Object|null>} A single record or null if not found.
 */
async function findOne({ table, payload: { where = {}, ...rest } = {} }) {
    try {
        const result = await prisma[table].findUnique({
            where,
            ...(rest || {}),
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}



/**
 * Creates a new record in the database.
 *
 * @async
 * @param {Object} options - Options for the create operation.
 * @param {string} options.table - The table name to insert into.
 * @param {Object} options.payload - Payload containing data to insert.
 * @returns {Promise<Object>} The created record.
 */
async function create({ table, payload: { data, ...rest } }) {
    try {
        const result = await prisma[table].create({
            data,
            ...(rest || {}),
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Updates an existing record in the database.
 *
 * @async
 * @param {Object} options - Options for the update operation.
 * @param {string} options.table - The table name to update.
 * @param {Object} options.payload - Payload containing ID and data for the update.
 * @returns {Promise<Object>} The updated record.
 */
async function update({ table, payload: { id, data, where = {}, ...rest } }) {
    try {
        const result = await prisma[table].update({
            where: {
                id,
                ...where,
            },
            data,
            ...(rest || {}),
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Performs a hard delete (removes) a record from the database.
 *
 * @async
 * @param {Object} options - Options for the hardDelete operation.
 * @param {string} options.table - The table name to delete from.
 * @param {Object} options.payload - Payload containing ID for the hard delete.
 * @returns {Promise<void>} Resolves when the deletion is successful.
 */
async function remove({ table, payload: { id } }) {
    try {
        const result = await prisma[table].delete({ where: { id } });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = { create, update, remove, find, findOne };