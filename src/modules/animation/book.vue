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
                    <p class="title"><i class="iconfont icon-attention"></i><span>{{ item.num }}</span></p>
                  </div>
                  <p class="count">{{ item.title }}</p>
              </li>
            </ul>
          </section>
          <Pagination :page-ide="ide"></Pagination>
        </section>
        <section class="left side-right-bar">
          <section class="tile">
            <p>书籍情报</p>
          </section>
          <section class="type-box">
            <p class="title">类型</p>
            <ul class="flex">
              <li class="type-list flex-1" v-for="item in typeArray">
                <a class="text">{{ item }}</a>
              </li>
            </ul>
          </section>
          <section class="type-box">
            <p class="title">地区</p>
            <ul class="flex">
              <li class="type-list flex-1" v-for="item in areaArray">
                <a class="text">{{ item }}</a>
              </li>
            </ul>
          </section>
          <section class="type-box time-box">
            <p class="title">时间</p>
            <ul class="time-height" :class="{'show-time-height': isShowTime}">
              <li class="type-list" v-for="item in timeArray">
                <a class="text">{{ item }}</a>
              </li>
              <li class="type-list">
                <a class="text last" @click="showTimeList(testTime)">{{ testTime }}</a>
              </li>
            </ul>
          </section>
          <section class="type-box time-box">
            <p class="title">标签</p>
            <ul class="tag-height" :class="{'show-tag-height': isShowTag}">
              <li class="type-list" v-for="item in tagArray">
                <a class="text">{{ item }}</a>
              </li>
              <li class="type-list">
                <a class="text last" @click="showTagList(testTag)">{{ testTag }}</a>
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
        ide: 2,
        testTime: "+展开",
        testTag: "+展开",
        itemToal: [
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '520'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '520'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '520'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '520'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '2653'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1351'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '1300'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '985'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '书籍标题' , num: '520'}
        ],
        sort: ['动画', '书籍', '声优'],
        week: ['今天', '明天'],
        typeArray: ['全部', '漫画', '小说', '画集', '其他'],
        areaArray: ['全部', '日本', '中国', '美国', '其他'],
        timetempA: [],
        tagtempA: [],
        timeArray: ['2018', '2017', '2016', '2015', '2014', '2013', '2012'],
        timetArray: ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000'],
        tagArray: ['全部', '清改', '萌系', '搞笑', '热血', '催泪', '后宫', '机战', '恋爱', '百合', '推理'],
        tagtArray: ['全部', '清改', '萌系', '搞笑', '热血', '催泪', '后宫', '机战', '恋爱', '百合', '推理', '时泪', '基腐', '悬疑', '励志', '日常', '职场', '魔法', '泡面', '社团', '音乐', '校园'],
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
        ],
        isShowTime: false,
        isShowTag: false
      }
    },
    methods: {
      showTimeList: function (index) {
        var vw = this;

        if( index.indexOf('+') > -1){
          vw.timetempA = vw.timeArray;
          vw.timeArray = vw.timetArray;

          vw.testTime = '-折叠';
          vw.isShowTime = true;
        }else{
          vw.timeArray = vw.timetempA;

          vw.testTime = '+展开';
          vw.isShowTime = false;
        }
      },
      showTagList: function(index) {
        var vw = this;

        if( index.indexOf('+') > -1){
          vw.tagtempA = vw.tagArray;
          vw.tagArray = vw.tagtArray;

          vw.testTag = '-折叠';
          vw.isShowTag = true;
        }else{
          vw.tagArray = vw.tagtempA;

          vw.testTag = '+展开';
          vw.isShowTag = false;
        }
      }
    },
    mounted(){
      
    }
  }
</script>