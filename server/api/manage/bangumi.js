var models = require('../../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../../sqlMap');
var $consts = require('../../const');
var app = express();
var async = require('async');

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

var arrIndex = function(arr, val) {
  for(let i = 0; i < arr.length; i++){
    if(arr[i].id == val.tag_id){
      return i;
    }
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
  let delGTag = $sql.bangumi.delGTag;
  let query   = $sql.tag.delTag;
  let params  = req.body;

  conn.query(delGTag, [params.id], function(err, result) {
    if( !err ){
        conn.query(query, [params.id], function(err, result) {
        if( !err ){
          jsonWrite(res, {msg: '标签删除成功', code: '11000'});
        } else {
          jsonWrite(res, err);
        }
      });
    }
  });
 
});

//添加番剧基本信息
router.post('/addBangumiBaseInfo', (req, res) => {
  let query = $sql.bangumi.addBangumi;
  let params = req.body;
  let startDate;
  let monthTemp;
  let _month;
  let _year;

  startDate = new Date(params.start_date);
  monthTemp = startDate.getMonth() + 1;
  //季番计算  
  if(monthTemp <=3){
    _month = 1;
  }else if(monthTemp > 3 && monthTemp <= 6){
    _month = 4;
  }else if(monthTemp > 6 && monthTemp <= 9){
    _month = 7;
  }else{
    _month = 10;
  }
  //年份计算
  _year = startDate.getFullYear();
  params.start_date = startDate.getTime();
  conn.query(query, [params.name, params.cnname, params.addr, params.progress_total, params.start_date, params.send_date, _year, _month], function(err, result) {
    if( !err ){
      let id = result.insertId
      let addhot = $sql.hot.addInfo;

      conn.query(addhot, [id, 0, 0, new Date().getTime()], function(err, result){
        if(!err && result.length !=0 ){
          jsonWrite(res, {msg: '番剧添加成功', code: '11000', id: id});
        }else{
          console.log(err);
        }
      });
    }else{
      console.log(err);
    }
  });
});

//修改番剧基本信息
router.post('/editBangumiBaseInfo', (req, res) => {
  let query = $sql.bangumi.editBangumi;
  let params = req.body;
  let startDate;
  let monthTemp;
  let _month;
  let _year;

  startDate = new Date(params.start_date);
  startDate = new Date(params.start_date);
  monthTemp = startDate.getMonth() + 1;
  //季番计算  
  if(monthTemp <=3){
    _month = 1;
  }else if(monthTemp > 3 && monthTemp <= 6){
    _month = 4;
  }else if(monthTemp > 6 && monthTemp <= 9){
    _month = 7;
  }else{
    _month = 10;
  }
  //年份计算
  _year = startDate.getFullYear();
  params.start_date = new Date(params.start_date).getTime();
  conn.query(query, [params.name, params.cnname, params.addr, params.progress_total, params.start_date, params.send_date, params.show_pic, params.small_show_pic, _year, _month, params.id], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '番剧修改成功', code: '11000'});
    }else{
      console.log(err);
    }
  });
});

