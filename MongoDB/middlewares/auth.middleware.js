import jwt from "jsonwebtoken";
/** @type {import("express").RequestHandler} */

export const authMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) return next();

    if (!tokenHeader.startsWith("Bearer "))
      return res
        .status(400)
        .json({ error: `Authorization header must start with word Bearer` });

    const token = tokenHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
    next();
  }
};

export const ensureAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ error: "You must be authenticated to access this resource." });
  }

  return next();
};
