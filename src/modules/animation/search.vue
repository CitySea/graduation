<template>
  <section id="app" class="home">
    <section class="contain">
      <Mheader></Mheader>
      <section class="home-banner flex">
        <div class="search-box">
          <input class="header-search" v-model="name"><a class="btn" @click="search()">搜索</a>
        </div>
      </section>
      <section class="home-wrapper">
        <section class="left max-width">
          <section class="list">
            <ul>
              <li v-for="item in itemToal" class="bottom">
                <router-link :to="detailHref[type] + item.id">
                  <div class="img-box">
                    <img :src="item.small_show_pic">
                  </div>
                  <p class="count">{{ item.name }}</p>
                </router-link>
              </li>
            </ul>
          </section>
          <Pagination :page-ide="ide" :page-total="pagetotal" @now-ide="getIde" v-if="showPage"></Pagination>
        </section>
        <section class="left side-right-bar">
          <section class="tile">
            <p>搜索结果</p>
          </section>
           <section class="type-box">
            <p class="title">选择类型</p>
            <ul class="flex">
              <li class="type-list flex-1">
                <a class="text" @click="getBan()" :class="{'tag-name': type == 0}">动画</a>
              </li>
              <li class="type-list flex-1">
                <a class="text" @click="getBook()" :class="{'tag-name': type == 1}">书籍</a>
              </li>
              <li class="type-list flex-1">
                <a class="text" @click="getPeo()" :class="{'tag-name': type == 2}">cv</a>
              </li>
              <li class="type-list flex-1">
                <a class="text" @click="getStaff()" :class="{'tag-name': type == 3}">制作人员</a>
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
        detailHref: ['/animate/detail?id=','/book/detail?id=','/cv/detail?id=','/cv/detail?staffId='],
        testTime: "+展开",
        testTag: "+展开",
        itemToal: [],
        areaArray: ['全部', '日本', '中国', '美国', '其他'],
        isShowTime: false,
        isShowTag: false,
        idx: 0,
        name: '',
        type: 0,
      }
    },
    created: function(){
      let vw = this;

      vw.getSearch();
    },
    methods: {
      getIde: function(ide) {
        let vw = this;

        vw.ide = ide;
        vw.getSearch();
      },
      search: function (){
        let vw = this;

        window.location.href = '/#/search?name=' + vw.name + '&type' + vw.type;
        window.location.reload();
      },
      getSearch: function(){
        let vw = this;
        let index = window.location.href.indexOf('name=');
        let indexType = window.location.href.indexOf('&type');
        let limit = 2;

        vw.showPage = false;
        vw.name = decodeURI(window.location.href.substring(index+5, indexType));
        vw.$http.get('/api/user/searchBangumi?name=' + vw.name + '&limit=' + limit + '&page=' + vw.ide + '&type=' + vw.type, {}).then(function(res){
          let pageNum;

          if(res.data.count % limit == 0){
            pageNum = parseInt(res.data.count / limit) -1;
          }else{
            pageNum = parseInt(res.data.count / limit);
          }
          vw.pagetotal = pageNum + 1; //总页数
          vw.itemToal  = res.data.data;
          if(res.data.count == 0){
            vw.showPage = false;
          }else{
            vw.showPage = true;
          }
        });
      },
      getBan: function(){
        let vw = this;

        vw.type = 0;
        vw.ide  = 1;
        vw.getSearch();
      },
      getBook: function(){
        let vw = this;

        vw.type = 1;
        vw.ide  = 1;
        vw.getSearch();
      },
      getPeo: function(){
        let vw = this;

        vw.type = 2;
        vw.ide  = 1;
        vw.getSearch();
      },
      getStaff: function(){
        let vw = this;

        vw.type = 3;
        vw.ide  = 1;
        vw.getSearch();
      }
    },
    mounted(){
      
    }
  }
</script>