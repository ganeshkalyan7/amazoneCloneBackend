const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, "SECRET_key", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        // console.log(req.user);
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
