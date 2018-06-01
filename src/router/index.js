import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerObj = new Router({
	mode: 'hash',
	routes: [
    {
      //登录页
      path: '/login',
      name: 'login',
      component: resolve => require(['@/modules/user/login'], resolve),
    },
    {
    	//注册页
      path: '/register',
      name: 'register',
      component: resolve => require(['@/modules/user/register'], resolve),
    },
    {
    	//首页
      path: '/home',
      name: 'home',
      component: resolve => require(['@/modules/animation/home'], resolve),
    },
    {
      //动画情报页
      path: '/animate',
      name: 'animate',
      component: resolve => require(['@/modules/animation/animate'], resolve),
    },
    {
      //动画详情页
      path: '/animate/detail',
      name: 'detail',
      component: resolve => require(['@/modules/animation/animation-detail'], resolve),
    },
    {
      //书籍情报页
      path: '/book',
      name: 'book',
      component: resolve => require(['@/modules/animation/book'], resolve),
    },
    {
      //书籍详情页
      path: '/book/detail',
      name: 'book-detail',
      component: resolve => require(['@/modules/animation/book-detail'], resolve),
    },
    {
      //声优情报页
      path: '/cv',
      name: 'cv-detail',
      component: resolve => require(['@/modules/animation/voice-actor'], resolve),
    },
    {
      //声优详情页
      path: '/cv/detail',
      name: 'cv',
      component: resolve => require(['@/modules/animation/voice-actor-detail'], resolve),
    },
    {
      //日志情报页
      path: '/blog',
      name: 'blog',
      component: resolve => require(['@/modules/animation/blog'], resolve),
    },
    //个人中心页面
    {
      path: '/user/center',
      name: 'center',
      component: resolve => require(['@/modules/user/personal'], resolve),
    },
    //日志首页
    {
      path: '/journal',
      name: 'journal',
      component: resolve => require(['@/modules/animation/daily-index'], resolve),
    },
    //日志详情页
    {
      path: '/journal/detail',
      name: 'journal-detail',
      component: resolve => require(['@/modules/animation/daily-detail'], resolve),
    },
    //编写日志页
    {
      path: '/journal/add',
      name: 'add',
      component: resolve => require(['@/modules/animation/daily-record'], resolve),
    },
    //搜索结果页
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/modules/animation/search'], resolve),
    }
  ]
});

export default routerObj;
