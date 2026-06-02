import jwt from "jsonwebtoken";
/** @type {import('express').RequestHandler} */

export function authenticationMiddleware(req, res, next) {
  try {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) return next();

    if (!tokenHeader.startsWith("Bearer")) {
      return res
        .status(400)
        .json({ error: `Authorization header must start with word Beaerer` });
    }

    const token = tokenHeader.split(" ")[1];

    const tokenVerification = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenVerification) return next();

    req.user = { ...tokenVerification };
    console.log(req.user);
    return next();
  } catch (error) {
    return next();
  }
}

export function ensureAuthenticated(req, res, next) {
  if (!req.user)
    return res
      .status(401)
      .json({ error: `You are not authorized to access this resource.` });
  next();
}
