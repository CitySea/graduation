<template>
  <section id="app" class="animation-detail">
    <section class="contain">
      <Mheader></Mheader>
      <Detailbar v-if="isShow" :data-info="dataInfo"></Detailbar>
      <section class="detail-bar-box">
        <section class="detail-bar">
          <ul class="flex">
            <li v-for="(item,index) in barArray" :class="{active: index == ide}"><a @click="ide = index">{{ item }}</a></li>
          </ul>
        </section>
      </section>
      <Abstract v-if="ide == 0 && isShow" :data-info="dataInfo"></Abstract>
      <Seclist v-if="ide == 1 && isShow" :data-info="dataInfo"></Seclist>
      <Characters v-if="ide == 2 && isShow" :data-info="dataInfo"></Characters>
      <Staff v-if="ide == 3 && isShow" :data-info="dataInfo"></Staff>
      <Journal v-if="ide == 4 && isShow" :data-info="dataInfo"></Journal>
      <Mfooter></Mfooter>
    </section>  
  </section>
</template>

<script>
  import Mheader from "@/components/main-header.vue"
  import Mfooter from "@/components/main-footer.vue"
  import Detailbar from "@/components/animation/detail-bar.vue"
  import Abstract from "@/components/animation/abstract.vue"
  import Seclist from "@/components/animation/seclist.vue"
  import Characters from "@/components/animation/characters.vue"
  import Staff from "@/components/animation/staff.vue"
  import Journal from "@/components/animation/journal.vue"
  
  export default {
    components: {
      Mheader,
      Mfooter,
      Detailbar,
      Abstract,
      Seclist,
      Characters,
      Staff,
      Journal
    },
    created: function(){
      let vw = this;
      let index = window.location.href.indexOf('id=');
      let id    = window.location.href.substring(index+3);

      vw.$http.post('/api/manage/bgmiManage/showBaseInfo', {id: id}, {}).then(function(res){
        vw.dataInfo = res.data.data;
        vw.isShow   = true;
      });
      vw.setHot(id);
    },
    data: function(){
      return{
       ide: 0,
       barArray: ['概览', '章节', '角色', '制作人员', '日志'],
       dataInfo: {},
       isShow: false
      }
    },
    methods: {
      setHot: function(id){
        let vw = this;

        vw.$http.post('/api/manage/bgmiManage/setHot', {id: id}, {}).then(function(res){});
      }
    },
    mounted(){
      
    }
  }
</script>