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

//添加书籍基本信息
router.post('/addBookBaseInfo', (req, res) => {
  let query = $sql.book.addBookBaseInfo;
  let params = req.body;
  let startDate;
  let _year;

  startDate = new Date(params.start_date);
  //年份计算
  _year = startDate.getFullYear();
  params.start_date = startDate.getTime();
  conn.query(query, [params.name, params.cnname, params.addr, params.author, params.type, params.start_date, _year, params.chapter, params.press], function(err, result) {
    if( !err ){
      let id = result.insertId;
      let addhot = $sql.hot.addInfo;
      conn.query(addhot, [id, 1, 0, new Date().getTime()], function(err, result){
        if(!err && result.length !=0 ){
          jsonWrite(res, {msg: '书籍添加成功', code: '11000', id: id});
        }
      });
    }else{
      console.log(err);
    }
  });
});

//返回书籍信息
router.get('/showBookMa', (req, res) => {
  let total = $sql.book.bookTotal;
  let limit = $sql.book.bookLimit;
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

//返回书籍基本信息
router.post('/showBaseInfo', (req, res) => {
  let queryBase     = $sql.book.queryBook;
  let queryRole     = $sql.book.allBookInfo;
  let offprintTotal = $sql.offprint.offprintTotal;
  let journalTotal  = $sql.bookshare.allShare;
  let params        = req.body;
  let baseData      = [];
  let roleData      = [];
  let offprintData  = [];

  conn.query(queryBase, [params.id], function(err, result) {
    if( !err && result.length !== 0 ){
      let date = new Date(result[0].start_date);
      result[0].start_date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      // jsonWrite(res, {msg: '查询成功', code: '11000', data: result});
      baseData = result;
      conn.query(queryRole, [params.id], function(err, result){
        if( !err ){
          roleData = result;
          conn.query(offprintTotal, [params.id], function(err,result){
            for(let i = 0; i < result.length; i++){
              let date = new Date(result[i].broadcast_time);
              result[i].broadcast_time = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            }
            offprintData = result;
            if( !err ){
              conn.query(journalTotal, [params.id], function(err, result){
                if(!err){
                  for(let i = 0; i < result.length; i++ ){
                    let date = new Date(result[i].time);
                    let regx = /<[^>]*>|<\/[^>]*>/gm;

                    result[i].time = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                    result[i].content = result[i].content.replace(regx, "").replace(/&nbsp; /g, "").replace(/&nbsp;\s*/g, "");
                  }
                  jsonWrite(res, {msg: '获取书籍相关信息成功', code: '11000', data: {base: baseData, role: roleData, offprint: offprintData, journal: result}});
                }
                
              });
              
            }else {
              console.log(err);
            }
          });
        }
      })
     
    }else{
      console.log(err);
    }
  });
});

//修改书籍基本信息
router.post('/editBookBaseInfo', (req, res) => {
  let query = $sql.book.editBook;
  let params = req.body;
  let startDate;
  let _year;

  startDate = new Date(params.start_date);
  //年份计算
  _year = startDate.getFullYear();
  params.start_date = new Date(params.start_date).getTime();
  conn.query(query, [params.name, params.cnname, params.addr, params.author, params.type, params.start_date, params.show_pic, params.small_show_pic, _year, params.chapter, params.press, params.id], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '番剧修改成功', code: '11000'});
    }else{
      console.log(err);
    }
  });
});

//添加单行本信息
router.post('/addOffprint', (req, res) => {
  let query  = $sql.offprint.addOffprint;
  let params = req.body;

  params.broadcast_time = new Date(params.broadcast_time).getTime();
  conn.query(query, [params.bookId, params.off_no, params.name, params.cnname, params.detail, params.show_pic, params.broadcast_time], function(err, result){
    if(! err && result !=0){
      jsonWrite(res, {msg: '单行本添加成功', code: '11000'})
    }else{
      console.log(err);
    }
  });
});

