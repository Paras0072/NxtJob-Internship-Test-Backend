import { Hono } from "hono";
import { Clerk } from "@clerk/clerk-js";

const authRoutes = new Hono();

// Initialize Clerk using the Frontend API key
const clerk = new Clerk(
  "pk_test_dG91Z2gtc2hhcmstODYuY2xlcmsuYWNjb3VudHMuZGV2JA"
); // Replace with your Clerk Frontend API Key

// User registration route
authRoutes.post("/register", async (c) => {
  const { email, password } = await c.req.json();

  // Use Clerk API to create a user
  try {
    const user = await clerk.users.create({
      emailAddress: email,
      password,
    });

    return c.json({ message: "User registered successfully", user });
  } catch (error) {
    return c.json(
      { error: "User registration failed", details: error.message },
      400
    );
  }
});

// User login route
authRoutes.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  // Use Clerk API to create a session (login)
  try {
    const session = await clerk.sessions.create({
      emailAddress: email,
      password,
    });

    return c.json({ message: "Login successful", session });
  } catch (error) {
    return c.json({ error: "Login failed", details: error.message }, 401);
  }
});

// Export the authRoutes
module.exports = { authRoutes };

// Worker fetch event handler
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const { request, env } = event;

  // Attach env to the Hono context
  authRoutes.all("*", (c) => {
    c.env = env; // Attach env to the context
    return c.next();
  });

  // Let Hono handle the request
  return authRoutes.fetch(request, env);
}
