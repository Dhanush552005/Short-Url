const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "default_secret_key";

function setuser(user) {
  return jwt.sign(
    { _id: user.id, email: user.email },
    secret,
    { expiresIn: "1h" }
  );
}

function getuser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return null;
  }
}

module.exports = { setuser, getuser };
