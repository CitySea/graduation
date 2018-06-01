// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(name, psw, sign_time, profile) values(?, ?, ?, ?)',
    query: 'select * from user where user.name=(?)',
    getInfo: 'select * from user where user.id = ?',
    updateInfo: 'update user set name = ?, sex = ?, mail = ?, profile = ? where id = ? ',
    banInfo: 'select * from bangumi where id=(?)',
    bookInfo: 'select * from book where id=(?)',
  },
  follow: {
    queryBase: 'select * from follow where user_id = ? and bangumi_id = ?',
    addBase: 'insert into follow(user_id, bangumi_id, score) values(?, ?, ?)',
    editBase: 'update follow set score = ? where user_id = ? and bangumi_id = ?',
    delBase: 'delete from follow where user_id = ? and bangumi_id = ?',
    scoreDetail: 'select score from follow where bangumi_id = ?',
    userStars: 'select bangumi.name as banName, bangumi.cnname as banCnname, bangumi.detail as banDetail, follow.bangumi_id as banId, bangumi.show_pic as show_pic from follow inner join bangumi on follow.bangumi_id = bangumi.id where follow.user_id = ?',
    delFollow: 'delete from follow where bangumi_id = ?',
  },
  bookfollow: {
    queryBase: 'select * from bookfollow where user_id = ? and book_id = ?',
    addBase: 'insert into bookfollow(user_id, book_id, score) values(?, ?, ?)',
    editBase: 'update bookfollow set score = ? where user_id = ? and book_id = ?',
    delBase: 'delete from bookfollow where user_id = ? and book_id = ?',
    scoreDetail: 'select score from bookfollow where book_id = ?',
    userStars: 'select book.name as bookName, book.cnname as bookCnname, book.detail as bookDetail, bookfollow.book_id as bookId, book.show_pic as show_pic from bookfollow inner join book on bookfollow.book_id = book.id where bookfollow.user_id = ?',
    delBookFollow: 'delete from bookfollow where book_id = ?',
  },
  /**
  * 前端展示系统 
  **/
  showCv: {
    cvTotal: 'select * from cv', //返回所有cv结果集
    cvLimit: 'select * from cv limit ?, ?', //返回页数staff结果集
    queryCv: 'select * from cv where cv.id=(?)', //返回查询特定cv结果集
  },

  /**
	* 后台管理系统	
  **/
  //番剧
  bangumi: {
    bangumiTotal: 'select * from bangumi',//返回所有bangumi结果集
    bangumiLimit: 'select * from bangumi limit ?, ?', //返回页数bangumi结果集
    addBangumi: 'insert into bangumi(name, cnname, addr, progress_total, start_date, send_date, year, season) values(?, ?, ?, ?, ?, ?, ?, ?)',//添加基本信息
    editBangumi: 'update bangumi set name = ?, cnname = ?, addr = ?, progress_total = ?, start_date = ?, send_date = ?, show_pic = ?, small_show_pic = ?, year = ?, season = ? where id = ?',//编辑基本信息
    saveStaffInfo: 'update bangumi set staff_total = ? where id = ?',//保存bangumi的staff信息
    queryBangumi: 'select * from bangumi where bangumi.id=(?)',//返回查询特定bangumi结果集
    allBangumiInfo: 'select actor.bangumi_id as bangumiId, role.id as roleId, cv.id as cvId, role.name as roleName, role.cnname as roleCnname, role.small_show_pic, role.detail as roleDetail, cv.name as cvName, cv.cnname as cvCnname, actor.position from actor inner join cv on actor.cv_id = cv.id inner join role on actor.role_id = role.id where actor.bangumi_id = ?',
    showTag: 'select type.tag_id from type where bangumi_id = ( ? )',//返回标签信息
    addTag: 'insert into type(tag_id, bangumi_id) values (?, ?)',//添加标签信息
    delTag: 'delete from type where tag_id = ? and bangumi_id = ?',//删除标签信息
    delGTag: 'delete from type where tag_id = ?',//删除相关标签的番剧信息
    delBangumi: 'delete from bangumi where bangumi.id = ?',//删除番剧信息
    delBangumiType: 'delete from type where bangumi_id = ?',//删除番剧标签关联信息
    delBangumiActor: 'delete from actor where bangumi_id = ?',//删除番剧角色关联信息
    delBangumiEpisode: 'delete from episode where bangumi_id = ?',//删除番剧集数关联信息
    delBangumiJob: 'delete from job where bangumi_id = ?',//删除番剧职位关联信息
    queryStaff: 'select * from bangumi where staff_total regexp ?',
    mohuBangumi: 'select * from bangumi where name regexp ? or cnname regexp ?',
    mohuLimit: 'select * from bangumi where name regexp ? or cnname regexp ? limit ?, ?',
  },
  //书籍
  book: {
    bookTotal: 'select * from book',//返回所有book结果集
    bookLimit: 'select * from book limit ?, ?', //返回页数book结果集
    queryBook: 'select * from book where book.id=(?)',//返回查询特定book结果集
    addBookBaseInfo: 'insert into book(name, cnname, addr, author, type, start_date, year, chapter, press) values(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    editBook: 'update book set name = ?, cnname = ?, addr = ?, author = ?, type = ?, start_date = ?, show_pic = ?, small_show_pic = ?, year = ?, chapter = ?, press = ? where id = ?',//编辑基本信息
    allBookInfo: 'select book_role.book_id as bookId, role.id as roleId, role.name as roleName, role.cnname as roleCnname, role.small_show_pic, role.detail as roleDetail, book_role.position from book_role inner join role on book_role.role_id = role.id where book_role.book_id = ?',
    addTag: 'insert into booktype(booktag_id, book_id) values (?, ?)',//添加标签信息
    delTag: 'delete from booktype where booktag_id = ? and book_id = ?',//删除标签信息
    delBook: 'delete from book where book.id = ?',//删除书籍信息
    delBookType: 'delete from booktype where book_id = ?',//删除书籍标签关联信息
    delBookOffprint: 'delete from offprint where book_id = ?',//删除书籍单行本关联信息
    mohuBook: 'select * from book where name regexp ? or cnname regexp ?',
    mohuLimit: 'select * from book where name regexp ? or cnname regexp ? limit ?, ?',
 },
  //标签
  tag: {
    addTag: 'insert into tag(name) values(?)',//添加tag
    showTag: 'select * from tag',//返回所有tag结果集
    editTag: 'update tag set name = ? where id = ?',//修改标签名称
    delTag: 'delete from tag where id = ?',//删除特定标签 
  },
  //集数
  episode: {
    episodeTotal: 'select * from episode where bangumi_id = ?',//返回所有集数结果集
    episodeLimit: 'select * from episode where bangumi_id = ? limit ?, ?',//返回页数episode结果集
    queryEpisode: 'select * from episode where bangumi_id = ? and epi_no = ?',//返回局查询特定集数结果集
    addEpisode: 'insert into episode(bangumi_id, epi_no, name, cnname, duration, broadcast_time, detail) values(?, ?, ?, ?, ?, ?, ?)',//添加集数
    delEpisode: 'delete from episode where bangumi_id = ? and epi_no = ?',//删除特定集数 
    editEpisode: 'update episode set name = ?, cnname = ?, duration = ?, broadcast_time = ?, detail = ? where bangumi_id = ? and epi_no = ? ',//修改集数
  },
  //单行本
  offprint: {
    offprintTotal: 'select * from offprint where book_id = ?',//返回所有单行本结果集
    offprintLimit: 'select * from offprint where  book_id = ? limit ?, ?',//返回页数offprint结果集
    queryOffprint: 'select * from offprint where book_id = ? and off_no = ?',//返回局查询特定集数结果集
    showTag: 'select booktype.booktag_id from booktype where book_id = ( ? )',//返回标签信息
    addOffprint: 'insert into offprint(book_id, off_no, name, cnname, detail, show_pic, broadcast_time) values(?, ?, ?, ?, ?, ?, ?)',
    delOffprint: 'delete from offprint where book_id = ? and off_no = ?',//删除特定单行本
    editOffprint: 'update offprint set name = ?, cnname = ?, detail = ?, show_pic = ? , broadcast_time = ? where book_id = ? and off_no = ? ',//修改单行本
  },
  //书籍标签
  booktag: {
    showTag: 'select * from booktag',//返回所有tag结果集
    addTag: 'insert into booktag(name) values(?)',//添加tag
    showTag: 'select * from booktag',//返回所有tag结果集
    editTag: 'update booktag set name = ? where id = ?',//修改标签名称
    delTag: 'delete from booktag where id = ?',//删除特定标签 
  },
  //书籍关联标签
  booktype: {
    delGTag: 'delete from booktype where booktag_id = ?',//删除相关标签的番剧信息
  },
  //staff情报添加
  staff: {
  	staffTotal: 'select * from staff', //返回所有staff结果集
  	staffLimit: 'select * from staff limit ?, ?', //返回页数staff结果集
  	queryStaff: 'select * from staff where staff.id=(?)', //返回查询特定staff结果集
    queryStaffname: 'select * from staff where staff.name=(?) or staff.cnname=(?)', //返回查询staff姓名结果集
  	delStaff: 'delete from staff where id = ?', //删除特定staff
  	updateStaff: 'update staff set name = ?, cnname = ?, sex = ?, date = ?, detail = ?, show_pic = ?, small_show_pic = ?, job = ? where id = ?',  //更新特定cv
  	addStaff: 'insert into staff(name, cnname, sex, date, detail, show_pic, small_show_pic, job) values(?, ?, ?, ?, ?, ?, ?, ?)',
    upStaff: 'update staff set job = ? where id = ?',//修改职业
    mohuStaff: 'select * from staff where name regexp ? or cnname regexp ?',
    mohuLimit: 'select * from staff where name regexp ? or cnname regexp ? limit ?, ?',
  },
  //cv情报添加
  cv: {
  	cvTotal: 'select * from cv', //返回所有cv结果集
  	cvLimit: 'select * from cv limit ?, ?', //返回页数cv结果集
  	queryCv: 'select * from cv where cv.id=(?)', //返回查询特定cv结果集
    queryCvname: 'select * from cv where cv.name=(?) or cv.cnname=(?)', //返回查询cv姓名结果集
  	delCv: 'delete from cv where id = ?', //删除特定cv
  	updateCv: 'update cv set name = ?, cnname = ?, sex = ?, date = ?, detail = ?, show_pic = ?, small_show_pic = ? where id = ?',  //更新特定cv
  	addCv: 'insert into cv(name, cnname, sex, date, detail, show_pic, small_show_pic) values(?, ?, ?, ?, ?, ?, ?)',
    mohuCv: 'select * from cv where name regexp ? or cnname regexp ?',
    mohuLimit: 'select * from cv where name regexp ? or cnname regexp ? limit ?, ?',
  },
  //角色情报添加
  role: {
    addRole: 'insert into role(name, cnname, sex, detail, show_pic, small_show_pic) values (?, ?, ?, ?, ?, ?)',
    editRole: 'update role set name = ?, cnname = ?, sex = ?, detail = ?, show_pic = ?, small_show_pic = ? where id = ?', //更新角色信息
    nameRole: 'select * from role where role.name = ? or role.cnname = ?',
    returnRole: 'select * from role where role.id = ?',
  },
  //角色加入番剧中
  actor: {
    addActor: 'insert into actor(bangumi_id, cv_id, role_id, position) values(?, ?, ?, ?)', //添加角色至番剧
    editActor: 'update actor set cv_id = ?, position = ? where bangumi_id = ? and cv_id = ? and role_id = ?', //修改番剧中的角色
    delActor: 'delete from actor where bangumi_id = ? and role_id = ?', //删除番剧中的角色
    queryCv: 'select bangumi.id as id, bangumi.name as bangumiName, bangumi.cnname as bangumiCnname, role.name as roleName, role.cnname as roleCnname, role.small_show_pic, role.detail as roleDetail, cv.name as cvName, cv.cnname as cvCnname, actor.position from actor inner join cv on actor.cv_id = cv.id inner join role on actor.role_id = role.id inner join bangumi on actor.bangumi_id = bangumi.id where actor.cv_id = 1'
  }, 
  //角色加入书籍中
  book_role: {
    addRole: 'insert into book_role(book_id, role_id, position) values(?, ?, ?)',//添加角色至书籍
    editActor: 'update book_role set position = ? where book_id = ? and role_id = ?', //修改番剧中的角色
    delActor: 'delete from book_role where book_id = ? and role_id = ?', //删除书籍中的角色
  },
  //动画日志
  share: {
    addShare: 'insert into share(bangumi_id, user_id, title, content, time) values(?, ?, ?, ?, ?)',//添加日志
    delShare: 'delete from share where bangumi_id = ? and user_id = ?',//删除日志
    getShare: 'select share.id as id, share.time as shareTime, share.bangumi_id as banId, share.user_id as userId, share.title as title, share.content as content, user.name as userName, user.profile as profile from share inner join user on share.user_id = user.id where share.id = ?',//获取日志信息
    allShare: 'select share.id as id, share.bangumi_id as banId, share.user_id as userId, share.title as title, share.content as content, share.time as time, user.name as userName, user.profile as profile from share inner join user on share.user_id = user.id where share.bangumi_id = ? order by share.time desc',
    shareTotal: 'select share.id as id, share.bangumi_id as banId, share.user_id as userId, share.title as title, share.content as content, user.name as userName, user.profile as profile from share inner join user on share.user_id = user.id',
    limitTotal: 'select share.id as id, share.bangumi_id as banId, share.user_id as userId, share.title as title, share.content as content, user.name as userName, user.profile as profile from share inner join user on share.user_id = user.id limit ?, ?',
    delBanShare  : 'delete from share where bangumi_id = ?',
    selShare: 'select * from share where user_id = ?',
    delSelShare: 'delete from share where share.id = ?',
  },
  //书籍日志
  bookshare: {
    addShare: 'insert into bookshare(book_id, user_id, title, content,time) values(?, ?, ?, ?, ?)',//添加日志
    delShare: 'delete from bookshare where book_id = ? and user_id = ?',//删除日志
    getShare: 'select bookshare.id as id, bookshare.time as shareTime, bookshare.book_id as bookId, bookshare.user_id as userId, bookshare.title as title, bookshare.content as content, user.name as userName, user.profile as profile from bookshare inner join user on bookshare.user_id = user.id where bookshare.id = ?',//获取日志信息
    allShare: 'select bookshare.id as id, bookshare.book_id as bookId, bookshare.user_id as userId, bookshare.title as title, bookshare.content as content, bookshare.time as time, user.name as userName, user.profile as profile from bookshare inner join user on bookshare.user_id = user.id where bookshare.book_id = ? order by bookshare.time desc',
    shareTotal: 'select bookshare.id as id, bookshare.book_id as bookId, bookshare.user_id as userId, bookshare.title as title, bookshare.content as content, bookshare.time as time, user.name as userName, user.profile as profile from bookshare inner join user on bookshare.user_id = user.id order by bookshare.time desc',
    limitTotal: 'select bookshare.id as id, bookshare.book_id as bookId, bookshare.user_id as userId, bookshare.title as title, bookshare.content as content, bookshare.time as time, user.name as userName, user.profile as profile from bookshare inner join user on bookshare.user_id = user.id order by bookshare.time desc limit ?, ?',
    delBookShare: 'delete from bookshare where book_id = ?',
    selShare: 'select * from bookshare where user_id = ?',
    delSelShare: 'delete from bookshare where bookshare.id = ?',
  },
  //动画评论
  discuss: {
    addDiscuss: 'insert into discuss(share_id, user_id, content, time) values(?, ?, ?, ?)',//添加评论
    getDiscuess: 'select discuss.id as discussId, discuss.share_id as shareId, discuss.user_id as userId, discuss.content as content, discuss.time as time, user.profile as profile, user.name as name from discuss inner join user on discuss.user_id = user.id where discuss.share_id = ? order by discuss.time asc',//获取评论
    queryDiscuss: 'select * from discuss where discuss.id = ?',
  },
  //书籍评论
  bookdiscuss: {
    addDiscuss: 'insert into bookdiscuss(bookshare_id, user_id, content, time) values(?, ?, ?, ?)',//添加评论
    getDiscuess: 'select bookdiscuss.id as discussId, bookdiscuss.bookshare_id as shareId, bookdiscuss.user_id as userId, bookdiscuss.content as content, bookdiscuss.time as time, user.profile as profile, user.name as name from bookdiscuss inner join user on bookdiscuss.user_id = user.id where bookdiscuss.bookshare_id = ? order by bookdiscuss.time asc',//获取评论  }
    queryDiscuss: 'select * from bookdiscuss where bookdiscuss.id = ?',
  },
  //动画回复
  reply: {
    addOne: 'insert into reply(discuss_id, from_uid, to_uid, content, reply_type, reply_id, time) values(?, ?, ?, ?, ?, ?, ?)',//添加针对评论的回复
    partMore: 'select reply.from_uid as fromUid, reply.to_uid as toUid, reply.content as content, reply.reply_type as replyType, reply.reply_id as replyId, reply.time as time, fromuser.name as fromName, fromuser.profile as fromProfile, touser.name as toName, touser.profile as toProfile from reply inner join user as fromuser on reply.from_uid = fromuser.id inner join user as touser on reply.to_uid = touser.id where reply.discuss_id = ? order by reply.time asc'
  },
  //书籍回复
  bookreply: {
    addOne: 'insert into bookreply(bookdiscuss_id, from_uid, to_uid, content, reply_type, reply_id, time) values(?, ?, ?, ?, ?, ?, ?)',//添加针对评论的回复
    partMore: 'select bookreply.from_uid as fromUid, bookreply.to_uid as toUid, bookreply.content as content, bookreply.reply_type as replyType, bookreply.reply_id as replyId, bookreply.time as time, fromuser.name as fromName, fromuser.profile as fromProfile, touser.name as toName, touser.profile as toProfile from bookreply inner join user as fromuser on bookreply.from_uid = fromuser.id inner join user as touser on bookreply.to_uid = touser.id where bookreply.bookdiscuss_id = ? order by bookreply.time asc'
  },
  //热度
  hot: {
    allBanInfo: 'select * from hot where key_id = ? and type = 0 order by time desc limit 1',
    allBookInfo: 'select * from hot where key_id = ? and type = 1 order by time desc limit 1',
    allInfo: 'select * from hot where key_id = ? and type = ? order by time desc limit 1',
    addInfo: 'insert into hot(key_id, type, hotnum, time) values(?, ? ,?, ?)',//id, 类型, 热度值, 时间
    delBanInfo: 'delete from hot where key_id = ? and type = 0',//删除相关联动画热度
    delBookInfo: 'delete from hot where key_id = ? and type = 1',//删除相关联动画热度
    allHotbanInfo: 'select hot.key_id as id,hot.time as hotTime, ceil(max(hot.hotnum)*1000) as hotNum, bangumi.name, bangumi.id as bangumiId, bangumi.small_show_pic as bangumiImg from hot  inner join bangumi on bangumi.id = hot.key_id where time > ? and type = 0 group by hot.key_id order by hotnum desc limit 0, 5 ',//首页番剧热度
    allHotbookInfo: 'select hot.key_id as id,hot.time as hotTime, ceil(max(hot.hotnum)*1000) as hotNum, book.name, book.id as bookId, book.small_show_pic as bookImg from hot  inner join book on book.id = hot.key_id where hot.time > ? and hot.type = 1 group by hot.key_id order by hotnum desc limit 0, 5',//首页书籍热度
  },
  //事件
  event: {
    addInfo: 'insert into event(user_id, user_name, type, event_type, event_content, key_id, time) values(?, ?, ?, ?, ?, ?, ?)',
    getInfo: 'select user.id as userId, event.user_name as userName, event.type as type, event.event_type as eventType, event.event_content as eventContent, event.key_id as keyId, event.time as time, user.profile as profile from event inner join user on event.user_id = user.id order by time desc limit 0 , 15',
  }
}

module.exports = sqlMap;