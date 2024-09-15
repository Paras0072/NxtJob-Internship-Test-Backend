const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const trackVersion = async (docId, content) => {
  await prisma.documentVersion.create({
    data: { documentId: docId, content },
  });
};

module.exports = { trackVersion };
