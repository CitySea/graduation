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
            <ul class="daily">
              <li v-for="(item, i) in itemToal">
                <router-link :to="'/journal/detail?' + type[idx] + '=' + item.id">
                  <div class="flex flex-align-start">
                    <div class="img-box">
                      <img :src="item.profile">
                    </div>
                    <div class="text-box">
                      <p>{{ item.title }}</p>
                      <p>by  {{ item.userName }}</p>
                      <p class="light-color" v-if="item.disName != ''">{{ item.disName}}评论：<span>{{ item.disContent }}</span></p>
                      <p class="light-color" v-else>暂无评论</p>
                      <p>+11</p>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </section>
          <Pagination :page-ide="ide" :page-total="pagetotal" @now-ide="getIde" v-if="showPage"></Pagination>
        </section>
        <section class="left side-right-bar">
          <section class="tile">
            <p>日志情报</p>
          </section>
          <section class="type-box">
            <p class="title">类型</p>
            <ul class="flex">
              <li class="type-list flex-1" v-for="(item, i) in arr" @click="getJournalInfo(i)" :class="{'tag-name': idx == i}" >
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
    data: function(){
      return{
        ide: 1,
        pagetotal: 8,
        showPage: false,
        itemToal: [],
        arr: ['动画', '书籍'],
        idx: 0,
        type: ['banId', 'bookId']
      }
    },
    created: function(){
      let vw =  this;

      vw.getJournalInfo(0);
    },
    methods: {
      getIde: function(ide) {
        let vw = this;

        vw.ide = ide;
        vw.getJournalInfo(vw.idx);
      },
      getJournalInfo: function(i) {
        let vw = this;

        let arr = ['/api/user/showJournalInfo', '/api/user/showJourBookInfo'];
        if(vw.idx != i){
          vw.ide = 1;
        }
        let params = {
          page: vw.ide,
          limit: 2
        }
        vw.idx = i;

        vw.showPage  = false;
        vw.$http.post(arr[i], params, {}).then(function(res){
          let pageNum;
          if(res.count !=0 ){
            if(res.data.count % params.limit == 0){
              pageNum = parseInt(res.data.count / params.limit) - 1;
            }else{
              pageNum = parseInt(res.data.count / params.limit);
            }

            vw.pagetotal = pageNum + 1; //总页数
            vw.itemToal  = res.data.data; 
            vw.showPage  = true;
          }else{
            vw.pagetotal = -1; //总页数
            vw.itemToal  = res.data.data; 
            vw.showPage  = false;
          }
        })
      },
    },
    mounted(){
      
    }
  }
</script>