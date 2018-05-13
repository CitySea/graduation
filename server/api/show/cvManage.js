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

//查询所有cv信息
router.post('/showCv', (req, res) => {
  let scTotal = $sql.showCv.cvTotal;
  let cvLimit = $sql.showCv.cvLimit;
  let params = req.body;
  let CvLength;

  conn.query(scTotal, function(err, result) {
    if( !err ){
      CvLength = result.length;
      conn.query(cvLimit, [(params.page - 1) * 10, params.limit * 1], function(err, result) {

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

//查询特定cv信息
router.post('/showCvInfo', (req, res) => {
  let queryCv = $sql.showCv.queryCv;
  let params = req.body;

  conn.query(queryCv, [params.id], function(err, result) {
    if( !err ){
      let date = new Date(result[0].date);
      result[0].date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      jsonWrite(res, {code: '0', msg:'查询成功', data: result});
    }
  });
});
module.exports = router;