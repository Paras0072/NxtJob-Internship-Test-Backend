const { Hono } = require("hono");
const { authRoutes } = require("./auth");
const { documentRoutes } = require("./documents");
// import 'dotenv/config' // To read CLERK_API_KEY
const app = new Hono();

// Routes
app.route("/auth", authRoutes);
app.route("/documents", documentRoutes);

module.exports = app;
