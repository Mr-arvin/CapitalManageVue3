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

// @route POST api/profiles/add
// @desc 创建信息接口
// @access private（类型）
router.post("/add",passport.authenticate('jwt',{session: false}),(req,res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profile => {
        res.json(profile)
    })

})

// @route GET api/profiles
// @desc 获取所有信息
// @access private（类型）

 router.get("/",passport.authenticate('jwt',{session: false}),(req,res)  => {
     console.log(req)
     Profile.find()
         .then(profile => {
             if(!profile) {
                 res.status(404).json('没有任何内容');
             }else {
                res.json(profile)   
             }
         })
         .catch(err => res.status(404).json(err));     
 })

 // @route GET api/profiles/:id
// @desc 获取单个信息
// @access private（类型）

router.get("/:id",passport.authenticate('jwt',{session: false}),(req,res)  => {
    console.log(req)
    Profile.findOne({_id:req.params.id})
        .then(profile => {
            if(!profile) {
                res.status(404).json('没有任何内容');
            }else {
               res.json(profile);
            }
        })
        .catch(err => res.status(404).json(err));     
})

// @route post api/profiles/edit/:id
// @desc 编辑信息接口
// @access private（类型）

router.post("/edit/:id",passport.authenticate('jwt',{session: false}),(req,res)  => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set: profileFields}, //更新$set
        {new: true} //新的东西
    ).then(profile => res.json(profile))
})

// @route GET api/profiles/delete/:id
// @desc 删除信息接口
// @access private（类型）

router.delete("/delete/:id",passport.authenticate('jwt',{session: false}),(req,res)  => {
    Profile.findByIdAndRemove(
        {_id: req.params.id}
    ).then(profile => {
        // console.log(profile)
        res.json(profile)
        // profile.save().then(profile => res.json(profile)) ;
    }).catch(err => res.status(404).json("删除失败！"))
    
})

module.exports = router;