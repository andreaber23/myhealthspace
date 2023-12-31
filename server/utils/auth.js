const jwt = require("jsonwebtoken");
const secret = "mysecretsdontmess";
const expiration = "6h"; 

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log("DATA", data);
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Set expiresIn to null to create tokens that don't expire
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
