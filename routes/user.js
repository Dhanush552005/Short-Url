const express=require("express");
const { handlesignup } = require("../controllers/user");
const { handlelogin } = require("../controllers/user");
const router=express.Router();
router.post("/",handlesignup);
router.post("/login",handlelogin);
module.exports=router;


