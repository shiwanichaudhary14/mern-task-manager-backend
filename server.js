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
  origin: "http://localhost:5173",  // Allow all origins temporarily for testing
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, 
  })
);


// ✅ Handle Preflight Requests
app.options("*", cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB Connection with Error Handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  });



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// require("dotenv").config();

// const authRoutes = require("./routes/auth");
// const taskRoutes = require("./routes/task");

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Manually set additional security headers
// app.use(
//   helmet({
//     contentSecurityPolicy: false, // Render already handles this
//     xssFilter: false, // Avoid unnecessary headers
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader("X-Content-Type-Options", "nosniff");
//   res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
//   res.setHeader("Content-Type", "application/json; charset=utf-8");
//   next();
// });


// app.use("/api/auth", authRoutes);  //  Ensure this line is present
// app.use("/api/tasks", taskRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`)))
//   .catch((error) => console.log(error));

