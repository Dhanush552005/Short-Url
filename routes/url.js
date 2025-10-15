const express=require("express");
const router=express.Router();
const {handlegeneratenewshorturl}=require("../controllers/url");
router.post("/",handlegeneratenewshorturl);
module.exports=router;