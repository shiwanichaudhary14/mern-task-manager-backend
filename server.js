const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();

app.use(express.json());
app.use(cors());

// Manually set additional security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Render already handles this
    xssFilter: false, // Avoid unnecessary headers
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});


app.use("/api/auth", authRoutes);  //  Ensure this line is present
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error));

