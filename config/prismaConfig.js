const { PrismaClient } = require('@prisma/client'); // Use require for importing

const prisma = new PrismaClient(); // Instantiate PrismaClient

module.exports = prisma; // Export prisma instance
