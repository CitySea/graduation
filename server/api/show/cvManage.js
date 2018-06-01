var models = require('../../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');
var $sql = require('../../sqlMap');
var $consts = require('../../const');
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

//查询所有cv信息
router.post('/showCv', (req, res) => {
  let scTotal = $sql.showCv.cvTotal;
  let cvLimit = $sql.showCv.cvLimit;
  let params = req.body;
  let CvLength;

  conn.query(scTotal, function(err, result) {
    if( !err ){
      let nowlimit = params.limit * 1;
      CvLength = result.length;
      conn.query(cvLimit, [(params.page - 1) * nowlimit, nowlimit], function(err, result) {

        for(let i in result){
          let date = new Date(result[i].date);
          result[i].date = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        }
        if( !err ){
          jsonWrite(res, {code: '0', msg:'查询成功', count: CvLength, data: result});
        }
      });
    }
  });
});

//查询所有cv信息
router.post('/showStaff', (req, res) => {
  let scTotal = $sql.staff.staffTotal;
  let cvLimit = $sql.staff.staffLimit;
  let params = req.body;
  let CvLength;

  conn.query(scTotal, function(err, result) {
    if( !err ){
      let nowlimit = params.limit * 1;
      CvLength = result.length;
      conn.query(cvLimit, [(params.page - 1) * nowlimit, nowlimit], function(err, result) {
        if( !err && result.length !== 0){
          for(let i in result){
            let date = new Date(result[i].date);
            result[i].date = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
          }
          jsonWrite(res, {code: '0', msg:'查询成功', count: CvLength, data: result});
        }else{
          jsonWrite(res, {code: '0', msg:'查询成功', count: CvLength, data: []});
        }
      });
    }
  });
});

//查询特定cv信息
router.post('/showCvInfo', (req, res) => {
  let queryCv = $sql.showCv.queryCv;
  let queryCvActor = $sql.actor.queryCv;
  let queryActorDet = $sql.role.returnRole;
  let queryBangumi  = $sql.bangumi.queryBangumi;
  let params = req.body;
  let baseInfo = {};
  let roleInfo = [];
  let sqls = [];
  let sqlss = [];

  conn.query(queryCv, [params.id], function(err, result) {
    if( !err && result.length !== 0){
      let date = new Date(result[0].date);

      result[0].date = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
      baseInfo = result[0];
      conn.query(queryCvActor, [params.id], function(err, result){
        if( !err ){
          jsonWrite(res, {code: '0', msg:'查询成功', data: {base: baseInfo, role: result}});
        }else{
          console.log(err);
        }
      })
    }
  });
});

//查询特定staff信息
router.post('/showStaffInfo', (req, res) => {
  let queryStaff = $sql.staff.queryStaff;
  let queryStaffBan = $sql.bangumi.queryStaff;
  let params = req.body;
  let staffInfo  = [];
  let baseInfo   = {};
  conn.query(queryStaff, [params.id], function(err, result) {
    if( !err && result.length !== 0){
      let date = new Date(result[0].date);
      let staffname = result[0].name;

      result[0].date = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
      baseInfo = result[0];
      conn.query(queryStaffBan, [staffname], function(err, result){
        if( !err ){
          for(let i in result){
            let obj = JSON.parse(result[i].staff_total);
            let data = {};

            data.job = [];
            data.bangumiId = result[i].id;
            data.bangumiName = result[i].name;
            data.bangumiCnname = result[i].cnname;
            data.small_show_pic = result[i].small_show_pic;
            for(let j in obj){
              if(obj[j].id != ''){
                if(obj[j][obj[j].name].indexOf(staffname) > -1){
                  data.job.push($consts.staffName[obj[j].name]);
                }
              }
            }
            staffInfo.push(data);
          }
          jsonWrite(res, {code: '0', msg:'查询成功', data: {base: baseInfo, staff: staffInfo}});
        }else{
          console.log(err);
        }
      })
      
    }
  });
});
module.exports = router;