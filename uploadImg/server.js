const express = require("express");
const mongoose =  require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const path = require("path");

//upload dist
app.use(express.static(path.join(__dirname, 'uploads')));

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose.connect(db)
.then(() =>  console.log("MongoDB connected"))
.catch(err => console.log(err));

// 跨域请求
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);

// 引入users.js
const users = require("./routes/api/users");
// 引入profiles.js
const profiles = require("./routes/api/profiles");
// 引入uploads.js
const uploads = require("./routes/api/uploads");

// 使用routes
app.use("/users",users);
app.use("/profiles",profiles);
app.use("/uploads",uploads);

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})