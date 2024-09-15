const { Hono } = require("hono");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const documentRoutes = new Hono();

// Create a document
documentRoutes.post("/create", async (c) => {
  const { title, content, userId } = await c.req.json();
  const document = await prisma.document.create({
    data: { title, content, ownerId: userId },
  });
  return c.json(document);
});

// Edit a document
documentRoutes.put("/edit/:id", async (c) => {
  const { id } = c.req.param();
  const { content } = await c.req.json();
  const document = await prisma.document.update({
    where: { id: Number(id) },
    data: { content },
  });
  return c.json(document);
});

// Delete a document
documentRoutes.delete("/delete/:id", async (c) => {
  const { id } = c.req.param();
  await prisma.document.delete({ where: { id: Number(id) } });
  return c.json({ message: "Document deleted" });
});

module.exports = { documentRoutes };
