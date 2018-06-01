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
                <a :href="detailHref + item.id">
                  <div class="img-box">
                    <img :src="item.small_show_pic">
                    <p class="title"><i class="iconfont icon-attention"></i><span>{{ item.stars }}</span></p>
                  </div>
                  <p class="count">{{ item.name }}</p>
                </a>
              </li>
            </ul>
          </section>
          <Pagination :page-ide="ide" :page-total="pagetotal" @now-ide="getIde" v-if="showPage"></Pagination>
        </section>
        <section class="left side-right-bar">
          <section class="tile">
            <p>人物情报</p>
          </section>
           <section class="type-box">
            <p class="title">类型</p>
            <ul class="flex">
              <li class="type-list flex-1">
                <a class="text" @click="getCvInfo()" :class="{'tag-name': idx == 0}">声优</a>
              </li>
               <li class="type-list flex-1">
                <a class="text" @click="getStaffInfo()" :class="{'tag-name': idx == 1}">制作人员</a>
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
    data: function(){
      return{
        ide: 1,
        pagetotal: 8,
        showPage: false,
        detailHref: '',
        testTime: "+展开",
        testTag: "+展开",
        itemToal: [],
        areaArray: ['全部', '日本', '中国', '美国', '其他'],
        isShowTime: false,
        isShowTag: false,
        idx: 0,
      }
    },
    created: function(){
      let vw = this;
      
      vw.getCvInfo();
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
      getIde: function(ide) {
        let vw = this;

        vw.ide = ide;
        vw.getCvInfo();
      },
      getCvInfo: function() {
        let vw = this;
        let params = {
          page: vw.ide,
          limit: 10
        }

        vw.idx = 0;
        vw.detailHref = '/#/cv/detail?id=';
        vw.$http.post('/api/show/cvManage/showCv', params, {}).then(function(res){
          vw.pagetotal = parseInt(res.data.count / params.limit) + 1; //总页数
          vw.itemToal  = res.data.data; 
          vw.showPage  = true;

        })
      },
      getStaffInfo: function() {
        let vw = this;
        let params = {
          page: vw.ide,
          limit: 10
        }

        vw.idx = 1;
        vw.detailHref = '/#/cv/detail?staffId=';
        vw.$http.post('/api/show/cvManage/showStaff', params, {}).then(function(res){
          vw.pagetotal = parseInt(res.data.count / params.limit) + 1; //总页数
          vw.itemToal  = res.data.data; 
          vw.showPage  = true;
        })
      }
    },
    mounted(){
      
    }
  }
</script>