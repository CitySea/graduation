let fs = require('fs');
let express = require('express');
let multer = require('multer');
let router = express.Router();
let app = express();

/**
 * 单文件上传
 */
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, '../static/images/cv')
  }, 
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    let fileType;

    switch ( file.mimetype ) {
      case 'image/pjpeg':
        fileType = 'jpg';
        break;
      case 'image/jpeg':
        fileType = 'jpg';
        break;
      case 'image/png':
        fileType = 'png';
        break;
      case 'image/x-png':
        fileType = 'png';
        break;
    }

    cb(null, file.fieldname + Date.now() + "." + fileType);
  }
});  

var storageSmallimg = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, '../static/images/cv/smallimg')
  }, 
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    let fileType;

    switch ( file.mimetype ) {
      case 'image/pjpeg':
        fileType = 'jpg';
        break;
      case 'image/jpeg':
        fileType = 'jpg';
        break;
      case 'image/png':
        fileType = 'png';
        break;
      case 'image/x-png':
        fileType = 'png';
        break;
    }

    cb(null, file.fieldname + Date.now() + "." + fileType);
  }
});  


var uploadSingle = multer({
  storage: storage
});

var uploadSingleSmall = multer({
  storage: storageSmallimg
});

router.post('/uploadImage', uploadSingle.single('logo'), (req, res, next) => {
  let file = req.file;
  let fileInfo = {};

  // 获取文件信息
  fileInfo.mimetype = file.mimetype;
  fileInfo.originalname = file.originalname;
  fileInfo.size = file.size;
  fileInfo.status = '10000';
  fileInfo.path = file.path;

  // 设置响应类型及编码
  res.set({
    'content-type': 'application/json; charset=utf-8'
  });

  res.send(JSON.stringify(fileInfo));
});

router.post('/uploadSmallImage', uploadSingleSmall.single('logo'), (req, res, next) => {
  let file = req.file;
  let fileInfo = {};

  // 获取文件信息
  fileInfo.mimetype = file.mimetype;
  fileInfo.originalname = file.originalname;
  fileInfo.size = file.size;
  fileInfo.status = '10000';
  fileInfo.path = file.path;

  // 设置响应类型及编码
  res.set({
    'content-type': 'application/json; charset=utf-8'
  });

  res.send(JSON.stringify(fileInfo));
});

module.exports = router;