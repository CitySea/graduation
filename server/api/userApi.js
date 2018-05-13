var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var app = express();

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

//用户添加接口
router.post('/addUser', (req, res) => {
  let sqlAdd = $sql.user.add;
  let sqlQuery = $sql.user.query;
  let params = req.body;

  conn.query(sqlQuery, [params.userName], function(err, result) {
    if ( result.length == 0 ) {
      conn.query(sqlAdd, [params.userName, params.userPwd], function(err, result) {
        if (err) {
          jsonWrite(res, err);
        }
        if (result) {
          let tempResult = {
            msg: '注册成功',
            code: '10000'
          }
          jsonWrite(res, tempResult);
        }
      });
    } else {
      let tempResult = {
        msg: '用户名已存在',
        code: '10001'
      }
      jsonWrite(res, tempResult);
    }
    if (err) {
      jsonWrite(res, err);
    }

  });
});


//用户登录接口
router.post('/userLogin', (req, res) => {
  let sqlAdd = $sql.user.add;
  let sqlQuery = $sql.user.query;
  let params = req.body;
  let userSession = req.session;

  conn.query(sqlQuery, [params.userName], function(err, result) {
    if ( result.length !== 0 ) {
      //登录
     if( result[0].psw == params.userPwd ){
      //存入session
      userSession.userName = [params.userName];

      jsonWrite(res, {msg: '登录成功', code: '10000'});
     }else{
      //密码错误
      jsonWrite(res, {msg: '密码错误', code: '10002'});
     }
    } 
    console.log(result);
    if (err) {

      jsonWrite(res, err);
    }
  });
})

//用户退出接口
router.post("/logout", (req, res) => {
  let userSession = req.session;

  //销毁session
  userSession.destroy();
  jsonWrite(res, {msg: '退出登录', code: '10000'});
})

//自动登录
router.post('/autoLogin', (req, res) => {
  let params = req.body;
  let userSession = req.session;

  if( userSession.userName ){
    jsonWrite(res, {msg: '自动登录成功', code: '10000'});
  }else{
    userSession.destroy();
  }
})

module.exports = router;