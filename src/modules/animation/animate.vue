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
                <a :href="'#/animate/detail?id=' + item.id">
                  <div class="img-box">
                    <img :src="item.small_show_pic">
                    <p class="title"><i class="iconfont icon-attention"></i><span>{{ item.stars || 0 }}</span></p>
                  </div>
                  <p class="count">{{ item.name }} / {{ item.cnname }}</p>
                </a>
              </li>
            </ul>
          </section>
          <Pagination :page-ide="ide" :page-total="pagetotal" @now-ide="getIde" v-if="showPage"></Pagination>
        </section>
        <section class="left side-right-bar">
          <section class="tile">
            <p>动画情报</p>
          </section>
          <section class="type-box">
            <p class="title">地区</p>
            <ul class="flex">
              <li class="type-list flex-1" v-for="(item,i) in areaArray">
                <a class="text" :class="{'tag-name': i == areaIdx}" @click="areaIdx = i">{{ item }}</a>
              </li>
            </ul>
          </section>
          <section class="type-box time-box">
            <p class="title">时间</p>
            <ul class="time-height" :class="{'show-time-height': isShowTime}">
              <li class="type-list" v-for="(item,i) in timeArray">
                <a class="text" :class="{'tag-name': i == timeIdx}"  @click="timeIdx = i">{{ item }}</a>
              </li>
              <li class="type-list">
                <a class="text last" @click="showTimeList(testTime)">{{ testTime }}</a>
              </li>
            </ul>
          </section>
          <section class="type-box">
            <p class="title">季度</p>
            <ul class="flex">
              <li class="type-list flex-1" v-for="(item,i) in quarterArray">
                <a class="text" :class="{'tag-name': i == jiduIdx}"  @click="jiduIdx = i">{{ item }}</a>
              </li>
            </ul>
          </section>
          <section class="type-box time-box">
            <p class="title">标签</p>
            <ul class="tag-height" :class="{'show-tag-height': isShowTag}">
              <li class="type-list" v-for="(item,i) in tagArray">
                <a class="text" :class="{'tag-name': item.id == tagsIdx}"  @click="tagsIdx = item.id">{{ item.name }}</a>
              </li>
              <li class="type-list">
                <a class="text last" @click="showTagList(testTag)" v-if="isShowMoreTag">{{ testTag }}</a>
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
      var vw = this;

      vw.getBangumiInfo();
      vw.getTagInfo();
    },
    data: function(){
      return{
        ide: 1,
        pagetotal: 1,
        ahref: "/animate/detail?id=",
        showPage: false,
        testTime: "+展开",
        testTag: "+展开",
        itemToal: [],
        week: ['今天', '明天'],
        areaArray: ['全部', '中国', '日本', '美国', '其他'],
        timetempA: [],
        tagtempA: [],
        timeArray: ['全部', '2018', '2017', '2016', '2015', '2014', '2013'],
        timetArray: ['全部', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000'],
        quarterArray: ['全部', '1月', '4月', '7月', '10月'],
        tagArray: ['全部', '清改', '萌系', '搞笑', '热血', '催泪', '后宫', '机战', '恋爱', '百合', '推理'],
        tagtArray: ['全部', '清改', '萌系', '搞笑', '热血', '催泪', '后宫', '机战', '恋爱', '百合', '推理', '时泪', '基腐', '悬疑', '励志', '日常', '职场', '魔法', '泡面', '社团', '音乐', '校园'],
        isShowTime: false,
        isShowTag: false,
        isShowMoreTag: false,
        areaIdx: 0,
        timeIdx: 0,
        jiduIdx: 0,
        tagsIdx: 0
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
      },
      //页数
      getIde: function(ide) {
        let vw = this;

        vw.ide = ide;
        vw.getBangumiInfo();
      },
      getBangumiInfo: function() {
        let vw = this;
        let limit = 5;
        
        vw.showPage  = false;
        vw.$http.get('/api/manage/bgmiManage/showBangumi?limit=' + limit + '&page=' + vw.ide + '&areaIdx=' + vw.areaIdx + '&timeIdx=' + vw.timeIdx + '&jiduIdx=' + vw.jiduIdx + '&tagsIdx=' + vw.tagsIdx,{}).then(function(res){
          let pageNum;

          if(res.data.count % limit == 0){
            pageNum = parseInt(res.data.count / limit) -1;
          }else{
            pageNum = parseInt(res.data.count / limit);
          }
          vw.pagetotal = pageNum + 1; //总页数
          vw.itemToal  = res.data.data; 
          vw.showPage  = true;
        });
      },
      //获取标签
      getTagInfo: function() {
        let vw = this;

        vw.$http.get('/api/manage/bgmiManage/showTag', {}, {}).then(function(res){

          vw.tagtArray = res.data.data;
          vw.tagtArray.unshift({id: 0, name: '全部'});
          if(vw.tagtArray.length <= 11){
            vw.tagArray = vw.tagtArray;
          }else{
            vw.tagArray = vw.tagtArray.slice(0, 11);
            vw.isShowMoreTag = true;
          }
        })
      }
    },
    mounted(){
     
    },
    watch: {
      areaIdx: function(){
        let vw = this;

        vw.getBangumiInfo();
      },
      timeIdx: function(){
        let vw = this;

        vw.getBangumiInfo();
      },
      jiduIdx: function(){
        let vw = this;

        vw.getBangumiInfo();
      },
      tagsIdx: function(){
        let vw = this;

        vw.getBangumiInfo();
      }
    }
  }
</script>