const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://mern-task-manager-frontend-six.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      frameAncestors: ["'self'"],  //  Replaces X-Frame-Options
    },
  },
  hsts: true,
  noSniff: true,                //  Adds x-content-type-options
  hidePoweredBy: true,          //  Removes x-powered-by
  xssFilter: false              //  Removes x-xss-protection
}));

//  Cache-Control Header
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB Connection with Error Handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => console.log(` Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1);
  });

