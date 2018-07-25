var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var async = require('async');
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
  let sqlAdd   = $sql.user.add;
  let sqlQuery = $sql.user.query;
  let params   = req.body;
  let imgUrl   = '/static/images/header-logo.png';

  conn.query(sqlQuery, [params.userName], function(err, result) {
    if ( result.length == 0 ) {
      conn.query(sqlAdd, [params.userName, params.userPwd, new Date().getTime(), imgUrl], function(err, result) {
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
      userSession.userId   = result[0].id;
      jsonWrite(res, {msg: '登录成功', code: '10000'});
     }else{
      //密码错误
      jsonWrite(res, {msg: '密码错误', code: '10002'});
     }
    } 
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
  let sql = 'select id, profile from user where name = ?'

  if( userSession.userName ){
    conn.query(sql, [userSession.userName[0]], function(err, result){
      if( !err ){
        if( result.length != 0){
          jsonWrite(res, {msg: '自动登录成功', code: '10000', data: result});
        }else{
          jsonWrite(res, {msg: '用户未登录', code: '10001', data: []});
        }
      }else{
        console.log(err);
      }
    })
  }else{
    jsonWrite(res, {msg: '用户未登录', code: '10001'});
  }
  // else{
  //   userSession.destroy();
  // }
});

//获取用户基本信息
router.post('/getUserInfo', (req, res) => {
  let getInfo = $sql.user.getInfo;
  let params  = req.body;

  conn.query(getInfo, [params.id], function(err, result){
    if( !err && result.length != 0){
      jsonWrite(res, {msg: '获取用户信息', code: '10000', data: result});
    }else{
      console.log(err);
    }
  });
});

//更新用户信息
router.post("/updateUserInfo", (req, res) => {
  let updateInfo = $sql.user.updateInfo;
  let data      = req.body;

  conn.query(updateInfo, [data.data.userName, data.data.sex,data.data.mail, data.data.profile, data.id], function(err, result){
    if( !err && result.length != 0){
      jsonWrite(res, {msg: '更新用户信息成功', code: '10000'});
    }else{
      console.log(err);
    }
  });
});

//获取用户收藏信息
router.post("/userStars", (req, res) => {
  let userStars = $sql.follow.userStars;
  let bookuserStars = $sql.bookfollow.userStars;
  let params    = req.body;
  let ban = [];
  let book = [];

  conn.query(userStars, [params.id], function(err, result){
    if( !err ){
      if( result.length != 0 ){
        ban = result;
      }else{
        ban = [];
      }
      conn.query(bookuserStars, [params.id], function(err, result){
        if(!err){
          if(result.length != 0){
            book = result;
          }else{
            book = [];
          }
          jsonWrite(res, {msg: '获取用户收藏信息成功', code: '10000', data: {bangumi: ban, book: book, bangumilen: ban.length, booklen: book.length}});
        }
      })
    }else{
      console.log(err);
    }
  });
});

//获取日志管理信息
router.post('/info', (req, res) => {
  let sqls   = [$sql.user.banInfo, $sql.user.bookInfo];
  let params = req.body;

  conn.query(sqls[params.type], [params.id], function(err, result){
    if( !err && result.length !=0 ){
      jsonWrite(res, {msg: '获取信息成功', code: '11000', info: result[0]});
    }else{
      console.log(err);
    }
  }); 
});

//添加用户日志
router.post('/addShare', (req, res) => {
  let addArr       = [$sql.share.addShare, $sql.bookshare.addShare];
  let query        = [$sql.bangumi.queryBangumi, $sql.book.queryBook]
  let userSession  = req.session;
  let params       = req.body;
  let msgErr       = ['该动画不存在', '该书籍不存在'];

  if( userSession.userId ){
    conn.query(query[params.type], [params.id], function(err, result){
      if( !err ){
        if( result.length !=0 ){
          conn.query(addArr[params.type], [params.id, userSession.userId, params.title, params.content, new Date().getTime()], function(err, result){
            if( !err && result.length != 0 ){
              let shareId = result.insertId;
              let saveHot = $sql.hot.addInfo;
              let allHot  = $sql.hot.allInfo;
              conn.query(allHot, [params.id, params.type], function(err, result){
                if(!err){
                  let hot = result[0].hotnum + 2;
                  conn.query(saveHot, [params.id, params.type, hot, new Date().getTime()], function(err, result){
                    if( !err && result.length !=0 ){
                      let addEvent = $sql.event.addInfo;
                      conn.query(addEvent,[userSession.userId, userSession.userName, params.type, 1, params.title, shareId, new Date().getTime()], function(err, result){
                        if( !err && result.length != 0){
                          jsonWrite(res, {msg: '添加日志成功', code: '11000'});
                        }
                      });
                      
                    }
                  });
                }
              })
            } else {
              console.log(err);
            }
          });
        }else{
          jsonWrite(res, {msg: msgErr[params.type], code: "11010"})
        }
      }else{  
        console.log(err);
      }
    })
  }else{
    jsonWrite(res, {msg: '未登录', code: "11009"});
  }
});

//获取用户日志信息
router.post('/dailyDetailInfo', (req, res) => {
  let getArr        = [$sql.share.getShare, $sql.bookshare.getShare];
  let query         = $sql.user.getInfo;
  let queryDiscuss  = [$sql.discuss.getDiscuess, $sql.bookdiscuss.getDiscuess];
  let userSession   = req.session;
  let params        = req.body;
  let msgErr        = ['该动画不存在', '该书籍不存在'];
  let info          = {};
  let user          = {};
  let discuss       = [];
  conn.query(getArr[params.type], [params.id], function(err, result){
    if( !err && result.length != 0 ){
      info = result[0];
      let date = new Date(result[0].shareTime);
      result[0].shareTime = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      conn.query(queryDiscuss[params.type], [params.id], function(err,result){
        if( !err ){
          for(let i = 0; i < result.length; i++){
            let date = new Date(result[i].time);
            result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
          }
          discuss = result;
        }
        if( userSession.userId ){
          conn.query(query, [userSession.userId], function(err, result){
            if( !err && result.length !=0 ){
              user = result[0];
              jsonWrite(res, {mag: '用户已登录', code: '11000', data:{info: info, user: user, discuss: discuss}});
            }else{
              console.log(err);
            }
          });
        }else{
          jsonWrite(res, {mag: '用户未登录', code: '11011', data:{info: info, user: {}, discuss: discuss}});
        }
      });
    }else{
      console.log(err);
    }
  });
});

//添加日志评论功能
router.post('/addDiscuss', (req, res) => {
  let addArr = [$sql.discuss.addDiscuss, $sql.bookdiscuss.addDiscuss];
  let query  = [$sql.share.getShare, $sql.bookshare.getShare];
  let params = req.body;
  let queryDiscuss  = [$sql.discuss.getDiscuess, $sql.bookdiscuss.getDiscuess];

  conn.query(query[params.type], [params.dailyId], function(err, result){
    if( !err ){
      if(result.length != 0){
        conn.query(addArr[params.type], [params.dailyId, params.userId, params.discuss, new Date().getTime()], function(err, result){
          if( !err && result.length !=0){
           // jsonWrite(res, {mag: '评论成功', code: '11000', discussId: result.insertId})
           conn.query(queryDiscuss[params.type], [params.dailyId], function(err, result){//获取所有的评论信息
            if( !err ){
              for(let i = 0; i < result.length; i++){
                let date = new Date(result[i].time);
                result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
              }
              jsonWrite(res, {mag: '获取评论信息成功', code: '11000', data: result});
            }else{
              console.log(err);
            }
           });
          }else{
            console.log(err);
          }
        });
      }else{
        jsonWrite(res, {mag: '日志不存在', code: '11012'});
      }
    }else{
      console.log(err);
    }
  });
});

//回复评论/回复接口
router.post('/replyOne', function(req, res){
  let addArr = [$sql.reply.addOne, $sql.bookreply.addOne];
  let query  = [$sql.share.getShare, $sql.bookshare.getShare];
  let params = req.body;
  let getDiscuss = [$sql.discuss.getDiscuess, $sql.bookdiscuss.getDiscuess];
  let queryDiscuss  = [$sql.discuss.queryDiscuss, $sql.bookdiscuss.queryDiscuss];
  let userSession   = req.session;

  conn.query(query[params.type], [params.dailyId], function(err, result){
    if( !err ){
      if(result.length !=0 ){
        //判断回复是否存在
        conn.query(queryDiscuss[params.type], [params.discussId], function(err, result){
          if( !err ){
            if( result.length != 0 ){
              if(userSession.userId){
                let replyId;
                
                if(params.reply_type == 0){
                  replyId = params.discussId;
                }else{
                  replyId = params.toId;
                }
                conn.query(addArr[params.type], [params.discussId, userSession.userId, params.toId, params.content, params.reply_type, replyId, new Date().getTime()], function(err, result){
                  if(!err && result.length !=0 ){
                    jsonWrite(res, {mag: '回复成功', code: '11000'});
                  }
                })
              }else {
                jsonWrite(res, {mag: '登录状态已失效', code: '11014'})
              }
              // conn.query(addArr[params.type], [params.], function(err, result){

              // });
            }else{
              jsonWrite(res, {mag: '评论不存在', code: '11013'})
            }
          }else{  
            console.log(err);
          }
        });
      }else{
        jsonWrite(res, {mag: '日志不存在', code: '11012'});
      }
    }else{
      console.log(err);
    }
  });
});

//获取所有评论信息
router.post('/getAllInfo', function(req, res){
  let getDiscuss   = [$sql.discuss.getDiscuess, $sql.bookdiscuss.getDiscuess];
  let discuss      = [];
  let sqls         = [];
  let discussIdArr = [];
  let index        = 0;
  let reply        = [];
  let params       = req.body;

  conn.query(getDiscuss[params.type], [params.dailyId], function(err, result){//获取所有的评论信息
    if( !err ){
      for(let i = 0; i < result.length; i++){
        let date = new Date(result[i].time);
        result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      }
      discuss = result;
      index = 0;
      if( params.type == 0 ){
        for(let i = 0; i < discuss.length; i++ ){

          discussIdArr.push(discuss[i].discussId);
          sqls.push($sql.reply.partMore);
        }
      }else{
        for(let i = 0; i < discuss.length; i++ ){
          discussIdArr.push(discuss[i].discussId);
          sqls.push($sql.bookreply.partMore);
        }
      }
      //循环每个评论，看是否有相关回复
      async.eachSeries(sqls, function(item, callback){//每条sql执行成功才会执行下一条
        conn.query(item, [discussIdArr[index]],  function(err, result){
          if( !err){
            for(let i = 0; i < result.length; i++){
              let date = new Date(result[i].time);
              result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            }
            discuss[index].reply = result;
            discuss[index].replyNum = result.length;
            index++;
            callback();
          }else{ 
            callback(err);
          }
        });
      }, function(err){
        if( !err){
          jsonWrite(res, {msg: '获取所有评论信息成功', code: '11000', data: discuss});
        }
      });
    }else{
      console.log(err);
    }
  });
});

//获取动画日志信息
router.post('/showJournalInfo', (req, res) => {
  let total    = $sql.share.shareTotal;
  let limit    = $sql.share.limitTotal;
  let params   = req.body;
  let length;
  let nowlimit = params.limit * 1;
  let sqls     = [];
  let dataArr  = [];
  let index    = 0;
  let temp     = [];

  conn.query(total, function(err, result) {
    if( !err ){
      length = result.length;
      conn.query(limit, [(params.page - 1) * nowlimit, nowlimit], function(err, result) {
        if( !err ){
          for(let i = 0; i < result.length; i++){
            sqls.push($sql.discuss.getDiscuess);
            dataArr.push(result[i].id);
          }
          temp = result;
          async.eachSeries(sqls, function(item, callback){//每条sql执行成功才会执行下一条
            conn.query(item, [dataArr[index]],  function(err, result){
              if( !err){
                if(result.length != 0){
                  for(let i = 0; i < result.length; i++){
                    let date = new Date(result[i].time);
                    result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                  }
                  for(let i in  result[result.length-1]){
                    if( i == 'name'){
                      temp[index].disName = result[result.length-1][i];
                    }
                    if( i == 'content'){
                      temp[index].disContent = result[result.length-1][i];
                    }
                    if( i == 'time'){
                      temp[index].disTime = result[result.length-1][i];
                    }
                  }
                  temp[index].disLen  = result.length;
                }else{
                  temp[index].disLen  = result.length;
                  temp[index].disName = "";
                  temp[index].disdisContentName = "";
                  temp[index].disTime = "";
                }
                index++;
                callback();
              }else{ 
                callback(err);
              }
            });
          }, function(err){
            if( !err){
              jsonWrite(res, {msg: '获取信息成功', code: '11000', count: length, data: temp});
            }
          });
          // jsonWrite(res, {code: '0', msg:'查询成功',  data: result});
        }else{
          console.log(err);
        }
      });
    }else{
      console.log(err);
    }
  });
});

//获取书籍日志信息
router.post('/showJourBookInfo', (req, res) => {
  let total  = $sql.bookshare.shareTotal;
  let limit  = $sql.bookshare.limitTotal;
  let params   = req.body;
  let length;
  let nowlimit = params.limit * 1;
  let sqls     = [];
  let dataArr  = [];
  let index    = 0;
  let temp     = [];

  conn.query(total, function(err, result) {
    if( !err ){
      length = result.length;
      conn.query(limit, [(params.page - 1) * nowlimit, nowlimit], function(err, result) {
        if( !err ){
          for(let i = 0; i < result.length; i++){
            sqls.push($sql.bookdiscuss.getDiscuess);
            dataArr.push(result[i].id);
          }
          temp = result;
          async.eachSeries(sqls, function(item, callback){//每条sql执行成功才会执行下一条
            conn.query(item, [dataArr[index]],  function(err, result){
              if( !err){
                if(result.length != 0){
                  for(let i = 0; i < result.length; i++){
                    let date = new Date(result[i].time);
                    result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                  }
                  for(let i in  result[result.length-1]){
                    if( i == 'name'){
                      temp[index].disName = result[result.length-1][i];
                    }
                    if( i == 'content'){
                      temp[index].disContent = result[result.length-1][i];
                    }
                    if( i == 'time'){
                      temp[index].disTime = result[result.length-1][i];
                    }
                  }
                  temp[index].disLen  = result.length;
                }else{
                  temp[index].disLen  = result.length;
                  temp[index].disName = "";
                  temp[index].disdisContentName = "";
                  temp[index].disTime = "";
                }
                index++;
                callback();
              }else{ 
                callback(err);
              }
            });
          }, function(err){
            if( !err){
              jsonWrite(res, {msg: '获取信息成功', code: '11000', count: length, data: temp});
            }
          });
          // jsonWrite(res, {code: '0', msg:'查询成功',  data: result});
        }else{
          console.log(err);
        }
      });
    }else{
      console.log(err);
    }
  });
});


//获取首页信息
router.post('/getHotBook', (req, res) => {
  let getInfo = $sql.hot.allHotbookInfo; 
  let nowTime = new Date().getTime() - 36000 * 1000;

  conn.query(getInfo, [nowTime], function(err, result){
    if( !err ){
      if(result.length !=0 ){
        for(let i = 0; i < result.length; i++){
          let date = new Date(result[i].hotTime);
          result[i].hotTime = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());     
        }
        jsonWrite(res, {msg: '获取信息成功', code: '11000', data: result})
      }else{
        jsonWrite(res, {msg: '获取信息成功', code: '11000', data: []})
      }
    }else{
      console.log(err);
    }
  });
});

