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

//添加标签信息
router.post('/addTag', (req, res) => {
  let sqlAdd = $sql.tag.addTag;
  let params = req.body;

  conn.query(sqlAdd, [params.name], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '标签添加成功', code: '11000'});
    } else {
      jsonWrite(res, err);
    }
  });
});

//查看标签信息
router.get('/showTag', (req, res) => {
  let query = $sql.tag.showTag;

  conn.query(query, function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '获取标签数据成功', code: '11000', data: result});
    } else {
      jsonWrite(res, err);
    }
  });
});

//修改标签信息
router.post('/editTag', (req, res) => {
  let query = $sql.tag.editTag;
  let params = req.body;

  conn.query(query, [params.name, params.id], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '标签修改成功', code: '11000'});
    } else {
      jsonWrite(res, err);
    }
  });
});

//删除标签
router.post('/delTag', (req, res) => {
  let query = $sql.tag.delTag;
  let params = req.body;

  conn.query(query, [params.id], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '标签删除成功', code: '11000'});
    } else {
      jsonWrite(res, err);
    }
  });
});

//添加番剧基本信息
router.post('/addBangumiBaseInfo', (req, res) => {
  let query = $sql.bangumi.addBangumi;
  let params = req.body;

  params.start_date = new Date(params.start_date).getTime();
  conn.query(query, [params.name, params.cnname, params.progress_total, params.start_date, params.send_date], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '番剧添加成功', code: '11000', id: result.insertId});
    }else{
      console.log(err);
    }
  });
});

//修改番剧基本信息
router.post('/editBangumiBaseInfo', (req, res) => {
  let query = $sql.bangumi.editBangumi;
  let params = req.body;

  params.start_date = new Date(params.start_date).getTime();
  conn.query(query, [params.name, params.cnname, params.progress_total, params.start_date, params.send_date, params.id], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '番剧修改成功', code: '11000'});
    }else{
      console.log(err);
    }
  });
});

//返回番剧基本信息
router.post('/showBaseInfo', (req, res) => {
  let queryBase = $sql.bangumi.queryBangumi;
  let queryRole = $sql.bangumi.allBangumiInfo;
  let params = req.body;
  let baseData = [];
  let roleData = [];

  conn.query(queryBase, [params.id], function(err, result) {
    if( !err ){
      let date = new Date(result[0].start_date);
      result[0].start_date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      // jsonWrite(res, {msg: '查询成功', code: '11000', data: result});
      baseData = result;
      conn.query(queryRole, [params.id], function(err, result) {
        if(! err ){
          roleData = result;
          jsonWrite(res, {msg: '获取番剧相关信息成功', code: '11000', data: {base: baseData, role: roleData}});
        }else{
          console.log(err);
        }
      });
    }else{
      console.log(err);
    }
  });
});

//返回所有番剧信息
router.get('/showBangumi', (req, res) => {
  let total = $sql.bangumi.bangumiTotal;
  let limit = $sql.bangumi.bangumiLimit;
  let length;

  conn.query(total, function(err, result) {
    if( !err ){
      let nowlimit = req.query.limit * 1;
      length = result.length;
      conn.query(limit, [(req.query.page - 1) * nowlimit, nowlimit], function(err, result) {
        if( !err ){
          jsonWrite(res, {code: '0', msg:'查询成功', count: length, data: result});
        }else{
          console.log(err);
        }
      });
    }
  });
});

//添加集数信息
router.post('/addEpisode', (req, res) => {
  let query = $sql.episode.addEpisode;
  let params = req.body;

  params.broadcast_time = new Date(params.broadcast_time).getTime();
  conn.query(query, [params.bangumiId, params.epi_no, params.name, params.cnname, params.duration, params.broadcast_time, params.detail], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '集数添加成功', code: '11000', id: result.insertId});
    }else{
      console.log(err);
    }
  });
});


//返回所有集数信息
router.get('/showEpisode', (req, res) => {
  let total = $sql.episode.episodeTotal;
  let limit = $sql.episode.episodeLimit;
  let length;

  conn.query(total, [req.query.id], function(err, result) {
    if( !err ){
      let nowlimit = req.query.limit * 1;
      let id = req.query.id *1;
      length = result.length;
      conn.query(limit, [id, (req.query.page - 1) * nowlimit, nowlimit], function(err, result) {
        if( !err ){
          for(let i in result){
            let date = new Date(result[i].broadcast_time);
            result[i].broadcast_time = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
          }
          jsonWrite(res, {code: '0', msg:'查询成功', count: length, data: result});
        }else{
          console.log(err);
        }
      });
    }else{
      console.log(err);
    }
  });
});

//删除集数
router.post('/delEpisode', (req, res) => {
  let query = $sql.episode.delEpisode;
  let params = req.body;

  conn.query(query, [params.id, params.epi_no], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '标签删除成功', code: '11000'});
    } else {
      jsonWrite(res, err);
    }
  });
});

//返回特定集数信息
router.post('/getEpisodeInfo', (req, res) => {
  let query = $sql.episode.queryEpisode;
  let params = req.body;

  conn.query(query, [params.id, params.epi_no], function(err, result) {
    if( !err ){
      let date = new Date(result[0].broadcast_time);
      result[0].broadcast_time = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      jsonWrite(res, {msg: '查询信息成功', code: '11000', data: result});
    } else {
      jsonWrite(res, err);
    }
  });
});

//修改集数信息

router.post('/editEpisode', (req, res) => {
  let query = $sql.episode.editEpisode;
  let params = req.body;

  params.broadcast_time = new Date(params.broadcast_time).getTime();
  conn.query(query, [params.name, params.cnname, params.duration, params.broadcast_time, params.detail, params.bangumiId, params.epi_no], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '修改信息成功', code: '11000', data: result});
    } else {
      jsonWrite(res, err);
    }
  });
});
module.exports = router;