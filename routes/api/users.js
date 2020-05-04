// @login & register
const express = require("express");
const router = express.Router();

// $route GET api/users/login
// @desc 返回请求的json数据
// @access public
router.get("/login",(req,res) =>  {
    res.json({
        msg:"login works"
    })
})


module.exports = router;