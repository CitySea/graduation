<template>
	<section id="app" class="home">
    <section class="contain">
      <Mheader></Mheader>
      <section class="home-banner flex">
        <section class="left-text">
          <p class="fadeInUp">夏日祭，</p>
          <p class="space-2 fadeInUp">修学旅行，</p>
          <p class="space-4 fadeInUp">更多更多的场景。。。</p>
          <p class="space-6 fadeInUp">动画，是我们共同的爱好，</p>
          <p class="space-8 fadeInUp">加入我们，一起享受动画的乐趣！</p>
        </section>
      </section>
      <section class="home-wrapper">
        <section class="left max-width">
          <section class="list">
            <section class="flex list-bar">
              <h1>{{ sort[0] }}</h1>
              <div class="bar">
                <a class="refresh-btn" @click="getHotBangumi()"><i class="iconfont icon-refresh"></i><span>刷新</span></a>
                <router-link class="more-btn" to="/animate"><span>查看更多</span></router-link>
              </div>
            </section>
            <ul>
              <li v-for="(item,i) in hotBanInfo" v-if="hotBanInfo">
                <router-link :to="'/animate/detail?id=' + item.bangumiId">
                  <div class="img-box">
                    <img :src="item.bangumiImg">
                    <p class="title">{{ item.name }}</p>
                  </div>
                  <p class="count"><i class="iconfont icon-heat"></i><span>{{ item.hotNum }}</span></p>
                </router-link>
              </li>
            </ul>
          </section>
          <section class="list">
            <section class="flex list-bar">
              <h1>{{ sort[1] }}</h1>
              <div class="bar">
                <a class="refresh-btn" @click="getHotBook()"><i class="iconfont icon-refresh"></i><span>刷新</span></a>
                <router-link class="more-btn" to="/book"><span>查看更多</span></router-link>
              </div>
            </section>
            <ul>
              <li v-for="(item,i) in hotBookInfo" v-if="hotBookInfo.length != 0">
                <router-link :to="'/book/detail?id=' + item.bookId">
                  <div class="img-box">
                    <img :src="item.bookImg">
                    <p class="title">{{ item.name }}</p>
                  </div>
                  <p class="count"><i class="iconfont icon-heat"></i><span>{{ item.hotNum }}</span></p>
                </router-link>
              </li>
            </ul>
          </section>
          <section class="list">
            <section class="flex list-bar">
              <h1>{{ sort[2] }}</h1>
              <div class="bar">
                <a class="refresh-btn" @click="getRandomCv()"><i class="iconfont icon-refresh"></i><span>随便看看</span></a>
                <router-link to="/cv" class="more-btn"><span>查看更多</span></router-link>
              </div>
            </section>
            <ul>
              <li v-for="(item,i) in hotCvInfo">
                  <div class="img-box">
                    <img :src="item.small_show_pic">
                    <p class="title">{{ item.name }}</p>
                  </div>
              </li>
            </ul>
          </section>
        </section>
        <section class="left side-right-bar">
          <section class="tile">
            <p>静候时光</p>
          </section>
          <section class="dynamic-more">
            <p class="title">刚刚...</p>
            <ul>
              <li class="dynamic-list flex" v-for="item in eventInfo">
                <div class="img-box">
                  <img :src="item.profile" class="header">
                </div>
                <p class="text">{{ item.userName }}{{ eventType[item.eventType] }}<router-link :to="eventUrl[item.type][item.eventType] + item.keyId"><span class="tag-name">{{ item.eventContent }}</span></router-link></p>
              </li>
            </ul>
          </section>
        </section>
      </section>
      <Mfooter></Mfooter>
    </section>  
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
	  	let vw = this;

      vw.getHotBook();
      vw.getHotBangumi();
      vw.getRandomCv();
      vw.getEvent();
	  },
	  data: function(){
	  	return{
        hotBookInfo: [],
        hotCvInfo:   [],
        hotBanInfo: [],
        eventInfo: [],
        eventType: ['收藏了','发表了日志'],
        eventUrl: [
          ['/animate/detail?id=', '/journal/detail?banId='], 
          ['/book/detail?id=', '/journal/detail?bookId=']
        ],
        sort: ['动画', '书籍', '声优'],
        week: ['今天', '明天'],
        timeText: [
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女凑数字111111挤下去再加下fdsf'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女凑数字111111挤下去再加下fdsf'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女凑数字111111挤下去再加下fdsf'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女凑数字111111挤下去再加下fdsf'}
        ],
      }
	  },
	  mounted(){
	  	
	  },
    methods: {
      getHotBook:function(){
        let vw = this;

        vw.$http.post("/api/user/getHotBook", {}, {}).then(function(data){
          if(data.data.code == "11000"){
            vw.hotBookInfo = data.data.data;
            console
          }
        });
      },

      getHotBangumi: function(){
        let vw = this;

        vw.$http.post("/api/user/getHotBangumi", {}, {}).then(function(data){
          if(data.data.code == "11000"){
            vw.hotBanInfo = data.data.data;
          }
        });
      },
      getRandomCv: function(){
        let vw = this;

        vw.$http.post("/api/user/getRandomCv", {}, {}).then(function(data){
          if(data.data.code = "11000"){
            vw.hotCvInfo = data.data.data;
          }
        });
      },
      getEvent: function(){
        let vw = this;

        vw.$http.post("/api/user/getEvent", {}, {}).then(function(data){
          if(data.data.code == "11000"){
            vw.eventInfo = data.data.data;
          }
        });
      }
    }
	}
</script>