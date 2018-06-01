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

//查询cv信息
router.post('/cvInfo', (req, res) => {
  let query = $sql.cv.queryCv;
  let params = req.body;

  conn.query(query, [params.id], function(err, result) {
    if( !err && result.length !== 0) {
      let date = new Date(result[0].date);
      result[0].date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      jsonWrite(res, {code: '11000', msg:'查询成功',  data: result});
    }
  });
});

//查询staff信息
router.post('/staffInfo', (req, res) => {
  let query = $sql.staff.queryStaff;
  let params = req.body;

  conn.query(query, [params.id], function(err, result) {
    if( !err && result.length !== 0) {
      let date = new Date(result[0].date);
      result[0].date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      jsonWrite(res, {code: '11000', msg:'查询成功',  data: result});
    }
  });
});

//返回所有cv结果集
router.get('/showCv', (req, res) => {
  let scTotal = $sql.cv.cvTotal;
  let cvLimit = $sql.cv.cvLimit;
  let CvLength;

  conn.query(scTotal, function(err, result) {
    if( !err ){
      let nowlimit = req.query.limit * 1
      CvLength = result.length;
      conn.query(cvLimit, [(req.query.page - 1) * nowlimit, nowlimit], function(err, result) {
        for(let i in result){
          let date = new Date(result[i].date);
          result[i].date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        }
        if( !err ){
          jsonWrite(res, {code: '0', msg:'查询成功', count: CvLength, data: result});
        }
      });
    }
  });
});

//返回cv姓名结果集
router.post('/cvInfoArray', (req, res) => {
  let query = $sql.cv.queryCvname;
  let params = req.body;

  conn.query(query, [params.name, params.name], function(err, result) {
    if( !err ) {
      // let date = new Date(result[0].date);
      // result[0].date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      jsonWrite(res, {code: '11000', msg:'查询成功',  data: result});
    }else{
      console.log(err);
    }
  });
});

//返回所有staff结果集
router.get('/showStaff', (req, res) => {
  let scTotal = $sql.staff.staffTotal;
  let cvLimit = $sql.staff.staffLimit;
  let CvLength;

  conn.query(scTotal, function(err, result) {
    if( !err ){
      let nowlimit = req.query.limit * 1;
      CvLength = result.length;
      conn.query(cvLimit, [(req.query.page - 1) * nowlimit, nowlimit], function(err, result) {
        for(let i in result){
          let date = new Date(result[i].date);
          result[i].date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        }
        if( !err ){
          jsonWrite(res, {code: '0', msg:'查询成功', count: CvLength, data: result});
        }
      });
    }
  });
});

//返回所有staff姓名结果集
router.post('/staffInfoArray', (req, res) => {
  let query = $sql.staff.queryStaffname;
  let params = req.body;

  conn.query(query, [params.name, params.name], function(err, result) {
    if( !err ) {
      // let date = new Date(result[0].date);
      // result[0].date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      jsonWrite(res, {code: '11000', msg:'查询成功',  data: result});
    }else{
      console.log(err);
    }
  });
});

//添加人物情报
router.post('/addStaff', (req, res) => {
  let sqlQuery;
  let sqlAdd;
  let params = req.body;

  sqlAdd = (params.cv_job === '0' ? $sql.cv.addCv : $sql.staff.addStaff);
  if(params.cv_job === '0'){
    //声优
    params.date = new Date(params.date).getTime();
    conn.query(sqlAdd, [params.name, params.cnname, params.sex, params.date, params.detail, params.show_pic, params.small_show_pic,], function(err, result) {
      if( !err ){
        jsonWrite(res, {msg: '人物添加成功', code: '11000'});
      }else{
         jsonWrite(res, err);
      }
    });
  }else{
    //staff
    params.date = new Date(params.date).getTime();
    conn.query(sqlAdd, [params.name, params.cnname, params.sex, params.date, params.detail, params.show_pic, params.small_show_pic, params.job], function(err, result) {
      if( !err ){
        jsonWrite(res, {msg: '人物添加成功', code: '11000'});
      }else{
        jsonWrite(res, err);
      }
    });
  }
});

//删除cv情报
router.post('/delCv', (req, res) => {
  let sqlQuery = $sql.cv.delCv;
  let params = req.body;

  conn.query(sqlQuery, [params.id], function(err, result) {
    if( !err ) {
      jsonWrite(res, {msg: '删除成功', code: '11000'});
    }else{
      jsonWrite(res, {msg: '删除失败', code: '11002'});
    }
  });
});

//删除staff情报
router.post('/delStaff', (req, res) => {
  let sqlQuery = $sql.staff.delStaff;
  let params = req.body;

  conn.query(sqlQuery, [params.id], function(err, result) {
    if( !err ) {
      jsonWrite(res, {msg: '删除成功', code: '11000'});
    }else{
      jsonWrite(res, {msg: '删除失败', code: '11002'});
    }
  });
});

//修改cv情报
router.post('/updateCv', (req, res) => {
  let query = $sql.cv.updateCv;
  let params = req.body;

  params.date = new Date(params.date).getTime();
  conn.query(query, [params.name, params.cnname, params.sex, params.date, params.detail, params.show_pic, params.small_show_pic, params.id], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '人物修改成功', code: '11000'});
    }else{
      jsonWrite(res, err);
    }
  });
});

//修改staff情报
router.post('/updateStaff', (req, res) => {
  let query = $sql.staff.updateStaff;
  let params = req.body;

  params.date = new Date(params.date).getTime();
  conn.query(query, [params.name, params.cnname, params.sex, params.date, params.detail, params.show_pic, params.small_show_pic, params.job, params.id], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '人物修改成功', code: '11000'});
    }else{
      jsonWrite(res, err);
    }
  });
});

module.exports = router;