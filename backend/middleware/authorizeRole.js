const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    console.log(allowedRoles);
    console.log(req.user.role);
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "you are not authorized to access this feature",
      });
    }
    next();
  };
};
module.exports = { authorizeRoles };
