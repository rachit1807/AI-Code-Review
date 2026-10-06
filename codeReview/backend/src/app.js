const express = require("express");
const path = require("node:path");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

const app = express();
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

app.use(express.json({ limit: "1mb" }));
app.use(cors());

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.use("/ai", aiRoutes);
app.use("/auth", authRoutes);

app.use(express.static(frontendDist));
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/ai/") || req.path.startsWith("/auth/")) {
    return next();
  }

  return res.sendFile(path.join(frontendDist, "index.html"), (error) => {
    if (error) next(error);
  });
});

module.exports = app;