//返回番剧基本信息
router.post('/showBaseInfo', (req, res) => {
  let queryBase    = $sql.bangumi.queryBangumi;
  let queryRole    = $sql.bangumi.allBangumiInfo;
  let episodeTotal = $sql.episode.episodeTotal;
  let journalTotal = $sql.share.allShare;
  let params       = req.body;
  let baseData     = [];
  let roleData     = [];
  let episodeData  = [];
  let journalData  = [];

  conn.query(queryBase, [params.id], function(err, result) {
    if( !err && result.length !== 0 ){
      let date = new Date(result[0].start_date);
      result[0].start_date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      // jsonWrite(res, {msg: '查询成功', code: '11000', data: result});
      baseData = result;
      conn.query(queryRole, [params.id], function(err, result) {
        if( !err ){
          roleData = result;
          conn.query(episodeTotal, [params.id], function(err,result){
            for(let i = 0; i < result.length; i++){
              let date = new Date(result[i].broadcast_time);
              result[i].broadcast_time = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            }
            episodeData = result;
            if( !err ){
              conn.query(journalTotal, [params.id], function(err, result){
                if(!err){
                  for(let i = 0; i < result.length; i++ ){
                    let date = new Date(result[i].time);
                    let regx = /<[^>]*>|<\/[^>]*>/gm;
                    result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                    result[i].content = result[i].content.replace(regx, "").replace(/&nbsp; /g, "").replace(/&nbsp;\s*/g, "");
                  }
                }
                jsonWrite(res, {msg: '获取番剧相关信息成功', code: '11000', data: {base: baseData, role: roleData, episode: episodeData, journal: result}});
              })
              
            }
          });
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
  let sql   = 'select * from bangumi ';
  let data  = [];
  let nowlimit = req.query.limit * 1;

  if(req.query.tagsIdx != 0){//多表连接
    sql += 'inner join type on bangumi.id = type.bangumi_id where type.tag_id = ? ';
    data.push(req.query.tagsIdx * 1);
  }
  if(req.query.areaIdx != 0){
    if(sql.indexOf('where') > -1){
      sql += 'and bangumi.addr = ? ';
    }else {
      sql += 'where bangumi.addr = ? ';
    }
    data.push(req.query.areaIdx-1);
  }
  if(req.query.timeIdx != 0){
    if(sql.indexOf('where') > -1){
      sql += 'and bangumi.year = ? ';
    }else {
      sql += 'where bangumi.year = ? ';
    }
    data.push(2019-req.query.timeIdx);
  }
  if(req.query.jiduIdx != 0){
    if(sql.indexOf('where') > -1){
      sql += 'and bangumi.season = ? ';
    }else {
      sql += 'where bangumi.season = ? ';
    }
    data.push((req.query.jiduIdx-1) * 3 + 1)
  }

  data.push((req.query.page - 1) * nowlimit);
  data.push(nowlimit);
  conn.query(sql, data, function(err, result) {
    if( !err ){
      length = result.length;
      sql += 'limit ?, ?';
      conn.query(sql, data, function(err, result) {
        if( !err ){
          jsonWrite(res, {code: '0', msg:'查询成功', count: length, data: result});
        }else{
          console.log(err);
        }
      });
    }
  });
});

router.get('/showBangumiMa', (req, res) => {
  let total = $sql.bangumi.bangumiTotal;
  let limit = $sql.bangumi.bangumiLimit;
  let length;
  let data  = [];
  let nowlimit = req.query.limit * 1;


  data.push((req.query.page - 1) * nowlimit);
  data.push(nowlimit);
  conn.query(total, function(err, result) {
    if( !err ){
      length = result.length;
      conn.query(limit, data, function(err, result) {
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
            result[i].broadcast_time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
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

//添加staff人物信息
router.post('/saveStaffInfo', (req, res) => {
  let saveInfo  = $sql.bangumi.saveStaffInfo;
  let params = req.body;
  let nameInfoArr;
  let idInfoArr;
  let info = [];
  let idArr = [];
  let staff = {};

  //staff数据处理 -> 
  for(let i in params.name){
    let data = {};
    data[params.name[i].name] = params.name[i].value;
    data.id = params.id[i].id;
    data.name = params.name[i].name;
    info.push(data);
  }

  for(let i = 0; i < info.length; i++ ){
    if(info[i].id !==''){
      let arr  = [];
      let nameArr = [];

      arr = info[i].id.split(',');//id数组化
      nameArr = info[i].name.split(',');//姓名数组化
      for(let j in arr){
        let data = {};

        if(idArr.indexOf(arr[j]) < 0){
          idArr.push(arr[j]);
          data.id = arr[j];
          data.name = [];
          data.name.push($consts.staffName[nameArr[0]]);
          staff[arr[j]] = data;
        }else{
          staff[info[i].id].name.push($consts.staffName[nameArr[0]]);
        }
      }
    }
  }

  info = JSON.stringify(info);
  conn.query(saveInfo, [info, params.bangumiId], function(err, result){
    if( !err ){
      let selStaff = $sql.staff.queryStaff;
      for(let j in staff){
        // (function(i){

        // })(i);
        conn.query(selStaff, [staff[j].id], function(err, result){
          if( !err ){
            let jobArr = result[0].job.split(',');
            let flag = false;

            for(let k = 0; k < jobArr.length; k++){
              for(let l = 0; l < staff[j].name.length; l++){
                if(jobArr[k] == staff[j].name[l]){//已存在职业
                  flag = true;
                }
              }
              if( !flag ){
                staff[j].name.push(jobArr[k]);
              }
            }
            let str = '';
            for(let m =0; m < staff[j].name.length; m++){
              str += staff[j].name[m];
              if(m < staff[j].name.length - 1){
                str += ','
              }
            }
            let upStaff = $sql.staff.upStaff;
            conn.query(upStaff, [str, staff[j].id], function(err, result){});
          }
        }); 
      }
      jsonWrite(res, {msg: '修改信息成功', code: '11000'});
    }else {
      jsonWrite(res, err);
    }
  });
});

//返回未添加标签信息
router.post('/showNaddTag', (req, res) => {
  let showTag = $sql.bangumi.showTag;
  let allTag  = $sql.tag.showTag;
  let params  = req.body;

  conn.query(allTag, function(err, result){
    let alltagArr = result;
    if( !err && result.length !=0 ){
      conn.query(showTag, [params.id], function(err, result){
        if( !err ){
          if(result.length !=0 ){
            for(let i = 0; i < result.length; i++){
              let index = arrIndex(alltagArr,result[i]);

              alltagArr.splice(index, 1);
            }
          }
          jsonWrite(res, {msg: '获取标签数据成功', code: '11000', data: alltagArr});
        }
      });
    }
  })
});

//返回已添加标签信息
router.post('/showaddTag', (req, res) => {
  let showTag = $sql.bangumi.showTag;
  let allTag  = $sql.tag.showTag;
  let params  = req.body;

  conn.query(allTag, function(err, result){
    let alltagArr = result;
    let resArr    = [];
    if( !err && result.length !=0 ){
      conn.query(showTag, [params.id], function(err, result){
        if( !err ){
          if(result.length !=0 ){
            for(let i = 0; i < result.length; i++){
              let index = arrIndex(alltagArr,result[i]);

              resArr.push(alltagArr.splice(index, 1)[0]);
            }
            jsonWrite(res, {msg: '获取已添加标签信息成功', code: '11000', data: resArr});
          }
        }
      });
    }
  })
});

//添加标签信息
router.post('/addBanTag', (req, res) => {
  let addTag = $sql.bangumi.addTag;
  let params = req.body;

  for(let i = 0; i < params.arrId.length; i++){
    conn.query(addTag, [params.arrId[i], params.id], function(err, result){
      if( !err && i == params.arrId.length - 1 ){
        jsonWrite(res, {msg: '添加对应标签成功', code: '11000'});
      }
    });
  }
});

//删除标签信息
router.post('/delBanTag', (req, res) => {
  let delTag = $sql.bangumi.delTag;
  let params = req.body;

  conn.query(delTag, [params.tag_id, params.id], function(err, result){
    if( !err ){
      jsonWrite(res, {msg: '删除标签成功', code: '11000'});
    }
  });
});

//删除番剧信息
router.post('/delBangumi', (req, res) => {
  let params = req.body;
  let sqls = [$sql.bangumi.delBangumiType, $sql.bangumi.delBangumiActor, $sql.bangumi.delBangumiEpisode, $sql.bangumi.delBangumiJob, $sql.share.delBanShare, $sql.follow.delFollow, $sql.bangumi.delBangumi];
  async.eachSeries(sqls, function(item, callback){//每条sql执行成功才会执行下一条
    conn.query(item, [params.id],  function(err, result){
      if( !err){
        callback();
      }else{ 
        callback(err);
      }
    });
  }, function(err){
    if( !err){
      jsonWrite(res, {msg: '删除番剧成功', code: '11000'});
    }
  });
});

//评分
router.post('/saveScore', (req, res) => {
  let queryBase  = $sql.follow.queryBase;
  let addBase    = $sql.follow.addBase;
  let editBase   = $sql.follow.editBase;
  let userSession = req.session;
  let params     = req.body;

  //用户是否登录
  if( userSession.userName ){
    let userId = userSession.userId;
    conn.query(queryBase, [userId, params.id], function(err, result){
      if( !err ){
        if(result.length == 0){
          //首次添加评分
          conn.query(addBase, [userId, params.id, params.score], function(err, result){
            if( !err && result.length !=0 ){
              
              //存入热度表
              let saveHot = $sql.hot.addInfo;
              let allHot  = $sql.hot.allInfo;
              conn.query(allHot, [params.id, 0], function(err, result){
                if(!err){
                  let hot;
                  
                  if(result.length !=0 ){
                    hot = result[0].hotnum + 1;
                  }else{
                    hot = 1;
                  }
                  conn.query(saveHot, [params.id, 0, hot, new Date().getTime()],function(err,result){
                    if( !err && result.length !=0 ){
                      //事件更新
                      let addEvent = $sql.event.addInfo;
                      conn.query(addEvent, [userId, userSession.userName, 0, 0, params.name, params.id, new Date().getTime()], function(err, result){
                        if(!err && result.length !=0 ){
                          jsonWrite(res, {msg: '收藏成功', code: '11000'});
                        }else{
                          console.log(err);
                        }
                      })
                    }
                  });
                }else{
                  console.log(err);
                }
              })
            }
          })
        }
      }
    });
  }else{
    jsonWrite(res, {msg: '用户未登录', code: '11005'});
  }
});

//查看用户是否收藏番剧
router.post('/ShowStars', (req, res) => {
  let queryBase   = $sql.follow.queryBase;
  let userSession = req.session;
  let params      = req.body;

  if( userSession.userName ){
    let userId = userSession.userId;

     conn.query(queryBase, [userId, params.id], function(err, result){
      if( !err && result.length == 0 ){
        jsonWrite(res, {msg: '用户未收藏该动画', code: '11006'})
      }else if ( !err && result.length !=0 ){
        let data = result[0].score;
        jsonWrite(res, {msg: '用户已收藏该动画', code: '11000', data: data});
      }
    });
  }else{
    jsonWrite(res, {msg: '用户未登录', code: '11005'});
  }
 
});

//取消用户收藏
router.post('/delScore', (req, res) => {
  let delBase     = $sql.follow.delBase;
  let userSession = req.session;
  let params      = req.body;

  if( userSession.userName ){
    let userId = userSession.userId;

    conn.query(delBase, [userId, params.id], function(err, result){
      if( !err ){
        jsonWrite(res, {msg: '已取消该动画收藏', code: '11000'})
      }else{
        console.log(result);
      }
    });
  }
});

//番剧评分详情
router.post('/showScoreDetail', (req, res) => {
  let scoreDetail = $sql.follow.scoreDetail;
  let params      = req.body;
  let arr         = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let score       = 0;
  let num         = 0;

  conn.query(scoreDetail, [params.id], function(err, result){
    if( !err ){
      if(result.length == 0){
        score = 0;
        num = 0;
        jsonWrite(res, {msg: '获取分数详情成功', code: '11000', data: {detail: arr, totalScore: score, num: num}});
      }else{
        for(let i = 0; i < result.length; i++){
          arr[result[i].score - 1]++;
          score += result[i].score;
          if(i == result.length -1){
            score = score/(i + 1);
            num = i + 1;
          }
        }
        jsonWrite(res, {msg: '获取分数详情成功', code: '11000', data: {detail: arr, totalScore: score, num: num}});
      }
    }else {
      console.log(err);
    }
  });
});

//用户是否登录
router.post('/isLogin', (req, res) => {
  let params = req.body;
  let userSession = req.session;
  let sql = 'select id from user where name = ?';

  if( userSession.userName ){
    conn.query(sql, [userSession.userName[0]], function(err, result){
      if( !err && result.length != 0){
        jsonWrite(res, {msg: '已在线', code: '11000', data: result});
      }else{
        console.log(err);
      }
    })
  }else{
    jsonWrite(res, {msg: '未在线', code: '11006'});
  }
})

//设置热度
router.post('/setHot', (req, res) => {
  let params     = req.body;
  let allBanInfo = $sql.hot.allBanInfo;
  let addInfo    = $sql.hot.addInfo;

  conn.query(allBanInfo, [params.id, 0], function(err, result){
    let hot = result[0].hotnum + 0.001;
    conn.query(addInfo, [params.id, 0, hot, new Date().getTime()], function(err, result){
      if(!err && result.length !=0){
        jsonWrite(res, {msg: 'success', code: '11000'});
      }
    });
  });
});
module.exports = router;