//获取首页信息
router.post('/getHotBangumi', (req, res) => {
  let getInfo = $sql.hot.allHotbanInfo; 
  let nowTime = new Date().getTime() - 36000 * 1000;

  conn.query(getInfo, [nowTime], function(err, result){
    if( !err ){
      if(result.length !=0 ){
        for(let i = 0; i < result.length; i++){
          let date = new Date(result[i].hotTime);
          result[i].hotTime = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());     
        }
        jsonWrite(res, {msg: '获取信息成功', code: '11000', data: result})
      }else{
        jsonWrite(res, {msg: '获取信息成功', code: '11000', data: []})
      }
    }else{
      console.log(err);
    }
  });
});

//获取最新动态 0 -- 收藏评分 1 -- 发布日志
router.post('/getEvent', (req, res) => {
  let getInfo = $sql.event.getInfo;

  conn.query(getInfo, function(err, result){
    if( !err ){
      if(result.length !=0 ){
        for(let i = 0; i < result.length; i++){
          let date = new Date(result[i].time);
          result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());     
        }
        jsonWrite(res, {msg: '获取信息成功', code: '11000', data: result});
      }else{
        jsonWrite(res, {msg: '获取信息成功', code: '11000', data: []})
      }
    }else{
      console.log( err );
    }
  });
});

