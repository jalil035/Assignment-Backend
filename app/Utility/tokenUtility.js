import { JWT_SECRET } from "../config/confit.js";

import jwt from "jsonwebtoken";

export const EncodeToken = (user_id, NIDNumber) => {

  const KEY = JWT_SECRET;
  const JWT_EXPIRATION_TIME = "1h";
  const EXPIRE = { expiresIn: JWT_EXPIRATION_TIME };
  const PAYLOAD = { NIDNumber, user_id };

  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const DecodeToken = (token) => {

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    return decode;
  } catch (e) {
    return null;
  }
};
