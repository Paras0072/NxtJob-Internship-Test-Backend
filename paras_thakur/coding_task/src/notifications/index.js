const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const notifyCollaborators = async (docId) => {
  const collaborators = await prisma.permission.findMany({
    where: { documentId: docId, canView: true },
    include: { user: true },
  });

  for (const collaborator of collaborators) {
    // Send notification to each collaborator (e.g., via email)
    console.log(
      `Notifying ${collaborator.user.email} about document ${docId} update.`
    );
  }
};

module.exports = { notifyCollaborators };
