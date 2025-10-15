const { getuser } = require("../service/auth");

async function restricttologgedinuseronly(req, res, next) {
  try {
    const userid = req.cookies?.uid;
    if (!userid) return res.redirect("/login");

    const user = getuser(userid);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { restricttologgedinuseronly };
