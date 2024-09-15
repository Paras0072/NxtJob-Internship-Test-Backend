const { Hono } = require("hono");

const wsRoutes = new Hono();

wsRoutes.get("/collaborate/:docId", (c) => {
  const { docId } = c.req.param();
  const webSocket = c.get("websocket");

  webSocket.addEventListener("message", async (event) => {
    const message = JSON.parse(event.data);
    // Broadcast message to all connected clients
    webSocket.send(JSON.stringify({ docId, message }));
  });

  return webSocket;
});

module.exports = { wsRoutes };
