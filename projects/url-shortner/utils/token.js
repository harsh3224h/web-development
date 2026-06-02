import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validations/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const creatUserToken = async (payload) => {
  const tokenValidation = await userTokenSchema.safeParseAsync(payload);
  if (tokenValidation.error) throw new Error(tokenValidation.error.message);
  const token = jwt.sign(tokenValidation.data, JWT_SECRET);
  return token;
};
