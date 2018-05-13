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
            <ul>
              <li v-for="item in itemToal" class="bottom">
                  <div class="img-box">
                    <img :src="item.imgSrc">
                    <p class="title"><i class="iconfont icon-view"></i><span>{{ item.num }}</span></p>
                    <p class="discuss"><i class="iconfont icon-discuss"></i><span>{{ item.num }}</span></p>
                  </div>
                  <p class="count">{{ item.title }}</p>
              </li>
            </ul>
          </section>
          <Pagination :page-ide="ide"></Pagination>
        </section>
        <section class="left side-right-bar">
          <section class="tile">
            <p>日志情报</p>
          </section>
          <section class="type-box">
            <p class="title">类型</p>
            <ul class="flex">
              <li class="type-list flex-1" v-for="item in typeArry">
                <a class="text">{{ item }}</a>
              </li>
            </ul>
          </section>
          <section class="type-box">
            <p class="title">参与度</p>
            <ul class="flex">
              <li class="type-list flex-1" v-for="item in partake">
                <a class="text">{{ item }}</a>
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
  import Pagination from "@/components/pagination.vue"  
  export default {
    components: {
      Mheader,
      Mfooter,
      Pagination
    },
    created: function(){

    },
    data: function(){
      return{
       typeArry: ['全部', '动画', '书籍', '声优', '放飞自我'],
       ide: 1,
       partake: ['全部', '浏览数', '讨论数', '收藏数'],
       itemToal: [
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '520'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '520'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '520'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '520'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '日志标题' , num: '520'}
        ]
      }
    },
    methods: {
    },
    mounted(){
      
    }
  }
</script>