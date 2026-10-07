require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed; starting the app without account storage");
    console.error(err.message);
  });

// Keep the app and its health endpoint available even if MongoDB is unreachable.
// Code review itself does not use MongoDB; only registration and login do.
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
