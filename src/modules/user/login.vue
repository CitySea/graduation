<template>
	<section id="app" class="user login">
    <div class="contain">
      <Mheader></Mheader>
      <section class="user-wrapper">
        <div class="user-form-wrap">
          <h1>进入情报站</h1>
          <div>
            <div class="user-box-left left">
            	<form class="user-form">
                <div class="group-box">
                  <div class="form-group">
                    <i class="iconfont icon-user"></i><input type="text" placeholder="请输入用户名" v-model='params.userName'> 
                  </div>
                  <p>{{ error.userName }}</p>
                </div>
                <div class="group-box">
                  <div class="form-group">
                    <i class="iconfont icon-password"></i><input type="password" placeholder="请输入密码" v-model='params.userPwd'>
                  </div>
                  <p>{{ error.userPwd }}</p>
                </div>
               <a class="btn" @click="login">登录</a>
              </form>
            </div>
            <div class="user-box-right right">
              <p>没有帐号，请注册撒ლ(＾ω＾ლ)</p>
              <router-link class="btn" to="/register">前往注册</router-link>
            </div>
          </div>
        </div>
      </section>
      <Mfooter></Mfooter>
    </div>  
  </section>
</template>


<script>
  import Mheader from "@/components/main-header.vue"
	import Mfooter from "@/components/main-footer.vue" 
	export default {
    components: {
      Mheader,
      Mfooter
    },
	  created: function(){
	  },
	  data: function(){
	  	return{
        params: {
          userName: '',
          userPwd: ''
        },
        error: {
          userName: '',
          userPwd: ''
        }
      }
	  },
    methods: {
      //登录
      login: function () {
        var vw = this;
        
        if( vw.valid() ) {
          this.$http.post('/api/user/userLogin', vw.params, {}).then(function(res){
            if(res.data.code === '10000'){
              window.location.href = "/#/home"
            }else{
              if(res.data.code === '10002'){
                vw.error.userPwd = res.data.msg;
              }
            }
          })
        } else {
          console.log("error");
        }
      },
      valid: function() {
        var vw = this;
        var validStatus = true;

        for (var key in vw.params) {
          if( !vw.validate(key) ){
            validStatus = false;
          } 
        }
        return validStatus;
      },
      //表单校验
      validate: function (key) {
        var vw = this;
        var emptyError = {
          userName: '用户名不为空',
          userPwd: '密码不为空',
          reUserPwd: '确认密码不为空'
        }

        if (vw.params[key] == "") {
          vw.error[key] = emptyError[key];
        } else if (key == "userName" && vw.params[key].length <= 3){
          vw.error[key] = '用户名大于3位';
        } else if (key == "userPwd" && vw.params[key].length < 6) {
          vw.error[key] = '密码不能少于6位';
        } else {
          vw.error[key] = '';
          return true;
        }
        return false;
      }
    },
    watch: {
      'params.userName': function () {
        this.validate('userName');
      },
      'params.userPwd': function () {
        this.validate('userPwd');
      }
    }
	}
</script>