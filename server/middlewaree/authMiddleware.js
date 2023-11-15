const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.query.token
      if (!token) {
        return res.status(403).json({ message: "Користувач не авторизований" });
      }
      const { id: userIdInBrowser, roles: tokenRoles } = jwt.verify(token, secret);


      const userId = req.params.id;


      if(userId === userIdInBrowser) {
        req.tokenRoles = tokenRoles;
        next();
      }else{
        let hasRole = false;

        tokenRoles.forEach((role) => {
          if (roles.includes(role)) {
            hasRole = true;
          }
        });
        if (!hasRole) {
          return res.status(403).json({ message: "У вас немає доступу" });
        }
        req.tokenRoles = tokenRoles;
        next();
      }
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Користувач не авторизований" });
    }
  };
};
