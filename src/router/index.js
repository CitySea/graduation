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
    }
  ]
});

export default routerObj;
