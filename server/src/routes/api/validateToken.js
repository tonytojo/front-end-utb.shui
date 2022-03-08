const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;

  //if we have no token give error message
  if (!token) {
    return res.status(401).json({ error: "No token found. You are not authorize" });
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.SecretKey);

    //Add user from payload
    req.user = decoded;
    next();
  } 
  catch (e) 
  {
     res.status(400).json({error: 'Invalid token'});
  }
}

module.exports = auth;
