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
      <Characters  v-if="ide == 1" :role-info="roleInfo"></Characters>
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
      let cvId;
      let staffId;
      if(href.indexOf('?id=') > -1){//cv
        vw.barArray = ['概览', '配音角色'];
        cvId = href.substring(href.indexOf('?id=') + 4);
        vw.$http.post('/api/show/cvManage/showCvInfo', {id: cvId}, {}).then(function(res) {
          let info = res.data.data.base;
          
          for( let i in info ){
            vw.cvInfo[i] = info[i];
          }
          vw.cvInfo.status = 'cv';
          vw.isShowCha = true;
          vw.roleInfo.role = [];
          vw.roleInfo.role = res.data.data.role;
          vw.roleInfo.status = 0;

        })
      }else{//staff
        vw.barArray = ['概览', '参与作品'];
        staffId = href.substring(href.indexOf('?staffId=') + 9);
        vw.$http.post('/api/show/cvManage/showStaffInfo', {id: staffId}, {}).then(function(res) {
          let info = res.data.data.base;

          for( let i in info ){
            vw.cvInfo[i] = info[i];
          }
          vw.cvInfo.status = 'staff';
          vw.isShowCha = true;
          vw.roleInfo.role = [];
          vw.roleInfo.role = res.data.data.staff;
          vw.roleInfo.status = 1;
        })
      }
    },
    data: function(){
      return{
       ide: 0,
       isShowCha: false,
       cvInfo: {
        name: '数据未加载'
       },
       roleInfo: {},
       barArray: [],
      }
    },
    methods: {
    },
    mounted(){
      
    }
  }
</script>