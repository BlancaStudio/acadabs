import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
console.log("1. entrando en startServer");
  const app = express();
  const server = createServer(app);
console.log("2. express creado");
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
console.log("3. middleware registrado");
//  registerStorageProxy(app);
//  registerOAuthRoutes(app);
console.log("4. antes de setupVite");
  // tRPC API
//  app.use(
//    "/api/trpc",
//    createExpressMiddleware({
//      router: appRouter,
//      createContext,
//    })
//  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
console.log("Antes de setupVite");
    await setupVite(app, server);
console.log("Después de setupVite");
  } else {
    serveStatic(app);
  }
console.log("5. después de setupVite");

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
console.log("6. puerto encontrado:", port);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
