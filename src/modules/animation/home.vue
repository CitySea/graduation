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
          <section class="list" v-for="(items,index) in itemToal">
            <section class="flex list-bar">
              <h1>{{ sort[index] }}</h1>
              <div class="bar">
                <a class="refresh-btn"><i class="iconfont icon-refresh"></i><span>刷新</span></a>
                <a class="more-btn"><span>查看更多</span></a>
              </div>
            </section>
            <ul>
              <li v-for="item in items">
                  <div class="img-box">
                    <img :src="item.imgSrc">
                    <p class="title">{{ item.title }}</p>
                  </div>
                  <p class="count"><i class="iconfont icon-heat"></i><span>{{ item.num }}</span></p>
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
              <li class="dynamic-list flex" v-for="item in timeText">
                <div class="img-box">
                  <img :src="item.imgSrc" class="header">
                </div>
                <p class="text">{{ item.username }}看过{{ item.contain }}</p>
              </li>
            </ul>
          </section>
          <section class="delivery">
            <p class="title">每日放送...</p>
            <section class="calendar-mini">
              <ul>
                <li class="calendar-list" v-for="(items,index) in calendarText">
                  <h3>{{ week[index] }}</h3>
                  <div class="calendar-item">
                    <a href="/" class="calendar-img" v-for="item in items"><div class="img-box"><img :src="item.imgSrc"></div></a>
                  </div>
                </li>
              </ul>
            </section>
            <p class="count">今日上映 14 部。共 5464 人收看今日番组。</p>
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
	  	
	  },
	  data: function(){
	  	return{
        itemToal: [
          [
            { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题' , num: '2653'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题' , num: '1351'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题' , num: '1300'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题' , num: '985'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题' , num: '520'}
          ],
          [
            { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '2653'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1351'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1300'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '985'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '520'}
          ],
          [
            { imgSrc: '/static/images/animation/2.jpg' , title: '声优标题' , num: '2653'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '声优标题' , num: '1351'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '声优标题' , num: '1300'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '声优标题' , num: '985'},
            { imgSrc: '/static/images/animation/2.jpg' , title: '声优标题' , num: '520'}
          ],
        ],
        sort: ['动画', '书籍', '声优'],
        week: ['今天', '明天'],
        timeText: [
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女'},
          { imgSrc: '/static/images/animation/1.jpg' , username: '呆唯' , contain: 'k-on！轻音少女凑数字111111挤下去再加下fdsf'}
        ],
        calendarText: [
          [
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'},
            {imgSrc: '/static/images/animation/4.jpg'}
          ],
          [
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'},
            {imgSrc: '/static/images/animation/5.jpg'}
          ]
        ]
      }
	  },
	  mounted(){
	  	
	  }
	}
</script>