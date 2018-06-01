<template>
  <section id="app" class="daily-record">
    <section class="contain">
      <Mheader></Mheader>
      <section class="header flex">
        <div class="title flex-2">
          <p>{{ info.title }}</p>
        </div>
        <div class="bangumi flex-2">
          <span>发布人：</span>
          <img :src="info.profile" width="50" height="50">
          <div class="box">
            <p class="first">{{ info.userName }}</p>
            <p class="last">时间：{{ info.shareTime }}</p>
            <span class="tag-name small-text" v-if="isSelf" @click="delSelfJournal()">
              <i class="iconfont icon-delete"></i>删除日志
            </span>
            <span class="small-text" v-if="succ">删除成功1s后...将自动跳转到日志首页</span>
            <span class="small-text" v-if="erro">登录状态失效1s后...将跳转到登录界面</span>
          </div>
        </div>
      </section>
      <section class="content detail-content" v-html="info.content"></section>

      <section class="reply-box">
        <li class="flex flex-align-start discuss-li" v-for="(item, i) in discuss">
          <div class="sm-img">
            <img :src="item.profile" width="50" height="50">
          </div>
          <div class="sm-discuss">
            <p class="name">{{ item.name }}</p>
            <p class="discuss-content">{{ item.content }}</p>
            <p class="reply"><span class="time">{{ item.time }}</span><span class="reply-span" v-if="isLogin" @click="discussOne(i)"><i class="iconfont icon-reply"></i><span>回复</span><span v-if="item.replyNum != 0">+{{ item.replyNum }}</span></span></p>
            <div class="reply-one" v-if="discussIdex == i">
              <li class="reply-more" v-for="(it,j) in item.reply" v-if="item.replyNum != 0">
                <div class="flex flex-align-start">
                  <div>
                    <img width="25" height="25" :src="it.fromProfile">
                  </div>
                  <div class="reply-text flex flex-align-start">
                    <div class="">{{ it.fromName }}<span v-if="it.replyType != 0">回复{{ it.toName }}</span>：</div>
                    <div class="last">
                      <p>{{ it.content }}</p>
                    </div>
                  </div>
                </div>
                <p class="reply-time">
                  <span>{{ it.time }}</span>
                  <span class="reply-span" @click="discussMore(i, j)">
                    <i class="iconfont icon-reply"></i><span>回复</span>
                  </span>
                </p>
              </li>
              <p class="one" v-if="item.replyNum != 0" @click="discussMore(-1,-1)">我也说一句</p>
              <div v-if="isEmpty">
                <textarea v-model="discussOneContent"></textarea>
                <a @click="pushOneInfo(item.userId, item.discussId)">提交</a>
                <br>
                <p class="error-color" v-if="oneError !=''">回复不能为空</p>
              </div>
            </div>
          </div>
        </li>
      </section>
      
      <section class="login-wbox" v-if="!isLogin">
        <p><router-link :to="'/login'"><i class="iconfont icon-password"></i>请登录进行回复</router-link></p>
      </section>

      <section class="discuss-box flex flex-align-start" v-else>
        <div class="base-box">
          <img :src="user.profile" width="50" height="50">
          <p>{{ user.name }}</p>
        </div>
        <div class="edit-box">
          <textarea v-model="discussContent"></textarea>
          <p v-if="discussError != ''" class="error-color">{{ discussError }}</p>
          <br>
          <a class="btn" @click="addDiscuss()">评论</a>
        </div>
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

      vw.$http.post('/api/user/dailyDetailInfo', {id: vw.id, type: vw.type}, {}).then(function(data){

        if( data.data.code == '11000' ){
          vw.info = data.data.data.info;
          vw.user = data.data.data.user;
          // vw.discuss = data.data.data.discuss;
          if(vw.info.userId == vw.user.id){
            vw.isSelf = true;
          }else{
            vw.isSelf = false;
          }
          vw.isLogin  = true;
        }else if(data.data.code == '11011'){//未登录
          vw.info = data.data.data.info;
          // vw.discuss = data.data.data.discuss;
          vw.isSelf  = false;
          vw.isLogin = false;
        }

        vw.getAllInfo();
      });

      
    },
    data: function(){
      return{
        id: 0,
        type: 0,
        info: {},
        user: {},
        discuss: [],
        discussOneContent: '',
        isLogin: false,
        isSelf: false,
        discussContent: '',
        discussError: '',
        discussIdex: -1,
        prevDiscussIdex: -1,
        oneError: '',
        isEmpty: false,
        toUId: 0,
        toUserName: '',
        succ: false,
        erro: false,
      }
    },
    methods: {
      addDiscuss: function(){
        let vw = this;

        if( vw.discussContent.length == 0 ){
          vw.discussError = '评论内容不能为空';
        }else{
          let params = {
            dailyId: vw.info.id,
            userId: vw.user.id,
            discuss: vw.discussContent,
            type: vw.type
          }
          vw.$http.post('/api/user/addDiscuss', params, {}).then(function(data){
            vw.getAllInfo();
          })
        }
      },
      discussOne: function(idx){
        let vw = this;

        if( vw.discussIdex != -2) {
          if(vw.discussIdex != idx){
             vw.discussOneContent = '';
          }
        }

        if(vw.discuss[idx].replyNum == 0){
          vw.isEmpty = true;
        }else{
          vw.isEmpty = false;
        }
        vw.discussIdex = vw.discussIdex == idx ? -2 : idx;
      },
      discussMore: function(discussIdx, replyIdx){
        let vw = this;

        // vw.toUId = vw.discuss[discussIdx].reply[replyIdx];
        if(discussIdx == -1){
          vw.toUId = 0;
          vw.isEmpty = true;
          vw.discussOneContent = "";
        }else{
          vw.toUId = vw.discuss[discussIdx].reply[replyIdx].fromUid;
          vw.toUserName = "";
          vw.toUserName = "对 " + vw.discuss[discussIdx].reply[replyIdx].fromName + "：";
          vw.discussOneContent = vw.toUserName;
          vw.isEmpty = true;
        }
        
      },
      pushOneInfo: function(userId, discussId){//对评论的回复
        let vw =  this;

        if(vw.discussOneContent.replace(/\s+/g, "").length == 0){
          vw.toUId = 0;
          vw.oneError = '回复不能为空';
          setTimeout(function(){
            vw.oneError = '';
          },1500);
        }else{
          //提交,回复评论
          if(vw.toUId == 0){

            let params = {
              dailyId: vw.info.id,
              type: vw.type,
              toId: userId,
              reply_type: 0,
              discussId: discussId,
              content: vw.discussOneContent
            }
            vw.$http.post("/api/user/replyOne", params, {}).then(function(data){
              if(data.data.code = '11000'){
                vw.getAllInfo();
              }
            });
          }else{//提交,回复回复
            let params = {
              dailyId: vw.info.id,
              type: vw.type,
              toId: vw.toUId,
              reply_type: 1,
              discussId: discussId,
              content: vw.discussOneContent
            }

            if(vw.discussOneContent.indexOf(vw.toUserName) > -1 && vw.discussOneContent.replace(/\s+/g, "").length == vw.toUserName.replace(/\s+/g, "").length){
              vw.oneError = '回复不能为空';
              setTimeout(function(){
                vw.oneError = '';
              },1500);
            }else{
              params.content = params.content.replace(vw.toUserName, "");
              vw.$http.post("/api/user/replyOne", params, {}).then(function(data){
                if(data.data.code = '11000'){
                  vw.getAllInfo();
                }
              });
            }
            
          }
        }
      },
      getAllInfo: function(){
        let vw = this;

        vw.$http.post("/api/user/getAllInfo", {type: vw.type, dailyId: vw.info.id}, {}).then(function(data){
          vw.toUId = 0;
          vw.discussOneContent = "";
          vw.discuss = data.data.data;
        })
      },
      delSelfJournal: function(){
        let vw = this;

        vw.$http.post("/api/user/delSelfJournal", {type: vw.type, dailyId: vw.info.id}, {}).then(function(data){
          if(data.data.code == '11000'){
            vw.succ = true;
            setTimeout(function(){
              window.location.href = "/#/journal";
            },1000);
            
          }else{
            vw.erro = true;
            setTimeout(function(){
              window.location.href = "/#/login";
            },1000);
          }
        })
      }
    },
    mounted(){

    },
    watch: {
      'discussContent': function () {
        let vw = this;

        if(vw.discussContent.length == 0){
          vw.discussError = '评论内容不能为空';
        }else{
          vw.discussError = '';
        }
      },
    }
  }
</script>