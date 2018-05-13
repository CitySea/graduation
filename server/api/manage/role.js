var models = require('../../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../../sqlMap');
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

//返回姓名的角色结果集
router.post('/roleInfoArray', (req, res) => {
  let query = $sql.role.nameRole;
  let params = req.body;

  conn.query(query, [params.name, params.cnname], function(err, result) {
    if( !err ) {
      jsonWrite(res, {code: '11000', msg:'查询成功',  data: result});
    }else{
      console.log(err);
    }
  });
});

//返回角色信息
router.post('/roleInfo', (req, res) => {
  let query = $sql.role.returnRole;
  let params = req.body;

  conn.query(query, [params.id], function(err, result) {
    if( !err ) {
      jsonWrite(res, {code: '11000', msg:'查询成功',  data: result});
    }else{
      console.log(err);
    }
  });
});

//添加角色信息
router.post('/addRole', (req, res) => {
  let query = $sql.role.addRole;
  let params = req.body;

  conn.query(query, [params.name, params.cnname, params.sex, params.detail, params.show_pic, params.small_show_pic], function(err, result) {
    if( !err ) {
      //和bangumi，cv表联动
      let query = $sql.actor.addActor;
      let roleId =  result.insertId;
      conn.query(query, [params.bangumiId, params.cvId, roleId, params.position], function(err, result){
        if( !err ){
          jsonWrite(res, {code: '11000', msg:'角色添加成功', data: result});
        }
      });
    }else{
      console.log(err);
    }
  });
});

//添加关联角色
router.post('/addLinkRole', (req, res) => {
  let query = $sql.actor.addActor;
  let params = req.body;

  conn.query(query, [params.bangumiId, params.cvId, params.roleId, params.position], function(err, result){
    if( !err ){
      jsonWrite(res, {code: '11000', msg:'角色添加成功', data: result});
    }else{
      console.log(err);
    }
  });
});

//修改角色信息
router.post('/editRole', (req, res) => {
  let query = $sql.role.editRole;
  let params = req.body;

  conn.query(query, [params.name, params.cnname, params.sex, params.detail, params.show_pic, params.small_show_pic, params.roleId], function(err, result) {
    if( !err ) {
      let query = $sql.actor.editActor;
      conn.query(query, [params.cvId, params.position, params.bangumiId, params.oldcvId, params.roleId], function(err, result) {
        if( !err ) {
          jsonWrite(res, {code: '11000', msg:'角色修改成功'});
        }else{
          console.log(err);
        }
      });
    }else{
      console.log(err);
    }
  });
});

//删除角色信息
router.post('/delActor', (req, res) => {
  let query = $sql.actor.delActor;
  let params = req.body;

  conn.query(query, [params.bangumiId, params.roleId], function(err, result) {
    if( !err ) {
      jsonWrite(res, {code: '11000', msg: '角色删除成功'});
    }else{
      console.log(err);
    }
  });
});

module.exports = router;