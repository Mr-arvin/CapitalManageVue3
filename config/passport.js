const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("../config/keys");
const User = require('../models/user');

var opts = {}
//得到token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//设置token时使用的加密名字
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => { //passport就是方法传过来的参数
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => { //回调函数的第二个参数done是一个函数(相当于next)，这个函数第一个参数是err,第二个参数是user。我们可以通过done将user进行返回，这样的话在请求中就把user对象添加进去了
       User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
    }));
}