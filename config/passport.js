const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");
const user = require('../models/user');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => { //passport就是方法传过来的参数
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
       console.log(jwt_payload)
       user.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null,false);
                }
                return done(null,false);
            })

    }));
}