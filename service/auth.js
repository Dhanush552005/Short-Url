const jwt=require("jsonwebtoken");
const secret="Dhanush@552005";
 function setuser(user) {
    return jwt.sign({
        _id:user.id,
        email:user.email,
    },secret);
}

function getuser(token) {
    if(!token) return null;
    return jwt.verify(token,secret);
}
module.exports={
    setuser,
    getuser,
}