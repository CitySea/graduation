<template>
	
	<section id="app">
		<section class="detail-header">
			<div class="detail-header-bg blur">
			</div>
			<header class="header">
				<section class="left">
					<section class="header-img left">
						<img :src="baseInfo.show_pic">
					</section>
					<section class="header-detail left">
						<h1>{{ baseInfo.name }} / {{ baseInfo.cnname }}</h1>
						<p class="first">放送时间: {{ baseInfo.start_date }}</p>
						<p>总话数: {{ baseInfo.progress_total }}话</p>
					</section>
          <div class="stars-box">
            <i class="iconfont icon-attention" @click="starsTatus()" :class="{'active': isShowStars}"></i>
            <p class="text" v-if="isShowStars">已收藏</p>
            <p class="text-none" v-else>未收藏</p>
            <section class="score-popup" v-if="isShowStarsPopup"  @mouseleave = 'leaveScorePopup()'>
              <section class="score-box flex">
                <p>评分：</p>
                <ul class="score-ul" @mouseleave = 'leaveScore()'>
                  <li class="iconfont icon-attention" v-for="(item, i) in liArr" :class="{'active': i <= starsIdx}" @mouseenter="starsIdx = i" @click="getScore(i)"></li>
                </ul>
              </section>
            </section>
            <section class="score-popup del-score-popup" v-if="isShowdelStarsPopup">
              <section class="score-box flex">
                <p>取消收藏成功</p>
              </section>
            </section>
            <section class="score-popup add-score-popup" v-if="isShowStarstilePopup">
              <section class="score-box flex">
                <p>收藏成功</p>
              </section>
            </section>
            <section class="score-popup add-score-popup" v-if="isLogin">
              <section class="score-box flex">
                <p>请先登录</p>
              </section>
            </section>
          </div>
				</section>
				<section class="right">
					<section class="score-box">
						<div class="score-detail">
							<div class="flex">
								<p class="flex-1">情报排名:1</p>
								<p class="flex-1 text-right">评分：{{ totalScore }}</p>
							</div>
							<ul>
								<li v-for="item in scoreArr">
									<a :title="item.title"><span class="process-bar" :style="{height: item.rate}"></span><span class="score-text">{{ item.score }}</span></a>
								</li>
							</ul>
						</div>
					</section>
				</section>
			</header>
		</section>
	</section>
</template>

<script>
	export default {
    props: ['dataInfo'],
    created: function(){
      let vw = this;

      vw.baseInfo = vw.dataInfo.base[0];
      vw.banId    = vw.baseInfo.id;

      //查看是否收藏该番剧
      vw.$http.post('/api/manage/bgmiManage/ShowStars', {id: vw.banId}, {}).then(function(data){
        if(data.data.code == '11000'){
          //已收藏
          vw.isShowStars = true;
        }
      });
      //番剧评分详情
      vw.getScoreDetail();
    },
    data: function(){
      return{
        banId: 0,
      	baseInfo: {},
        isShowStars: false,
        scoreArr: [],
        liArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        isShowStarsPopup: false,
        isShowStarstilePopup: false,
        isShowdelStarsPopup: false,
        isSureScore: false,
        isLogin: false,
        score: 0,
        totalScore: 0,
        starsIdx: -1,
      }
    },
    methods: {
      leaveScorePopup: function(){
        var vw =  this;

        vw.isShowStarsPopup = false;
      },
      leaveScore: function(idx){
        var vw =  this;

        if( !vw.isSureScore ){
          vw.starsIdx = -1;
        }
      },
      getScore: function(idx){
        var vw =  this;

        vw.isSureScore = true;
        vw.isShowStarsPopup = false;
        vw.score = idx + 1;
        //评分
        vw.$http.post('/api/manage/bgmiManage/saveScore', {id: vw.banId, score: vw.score, name: vw.baseInfo.name}, {}).then(function (data){
          if(data.data.code == '11000'){

            vw.isShowStarstilePopup = true;
            vw.isShowStars = true;
            vw.getScoreDetail();

            setTimeout(function(){
              vw.isShowStarstilePopup = false;
            }, 1500);
          }
        });
      },
      starsTatus: function(){
        var vw = this;

        vw.starsIdx = -1;
        if(vw.isShowStars){
          //取消收藏
          vw.isShowStarsPopup = false;
          vw.$http.post('/api/manage/bgmiManage/delScore', {id: vw.banId}, {}).then(function (data){
            if(data.data.code == '11000'){

              vw.isShowdelStarsPopup = true;
              vw.isShowStars = false;
              vw.getScoreDetail();

              setTimeout(function(){
                vw.isShowdelStarsPopup = false;
              },1500);
            }
          });
        }else{
          //收藏
          vw.$http.post('/api/manage/bgmiManage/isLogin', {}, {}).then(function(data){
            if(data.data.code == '11000'){
              vw.isShowStarsPopup = true;
            }else{
              vw.isLogin = true;

              setTimeout(function(){
                vw.isLogin = false;
              },1500);
            }
          });
          
        }
      },
      //获取评分详情
      getScoreDetail: function(){
        var vw = this;

        vw.scoreArr = [];
        vw.$http.post('/api/manage/bgmiManage/showScoreDetail', {id: vw.banId}, {}).then(function(data){
          let obj = data.data.data;

          if(data.data.code == '11000'){
            vw.totalScore = obj.totalScore.toFixed(2);
            for(let i = 0; i < obj.detail.length; i++){
              if(obj.num != 0){
                let temp = {};

                temp.score = i + 1;
                temp.rate  = (obj.detail[i] / obj.num).toFixed(2);
                if( temp.rate < 1){
                  temp.rate = temp.rate.slice(2, 4) + '%';
                }else{
                  temp.rate = temp.rate.slice(0, 4) * 100 + '%';
                }
                temp.title =  obj.detail[i] + "人评分";
                vw.scoreArr.push(temp);
              }else{
                let temp = {score: i + 1, rate: '0%', title: '没人评分'};

                vw.scoreArr.push(temp);
              }
            }
          }
        })
      }
    },
    mounted(){
      
    }
	}
</script>