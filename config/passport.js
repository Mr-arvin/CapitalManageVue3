const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("../config/keys");
const User = require('../models/user');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => { //passport就是方法传过来的参数
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => { //done是回掉函数
       console.log(jwt_payload)
       User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
    }));
}