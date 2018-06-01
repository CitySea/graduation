
// const test = require('./api/session');
// test();
const userApi = require('./api/userApi');
const uploadImage = require('./api/upload');
const staffApi = require('./api/manage/chaInfor');
const roleApi = require('./api/manage/role');
const bookApi = require('./api/manage/book');
const bangumiApi = require('./api/manage/bangumi');
const showCvApi = require('./api/show/cvManage');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
// const cookieParser = require('cookie-parser');
const app = express();

let idenKey = 'user';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(cookieParser());

//设置session会话
app.use(session({
	name: idenKey,//session字段
	store: new redisStore({
		host: "127.0.0.1",
		port: 6379
	}),
	saveUninitialized: true,//是否自动保存未初始化的会话
	resave: false,//是否每次重新保存会话
	secret: 'recommand 128 bytes random string',
	cookie: {maxAge: 60*60*1000}//有效期
}));

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); 
  }
  else {
    next();
  }
});

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/upload', uploadImage);
app.use('/api/manage/staff', staffApi);
app.use('/api/manage/roleManage', roleApi);
app.use('/api/manage/bookManage', bookApi);
app.use('/api/manage/bgmiManage', bangumiApi);
app.use('/api/show/cvManage', showCvApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');

//session配置 redis缓存
