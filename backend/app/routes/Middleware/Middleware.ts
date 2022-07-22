const jwt = require("jsonwebtoken");
require("dotenv").config();

export const Middleware = (req, res, next) => {
  try {
    const token = req.cookies["jwt"] || "";
    const { userID } = jwt.decode(token, process.env.TOKEN_JWT);

    if (!token || userID != req.cookies["userID"]) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_JWT, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = data;
      next();
    });
  } catch (err) {
    throw err;
  }
};
