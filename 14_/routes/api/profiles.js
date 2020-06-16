// @login & register
const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const passport = require("passport");


// @route GET api/profiles/test
// @desc 返回的请求的json数据
// @access public
router.get("/test",(req,res) => {
    res.json({msg:"Profile works"})
})

module.exports = router;