//返回所有单行本结果集
router.get('/showOffprint', (req, res) => {
  let total = $sql.offprint.offprintTotal;
  let limit = $sql.offprint.offprintLimit;
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


//返回特定单行本信息
router.post('/getOffprintInfo', (req, res) => {
  let query  = $sql.offprint.queryOffprint;
  let params = req.body;

  conn.query(query, [params.id, params.off_no], function(err, result) {
    if( !err ){
      let date = new Date(result[0].broadcast_time);
      result[0].broadcast_time = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      jsonWrite(res, {msg: '查询信息成功', code: '11000', data: result});
    } else {
      jsonWrite(res, err);
    }
  });
});

//编辑特定单行本信息
router.post('/editOffprint', (req, res) => {
  let query  = $sql.offprint.editOffprint;
  let params = req.body;

  params.broadcast_time = new Date(params.broadcast_time).getTime();
  conn.query(query, [params.name, params.cnname, params.detail, params.show_pic, params.broadcast_time, params.bangumiId, params.off_no], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '修改信息成功', code: '11000', data: result});
    } else {
      jsonWrite(res, err);
    }
  });
});

//删除特定单行本信息
router.post('/delOffprint', (req, res) => {
  let query  = $sql.offprint.delOffprint;
  let params = req.body;

  conn.query(query, [params.id, params.off_no], function(err, result) {
    if( !err ){
      jsonWrite(res, {msg: '删除该单行本成功', code: '11000'});
    } else {
      jsonWrite(res, err);
    }
  });
});

