// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(name, psw) values(?, ?)',
    query: 'select * from user where user.name=(?)'
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
    addBangumi: 'insert into bangumi(name, cnname, progress_total, start_date, send_date) values(?, ?, ?, ?, ?)',//添加基本信息
    editBangumi: 'update bangumi set name = ?, cnname = ?, progress_total = ?, start_date = ?, send_date = ? where id = ?',//添加基本信息
    queryBangumi: 'select * from bangumi where bangumi.id=(?)',//返回查询特定bangumi结果集
    allBangumiInfo: 'select actor.bangumi_id as bangumiId, role.id as roleId, cv.id as cvId, role.name as roleName, role.small_show_pic, cv.name as cvName, actor.position from actor inner join cv on actor.cv_id = cv.id inner join role on actor.role_id = role.id where actor.bangumi_id = ?',
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
    episodeTotal: 'select * from episode where bangumi_id = ?',//返回所有cv结果集
    episodeLimit: 'select * from episode where bangumi_id = ? limit ?, ?',//返回页数episode结果集
    queryEpisode: 'select * from episode where bangumi_id = ? and epi_no = ?',//返回局查询特定集数结果集
    addEpisode: 'insert into episode(bangumi_id, epi_no, name, cnname, duration, broadcast_time, detail) values(?, ?, ?, ?, ?, ?, ?)',//添加集数
    delEpisode: 'delete from episode where bangumi_id = ? and epi_no = ?',//删除特定集数 
    editEpisode: 'update episode set name = ?, cnname = ?, duration = ?, broadcast_time = ?, detail = ? where bangumi_id = ? and epi_no = ? ',//修改集数
  },
  //staff情报添加
  staff: {
  	staffTotal: 'select * from staff', //返回所有staff结果集
  	staffLimit: 'select * from staff limit ?, ?', //返回页数staff结果集
  	queryStaff: 'select * from staff where staff.id=(?)', //返回查询特定staff结果集
  	delStaff: 'delete from staff where id = ?', //删除特定staff
  	updateStaff: 'update staff set name = ?, cnname = ?, sex = ?, date = ?, detail = ?, show_pic = ?, small_show_pic = ?, job = ? where id = ?',  //更新特定cv
  	addStaff: 'insert into staff(name, cnname, sex, date, detail, show_pic, small_show_pic, job) values(?, ?, ?, ?, ?, ?, ?, ?)',
  },
  //cv情报添加
  cv: {
  	cvTotal: 'select * from cv', //返回所有cv结果集
  	cvLimit: 'select * from cv limit ?, ?', //返回页数cv结果集
  	queryCv: 'select * from cv where cv.id=(?)', //返回查询特定cv结果集
    queryCvname: 'select * from cv where cv.name=(?) or cv.cnname=(?)', //返回查询特定cv结果集
  	delCv: 'delete from cv where id = ?', //删除特定cv
  	updateCv: 'update cv set name = ?, cnname = ?, sex = ?, date = ?, detail = ?, show_pic = ?, small_show_pic = ? where id = ?',  //更新特定cv
  	addCv: 'insert into cv(name, cnname, sex, date, detail, show_pic, small_show_pic) values(?, ?, ?, ?, ?, ?, ?)',
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
  } 
}

module.exports = sqlMap;