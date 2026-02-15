import { Hono } from "hono";

// Define your environment bindings
interface Env {
  // Add your environment variables here
  // Example:
  // DATABASE_URL: string;
  // API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

export default app;