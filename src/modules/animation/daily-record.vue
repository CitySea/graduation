<template>
  <section id="app" class="daily-record">
    <section class="contain">
      <Mheader></Mheader>
      <section class="header flex">
        <div class="title flex-2">
          <label>请输入标题：</label><input type="text" v-model="title">
          <p v-if="error.title != ''" class="error">{{ error.title }}</p>
        </div>
        <div class="bangumi flex-2">
          <span>日志所属：</span>
          <img :src="info.small_show_pic" width="50" height="50">
          <div class="box">
            <p class="first">{{ info.name }}</p>
            <p class="last">{{ info.cnname }}</p>
          </div>
        </div>
        <div class="flex-1" :class="{'msgError': msg != ''}">
          <p>{{ msg }}</p>
        </div>
      </section>
      <section class="content">
        <p class="label">正文:</p>
        <Vueditor ref="ref1"></Vueditor>
        <p class="error-color">{{ error.content }}</p>
        <a class="btn right" @click="upJour()">提交</a>
      </section>
    </section>  
  </section>
</template>

<script>
  import Mheader from "@/components/main-header.vue"
  import Mfooter from "@/components/main-footer.vue"

  export default {
    components: {
      Mheader,
      Mfooter,
    },
    created: function(){
      let vw = this;
      let index;

      if( window.location.href.indexOf('banId') > -1 ){
        index = window.location.href.indexOf('banId=');
        vw.id = window.location.href.substring(index+6);
        vw.type  = 0;

      } else {
        index = window.location.href.indexOf('bookId=');
        vw.id = window.location.href.substring(index+7);
        vw.type  = 1; 
      }

      //获取信息
      vw.$http.post('/api/user/info', {id: vw.id, type: vw.type}, {}).then(function(data){
        if( data.data.code == '11000' ){
          vw.info = data.data.info;
        }
      });
    },
    data: function(){
      return{
        title: '',
        info: {},
        id: 0,
        type: 0,
        error: {
          title: '',
          content: ''
        },
        msg: ''
      }
    },
    methods: {
      upJour: function(){
        let vw = this;
        let content; 
        let status = true;
        let regx = /<[^>]*>|<\/[^>]*>/gm;

        vw.$nextTick(() => {
          content = vw.$refs.ref1.getContent();
          content = content.replace(regx, "").replace(/&nbsp; /g, "").replace(/&nbsp;\s*/g, "");
          if( vw.title == '' ){
            status = false;
            vw.error.title = '标题未填写';
            let i = setTimeout(function(){
              vw.error.title = '';
            }, 2000);
          }
          if( content.length == 0 ){
            status = false;
            vw.error.content = '正文未填写...';
            let i = setTimeout(function(){
              vw.error.content = '';
            }, 2000);
          }
          if( status ){
            content = vw.$refs.ref1.getContent();
            vw.$http.post('/api/user/addShare', {id: vw.id, type: vw.type, title: vw.title, content: content}, {}).then(function(data){
              if(data.data.code == '11000'){
                vw.msg = '日志上传完成...1s后将自动跳转';
                setTimeout(function(){
                  vw.msg = '';
                  window.location.href = '/#/journal';
                }, 2000);
              }else{
                vw.msg = data.data.msg;
                setTimeout(function(){
                  vw.msg = '';
                }, 3000);
              }
            })
          }
        });
      }
    },
    mounted(){

    },
    watch: {
     
    }
  }
</script>