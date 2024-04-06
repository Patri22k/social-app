const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const saveUser = (user, callback) => {
    prisma.user.create({ data: user }).then(callback);
};

const getUser = (name, callback, includeCred) => {
    prisma.user.findUnique({
        where: { name },
        include: includeCred ? { credentials: true } : undefined
    }).then(callback);
};

module.exports = { getUser, saveUser };