//随机查看cv信息
router.post('/getRandomCv', function(req, res){
  let getRandomCv = $sql.showCv.cvTotal;
  let data = [];
  let len  = 0;
  let arr = [];
  let i = 0;

  conn.query(getRandomCv, function(err, result){
    if(!err && result.length != 0){
      
      len = result.length;
      idx = (len < 5) ? len : 5;

      while (i <= idx) {
        let index = Math.floor(Math.random()*len);

        if(arr.length == 0){
          arr.push([index]);
          i++;
        }else{
          if(arr.indexOf(index) > -1){

          }else{
            arr.push(index);
            data.push(result[index]);
            i++;
          }
        }
        
      }
      jsonWrite(res, {msg: '获取信息成功', code: '11000', data: data});
    }else{
      jsonWrite(res, {msg: '获取信息成功', code: '11000', data: []})
    }
  })  
});

//返回个人日志信息
router.post('/userJournal', function(req, res){
  let bansql  = $sql.share.selShare;
  let booksql = $sql.bookshare.selShare;
  let params  = req.body;
  let data = {};

  conn.query(bansql, [params.id], function(err, result){
    if(!err){
      if(result !=0 ){
        for(let i = 0; i < result.length; i++){
          let date = new Date(result[i].time);
          result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());     
        }
      }
      data.bar = [];
      data.bangumi = result;
      data.bar.push(result.length);
      conn.query(booksql, [params.id], function(err, result){
        if(!err){ 
          if(result !=0 ){
            for(let i = 0; i < result.length; i++){
              let date = new Date(result[i].time);
              result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());     
            }
          }
          data.journal = result;
          data.bar.push(result.length);
          jsonWrite(res, {msg: '获取信息成功', code: '11000', data: data});
        }
      })
    }

  });
});

