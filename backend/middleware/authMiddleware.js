const jwt = require("jsonwebtoken");

const verifyToken = async (req, res,next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader){
      return res.status(401).json({
        success:false,
        message:"token not found",
      })
    }
    const token = authHeader.split(" ")[1];
    // const token = req.cookies.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Token not found",
      });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY_SECRET);
    req.user = {
      id: decoded.id,
      role:decoded.role,
    };
    console.log("req.user : " ,req.user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = { verifyToken };