//添加标签信息
router.post('/addTag', (req, res) => {
  let sqlAdd = $sql.booktag.addTag;
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
  let query = $sql.booktag.showTag;

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
  let query = $sql.booktag.editTag;
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
  let delGTag = $sql.booktype.delGTag;
  let query   = $sql.booktag.delTag;
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

//返回已添加标签信息
router.post('/showaddTag', (req, res) => {
  let showTag = $sql.offprint.showTag;
  let allTag  = $sql.booktag.showTag;
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

//返回未添加标签信息
router.post('/showNaddTag', (req, res) => {
  let showTag = $sql.offprint.showTag;
  let allTag  = $sql.booktag.showTag;
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

//添加标签信息
router.post('/addBanTag', (req, res) => {
  let addTag = $sql.book.addTag;
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
  let delTag = $sql.book.delTag;
  let params = req.body;

  conn.query(delTag, [params.tag_id, params.id], function(err, result){
    if( !err ){
      jsonWrite(res, {msg: '删除标签成功', code: '11000'});
    }
  });
});

//删除书籍信息
router.post('/delBook', (req, res) => {
  let params = req.body;
  let sqls = [$sql.book.delBookType, $sql.book.delBookOffprint, $sql.bookfollow.delBookFollow, $sql.bookshare.delBookShare, $sql.book.delBook];
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
      jsonWrite(res, {msg: '删除书籍成功', code: '11000'});
    }
  });
});

//返回所有书籍信息
router.get('/showBook', (req, res) => {
  let total = $sql.book.bookTotal;
  let limit = $sql.book.bookLimit;
  let length;
  let sql   = 'select * from book ';
  let data  = [];
  let nowlimit = req.query.limit * 1;

  if(req.query.tagsIdx != 0){//多表连接
    sql += 'inner join booktype on book.id = booktype.book_id where booktype.booktag_id = ? ';
    data.push(req.query.tagsIdx * 1);
  }
  if(req.query.areaIdx != 0){
    if(sql.indexOf('where') > -1){
      sql += 'and book.addr = ? ';
    }else {
      sql += 'where book.addr = ? ';
    }
    data.push(req.query.areaIdx - 1);
  }
  if(req.query.timeIdx != 0){
    if(sql.indexOf('where') > -1){
      sql += 'and book.year = ? ';
    }else {
      sql += 'where book.year = ? ';
    }
    data.push(2019-req.query.timeIdx);
  }
  if(req.query.typeIdx != 0){
    if(sql.indexOf('where') > -1){
      sql += 'and book.type = ? ';
    }else {
      sql += 'where book.type = ? ';
    }
    data.push(req.query.typeIdx - 1)
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
    }else{
      console.log(err);
    }
  });
});

//添加书籍角色
router.post('/addRole', (req, res) => {
  let query = $sql.role.addRole;
  let params = req.body;

  conn.query(query, [params.name, params.cnname, params.sex, params.detail, params.show_pic, params.small_show_pic], function(err, result) {
    if( !err ) {
      //和bangumi，cv表联动
      let query = $sql.book_role.addRole;
      let roleId =  result.insertId;
      conn.query(query, [params.bangumiId, roleId, params.position], function(err, result){
        if( !err ){
          jsonWrite(res, {code: '11000', msg:'角色添加成功', data: result});
        }
      });
    }else{
      console.log(err);
    }
  });
});

//删除书籍角色信息
router.post('/delActor', (req, res) => {
  let query = $sql.book_role.delActor;
  let params = req.body;

  conn.query(query, [params.bangumiId, params.roleId], function(err, result) {
    if( !err ) {
      jsonWrite(res, {code: '11000', msg: '角色删除成功'});
    }else{
      console.log(err);
    }
  });
});

//添加关联角色
router.post('/addLinkRole', (req, res) => {
  let query = $sql.book_role.addRole;
  let params = req.body;

  conn.query(query, [params.bangumiId, params.roleId, params.position], function(err, result){
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
      let query = $sql.book_role.editActor;
      conn.query(query, [params.position, params.bangumiId, params.roleId], function(err, result) {
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

//书籍评分
router.post('/saveScore', (req, res) => {
  let queryBase  = $sql.bookfollow.queryBase;
  let addBase    = $sql.bookfollow.addBase;
  let editBase   = $sql.bookfollow.editBase;
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
              conn.query(allHot, [params.id, 1], function(err, result){
                if(!err){
                  let hot;
                  if(result.length != 0 ){
                    hot = result[0].hotnum + 1;
                  }else{
                    hot = 1;
                  }
                  conn.query(saveHot, [params.id, 1, hot, new Date().getTime()],function(){
                    if( !err && result.length !=0 ){
                      //事件更新
                      let addEvent = $sql.event.addInfo;
                      conn.query(addEvent, [userId, userSession.userName, 1, 0, params.name, params.id, new Date().getTime()], function(err, result){
                        if(!err && result.length !=0 ){
                          jsonWrite(res, {msg: '收藏成功', code: '11000'});
                        }
                      })
                      
                    }
                  });
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

//查看用户是否收藏书籍
router.post('/ShowStars', (req, res) => {
  let queryBase   = $sql.bookfollow.queryBase;
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

//取消用户收藏书籍
router.post('/delScore', (req, res) => {
  let delBase     = $sql.bookfollow.delBase;
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

//书籍评分详情
router.post('/showScoreDetail', (req, res) => {
  let scoreDetail = $sql.bookfollow.scoreDetail;
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
      if( !err ){
        if( result.length != 0){
          jsonWrite(res, {msg: '已在线', code: '10000', data: result});
        }else{
          jsonWrite(res, {msg: '用户未登录', code: '10000', data: []});
          
        }
      }else{
        console.log(err);
      }
    })
  }else{
    jsonWrite(res, {msg: '未在线', code: '11006'});
  }
});

//设置热度
router.post('/setHot', (req, res) => {
  let params     = req.body;
  let allInfo = $sql.hot.allInfo;
  let addInfo    = $sql.hot.addInfo;

  conn.query(allInfo, [params.id, 1], function(err, result){
    let hot = result[0].hotnum + 0.005;
    conn.query(addInfo, [params.id, 1, hot, new Date().getTime()], function(err, result){
      if(!err && result.length !=0){
        jsonWrite(res, {msg: 'success', code: '11000'});
      }
    });
  });
});

module.exports = router;