//删除个人日志信息
router.post('/delSelfJournal', function(req, res){
  let delArr = [$sql.share.delSelShare, $sql.bookshare.delSelShare];
  let params = req.body;
  let userSession = req.session;
  if(userSession.userId){
    conn.query(delArr[params.type], [params.dailyId], function(err,result){
      if(!err){
        jsonWrite(res, {msg: '删除日志成功', code: '11000'});
      }else{
        console.log(err);
      }
    })
  }else{
    jsonWrite(res, {msg: '登录已失效', code: '11014'});
  }
});

//搜索，默认显示
router.get('/searchBangumi', (req, res) => {
  let query = [$sql.bangumi.mohuBangumi, $sql.book.mohuBook, $sql.cv.mohuCv, $sql.staff.mohuStaff];
  let mohuLimit = [$sql.bangumi.mohuLimit, $sql.book.mohuLimit, $sql.cv.mohuLimit, $sql.staff.mohuLimit];
  let name  = req.query.name;
  let count = 0;
  let nowlimit = req.query.limit * 1;
  let nowPage  = (req.query.page - 1) * nowlimit;
  conn.query(query[req.query.type], [name, name], function(err, result) {
    if( !err ){
      if( result.length != 0 ){
        count = result.length;
        conn.query(mohuLimit[req.query.type], [name, name, nowPage, nowlimit], function(err, result){
          if(!err){
            for(let i in result){
              let date = new Date(result[i].start_date);

              result[i].start_date = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            }
            jsonWrite(res, {msg: '查询数据成功', code: '11000', data: result, count: count});
          }
        });
      }else{
         jsonWrite(res, {msg: '查询数据成功', code: '11000', data: [], count: 0});
      }
     
    } else {
      jsonWrite(res, err);
    }
  });
});

module.exports = router;