const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: err.name === "TokenExpiredError" ? "Token expired, please log in again" : "Invalid token" });
    }

    req.userId = decoded.id || decoded.sub; // Ensure user ID exists
    next();
  });
};

module.exports = authenticateToken;

