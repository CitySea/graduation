<template>
	<header class="bar-menu">
    <section class="banner-canvas">
      <canvas id="stars" class="login-canvas" width="1900" height="48px"></canvas>
    </section>
    <section class="nav-menu flex">
      <div>
        <i class="icon icon-header-logo"></i>
        <ul class="menu-ul">
          <li><router-link to="/home">情报站</router-link></li>
          <li><router-link to="/animate">动画情报</router-link></li>
          <li><router-link to="/book"><a>书籍情报</a></router-link></li>
          <li><router-link to="/cv"><a>声优情报</a></router-link></li>
          <li><a>日志情报</a></li>
          <li><a>情报上交</a></li>
        </ul>
      </div>
      <div class="header-search">
        <form>
          <input class="form-input" placeholder="情报搜索">
          <button><i class="iconfont icon-search"></i></button>
        </form>
      </div>
      <div class="header-login">
        <a><img src="/static/images/un-login.png"></a>
        <div class="login-box">
          <ul v-if="!isLogin">
            <li class="guide"></li>
            <li class="text line"><router-link to="/login">登录</router-link></li>
            <li class="text"><router-link to="/register">注册</router-link></li>
          </ul>
          <ul v-else>
            <li class="guide"></li>
            <li class="text line"><a>个人中心</a></li>
            <li class="text"><a @click="logout">退出</a></li>
          </ul>
        </div>
      </div>
    </section>
    
  </header>
</template>

<script>
  import {star} from "@/assets/js/plugin/stars.js"
   
  export default {

    data: function(){
      return{
        isLogin: false
      }
    },
    created: function(){
      let vw = this;

      //是否是登录状态
      this.$http.post('/api/user/autoLogin', {}, {}).then(function(res){
        if( res.data.code == '10000' ){
          vw.isLogin = true;
        }
      })
    },
    methods: {
      logout: function() {
        var vw = this;
        //退出
        this.$http.post('/api/user/logout', {}, {}).then(function(res){
          if( res.data.code == '10000' ){
            vw.isLogin = false;
          }
        })
      }
    },
    mounted(){
      star("stars");
    }
  }
</script>
