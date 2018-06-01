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
          <li><router-link to="/book">书籍情报</router-link></li>
          <li><router-link to="/cv">人物情报</router-link></li>
          <li><router-link to="/journal">日志情报</router-link></li>
        </ul>
      </div>
      <div class="header-search">
        <div>
          <input class="form-input" placeholder="情报搜索" v-model="name">
          <button @click="search()"><i class="iconfont icon-search"></i></button>
        </div>
      </div>
      <div class="header-login">
        <a><img :src="imgUrl" width="35" height="30" onerror="this.src='/static/images/un-login.png'"></a>
        <div class="login-box">
          <ul v-if="!isLogin">
            <li class="guide"></li>
            <li class="text line"><router-link to="/login">登录</router-link></li>
            <li class="text"><router-link to="/register">注册</router-link></li>
          </ul>
          <ul v-else>
            <li class="guide"></li>
            <li class="text line"><router-link :to="'/user/center?id=' + userId">个人中心</router-link></li>
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
        isLogin: false,
        userId: 0,
        imgUrl: '',
        name: '',
      }
    },
    created: function(){
      let vw = this;

      //是否是登录状态
      vw.$http.post('/api/user/autoLogin', {}, {}).then(function(res){
        if( res.data.code == '10000' ){
          vw.userId  = res.data.data[0].id;
          vw.imgUrl  = res.data.data[0].profile;
          vw.isLogin = true;
        }
      }).catch(function(err){
        console.log(err);
      });
    },
    methods: {
      logout: function() {
        var vw = this;
        //退出
        this.$http.post('/api/user/logout', {}, {}).then(function(res){
          if( res.data.code == '10000' ){
            vw.isLogin = false;
            window.location.href = "/#/login";
          }
        })
      },
      search: function(){
        let vw = this;
        
        // if(window.location.href.indexOf("/#/search?name=") > -1){
        //   location.reload();
        // }else{
          window.location.href = '/#/search?name=' + vw.name + '&type=' + 0;
        // }
      }
    },
    mounted(){
      star("stars");
    }
  }
</script>
