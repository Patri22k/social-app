/**
 * @fileoverview This file contains functions for interacting with the database using Prisma Client.
 * @module relational/index
 */

// Import the PrismaClient constructor from the '@prisma/client' module.
// Prisma Client is an auto-generated database client that enables type-safe database access.
const { PrismaClient } = require('@prisma/client');

// Instantiate a new PrismaClient instance.
// This instance is used to interact with the database.
const prisma = new PrismaClient();

/**
 * Saves a user to the database.
 * @param {object} user - The user object to be saved.
 * @param {function} callback - The callback function to be executed after saving the user.
 */
const saveUser = (user, callback) => {
    prisma.user.create({ data: user }).then(callback);
};

/**
 * Retrieves a user from the database.
 * @param {string} name - The name of the user to retrieve.
 * @param {function} callback - The callback function to be executed after retrieving the user.
 * @param {boolean} [includeCred=false] - Whether to include the user's credentials in the result.
 */
const getUser = (name, callback, includeCred) => {
    prisma.user.findUnique({
        where: { name },
        include: { credentials: includeCred ?? false }
    }).then(callback);
};

export { getUser, saveUser };
