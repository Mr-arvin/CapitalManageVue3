const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Upload = require("../../models/Upload");
const passport = require("passport");


var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')  //设定文件上传路径
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        console.log(file.originalname) //上传文件的名字
        console.log(file.mimetype)    //上传文件的类型
        console.log(file.fieldname) // 上传文件的Input的name名
        console.log(file.encoding)    // 编码方式
        var fileFormat = (file.originalname).split("."); //采用分割字符串，来获取文件类型
        console.log(fileFormat)
        var extname = path.extname(file.originalname); //path下自带方法去获取文件类型
        console.log(extname);
        // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]); //更改名字
        cb(null, file.fieldname + '-' + Date.now() +  extname); //更改名字
    }
});
var upload = multer ({storage:storage}) //定制化上传参数

router.post('/file', upload.array('logo',2), function(req, res, next){
    const uploadFields = {};
    uploadFields.type = "image";
    uploadFields.filepath = req.files[0].path;
    new Upload(uploadFields).save().then(upload => {
        res.json({path: upload});
    });

});

module.exports = router;