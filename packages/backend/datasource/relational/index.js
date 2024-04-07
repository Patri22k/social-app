const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const saveUser = (user, callback) => {
    prisma.user.create({ data: user }).then(callback);
};

const getUser = (name, callback, includeCred) => {
    prisma.user.findUnique({
        where: { name },
        include: { credentials: includeCred ?? false }
    }).then(callback);
};

module.exports = { getUser, saveUser };
