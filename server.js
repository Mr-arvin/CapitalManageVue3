const express = require("express");
const  mongoose =  require("mongoose");
const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// 引入users.js
const users = require("./routes/api/users")

// Connect to mongodb
mongoose.connect(db)
.then(() =>  console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/",(req,res)=>{
    res.send("hello world!")
})

// 使用routes
app.use("/users",users);

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})