const { Hono } = require("hono");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const permissionsRoutes = new Hono();

// Set document permissions
permissionsRoutes.post("/set", async (c) => {
  const { userId, documentId, canEdit, canView } = await c.req.json();
  const permission = await prisma.permission.create({
    data: { userId, documentId, canEdit, canView },
  });
  return c.json(permission);
});

module.exports = { permissionsRoutes };
