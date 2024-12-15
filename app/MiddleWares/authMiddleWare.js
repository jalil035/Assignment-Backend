import { EncodeToken, DecodeToken } from "../Utility/tokenUtility.js";

export default (req, res, next) => {
  let token = req.cookies.token;
  let decodedToken = DecodeToken(token);
  if (!decodedToken) {
    return res.status(401).send({ status: "failed", message: "Unauthorized" });
  }


  req.headers.user_id = decodedToken.user_id;
  req.headers.NIDNumber = decodedToken.NIDNumber;

  next();
};
