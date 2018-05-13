<template>
  <section id="app" class="animation-detail">
    <section class="contain">
      <Mheader></Mheader>
      <Detailbar :cv-info="cvInfo"></Detailbar>
      <section class="detail-bar-box">
        <section class="detail-bar">
          <ul class="flex">
            <li v-for="(item,index) in barArray" :class="{active: index == ide}"><a @click="ide = index">{{ item }}</a></li>
          </ul>
        </section>
      </section>
      <Abstract v-if="ide == 0 && isShowCha" :cv-info="cvInfo"></Abstract>
      <Characters  v-if="ide == 1" :cv-info="cvInfo"></Characters>
      <Mfooter></Mfooter>
    </section>  
  </section>
</template>


<script>
  import Mheader from "@/components/main-header.vue"
  import Mfooter from "@/components/main-footer.vue"
  import Detailbar from "@/components/cv/detail-bar.vue"
  import Abstract from "@/components/cv/abstract.vue"
  import Characters from "@/components/cv/characters.vue"
  
  export default {
    components: {
      Mheader,
      Mfooter,
      Detailbar,
      Abstract,
      Characters
    },
    created: function(){
      let vw   = this;
      let href = window.location.href;
      let id   = href.substring(href.indexOf('?id=') + 4);
      
      vw.$http.post('/api/show/cvManage/showCvInfo', {id: id}, {}).then(function(res) {
        let info = res.data.data[0];
        for( let i in info ){
          vw.cvInfo[i] = info[i];
        }
        vw.isShowCha = true;
      })
    },
    data: function(){
      return{
       ide: 0,
       isShowCha: false,
       cvInfo: {
        name: '数据未加载'
       },
       barArray: ['概览', '角色'],
      }
    },
    methods: {
    },
    mounted(){
      
    }
  }
</script>