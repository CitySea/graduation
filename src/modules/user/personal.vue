<template>
  <section id="app" class="person-center">
    <section class="contain">
      <Mheader></Mheader>
      <section class="header flex flex-align-end">
        <div class="header-img">
          <img :src="profile">
        </div>
        <div class="header-bar">
          <p>{{ userName }}</p>
          <ul>
            <li v-for="(item,index) in barArray" :class="{active: index == ide}"><a @click="ide = index">{{ item }}</a></li>
          </ul>
        </div>
      </section>

      <section class="content">
        <personalDetail v-if="ide == 0 && isShowBaseInfo" :user-info="userInfo"></personalDetail>
        <personalStars v-if="ide == 1 && isShowStarsInfo" :stars-info="starsInfo"></personalStars>
        <personalJournal v-if="ide == 2 && isShowJournalInfo" :journal-info="journalInfo"></personalJournal>
      </section>

    </section>  
  </section>
</template>


<script>
  import Mheader from "@/components/main-header.vue"
  import Mfooter from "@/components/main-footer.vue"
  import personalDetail from "@/components/user/personal-detail.vue"
  import personalStars from "@/components/user/personal-stars.vue"
  import personalJournal from "@/components/user/personal-journal.vue"
  export default {
    components: {
      Mheader,
      Mfooter,
      personalDetail,
      personalStars,
      personalJournal
    },
    created: function(){
      var vw = this;
      let index = window.location.href.indexOf('id=');
      let id    = window.location.href.substring(index+3);

      vw.$http.post('/api/user/autoLogin', {}, {}).then(function(res){
        if( res.data.code == '10000' ){
          if(id == res.data.data[0].id){
            vw.getUserInfo();
            vw.getUserStars();
            vw.getUserJournal();
          }else{
            window.location.href = '/#/home'
          }
        }
      }).catch(function(err){
        console.log(err);
      });
      
    },
    data: function(){
      return{
        ide: 0,
        barArray: ['个人信息', '收藏', '日志'],
        profile: '', 
        userName: '',
        userInfo: '',
        starsInfo: {},
        journalInfo: {},
        isShowBaseInfo: false,
        isShowStarsInfo: false,
        isShowJournalInfo: false,
      }
    },
    methods: {
      getUserInfo: function(){
        let vw = this;
        let index = window.location.href.indexOf('id=');
        let id    = window.location.href.substring(index+3);

        vw.$http.post('/api/user/getUserInfo', {id: id}, {}).then(function(data){
          
          if(data.data.code == '10000'){
            vw.profile  = data.data.data[0].profile;
            vw.userName = data.data.data[0].name;
            vw.isShowBaseInfo = true;
            vw.userInfo = data.data.data[0];
          }
        });
      },
      getUserStars: function(){
        let vw = this;
        let index = window.location.href.indexOf('id=');
        let id    = window.location.href.substring(index+3);

        vw.$http.post('/api/user/userStars', {id: id}, {}).then(function(data){
          if(data.data.code == '10000'){
            vw.isShowStarsInfo = true;
            vw.starsInfo       = data.data.data;
          }
        });
      },
      getUserJournal: function(){
        let vw = this;
        let index = window.location.href.indexOf('id=');
        let id    = window.location.href.substring(index+3);

        vw.$http.post('/api/user/userJournal', {id: id}, {}).then(function(data){
          if(data.data.code == '11000'){
            vw.journalInfo  = data.data.data;
            vw.isShowJournalInfo = true;
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