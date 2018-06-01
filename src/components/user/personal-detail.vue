<template>
  <section class="personal-detail">
    <form>
      <div class="group-box">
        <label>昵称：</label>
        <input type="text" name="name" v-model="params.userName" readonly="true">
        <p class="error">{{ error.userName }}</p>
      </div>

      <div class="group-box">
        <label>性别：</label>
        <div class="sex-btn" v-for="(item, i) in sexArr" @click="selSex(i)" :class="{'active': sexIde == i}">{{ item }}</div>
<!--         <div class="sex-btn">男</div>
        <div class="sex-btn">女</div> -->
      </div>
      <div class="group-box">
        <label>邮箱：</label>
        <input type="text" name="mail" v-model="params.mail" class="mail">
        <p class="error">{{ error.mail }}</p>
      </div>
      <div class="group-box">
        <label>头像：</label>
        <img :src="params.profile" width="75" height="75">
        <a class="edit-btn" @click="clickImg()">编辑...</a>
      </div>
      <div class="none">
        <input type="text" name="sex" v-model="params.sex">
        <input type="text" name="profile" v-model="params.profile">
      </div>
      <div class="wraper">
        <a class="btn" @click="saveInfo()">保存</a>
        <div class="load-container load-posi" v-if="load">
          <div class="loader">
          </div>
        </div>
        <div class="load-container load-text" v-if="saveStatus">
          信息已修改!
        </div>
      </div>
    </form>
    <form enctype="multipart/form-data" class="none">
      <input type="file" name="image" ref="userImg" @change="updateImg()">
    </form>
  </section>
</template>

<script>
  export default {
    props: ['userInfo'],
    data: function() {
      return{
        sexIde: 0,
        sexArr: ['男', '女'],
        imgUrl: '',
        load: false,
        saveStatus: false,
        params: {
          userName: '',
          sex: '',
          mail: '',
          profile: ''
        },
        error: {
          userName: '',
          mail: ''
        }
      }
    },
    created: function(){
      let vw = this;

      vw.params.userName = vw.userInfo.name;
      vw.params.sex      = vw.userInfo.sex;
      vw.sexIde          = vw.userInfo.sex;
      vw.params.mail     = vw.userInfo.mail;
      vw.params.profile  = vw.userInfo.profile;
    },
    methods: {
      clickImg: function(){
        let vw = this;

        vw.$refs.userImg.click();
      },
      updateImg: function(){
        let vw = this;
        let fileDom = vw.$refs.userImg;
        let formData = new FormData();
        let config = { headers: {'Content-Type': 'multipart/form-data'} };

        formData.append('logo', fileDom.files[0]);
        vw.$http.post('/api/upload/vueUploadImage', formData, config).then(function(data){
          vw.params.profile = data.data.path;
        });
      },
      selSex: function(idx){
        let vw = this;

        vw.sexIde = idx;
        vw.params.sex = idx;
      },
      saveInfo: function(idx){
        let vw  = this;
        
        vw.load       = true;
        if( vw.valid() ) {
          let index = window.location.href.indexOf('id=');
          let id    = window.location.href.substring(index+3);

          vw.$http.post('/api/user/updateUserInfo', {data: vw.params, id: id}, {}).then(function(data){
            if(data.data.code == '10000'){
              vw.load = false;
              vw.saveStatus = true;
              setTimeout(function(){
                vw.saveStatus = false;
              }, 1500);
            }
          });
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
        let vw = this;
        let emptyError = {
          userName: '用户名不为空'
        }
        let regMail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

        if (vw.params[key] == "" && key == 'userName') {
          vw.error[key] = emptyError[key];
        } else if (key == "userName" && vw.params[key].length <= 3){
          vw.error[key] = '用户名大于3位';
        } else if (key == "mail" && !regMail.test(vw.params[key]) && vw.params[key]) {
          vw.error[key] = '邮箱格式不对';
        } else {
          vw.error[key] = '';
          return true;
        }
        return false;
      }
    },
    watch: {
      'params.userName': function () {
        let vw = this;

        vw.validate('userName');
      },
      'params.mail': function () {
        let vw = this;

        vw.validate('mail');
      }
    }
  }
</script>