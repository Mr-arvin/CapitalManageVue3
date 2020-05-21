// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const User = require("../../models/user");
const keys = require("../../config/keys");


// $route GET api/users/register
// @desc 返回请求的json数据
// @access public
router.post("/register",(req,res) => {
    console.log(req.body);
    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json({email:"邮箱已被注册!"}) 
            }else{
                const avatarUrl = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar:avatarUrl,
                    password:req.body.password
                });

                // 加密
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        if(err) throw  err;

                        newUser.password  = hash;

                        newUser.save()
                               .then(user =>  {
                                    // res.json(user)
                                    // jwt.sign("规则","加密名字","过期时间","箭头函数")
                                    const rule = {id:user._id,name:user.name}
                                    jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
                                        if(err) throw err;
                                        res.json({
                                            success:true,
                                            token:"mrwu" + token,
                                            _id:user._id,
                                            name:user.name,
                                            email:user.email,
                                            avatar:user.avatar,
                                            password:user.password,
                                            date:user.date
                                        })
                                    })
                               })
                               .catch(err => console.log(err))
                    });
                });
            }
        })
})

// $route GET api/users/login
// @desc 返回token jwt passport
// @access public

router.post("/login",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    // 查询数据库 
    User.findOne({email})  //es6 等同于email:email
        .then((user) => {
            if(!user){
                return res.status(404).json({email:"用户不存在!"})
            }else{
                // 密码匹配
                bcrypt.compare(password, user.password)
                      .then(isMatch => {
                          if(isMatch){
                            // jwt.sign("规则","加密名字","过期时间","箭头函数")
                            const rule = {id:user._id,name:user.name}
                            jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
                                if(err) throw err;
                                res.json({
                                    success:true,
                                    token:"mrwu" + token
                                })
                            })
                          }else{
                              return res.status(400).json({psssword:" 密码错误！"})
                          }
                      })
            }
        })
})


module.exports = router;