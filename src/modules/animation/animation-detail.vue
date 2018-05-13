<template>
  <section id="app" class="animation-detail">
    <section class="contain">
      <Mheader></Mheader>
      <Detailbar></Detailbar>
      <section class="detail-bar-box">
        <section class="detail-bar">
          <ul class="flex">
            <li v-for="(item,index) in barArray" :class="{active: index == ide}"><a @click="ide = index">{{ item }}</a></li>
          </ul>
        </section>
      </section>
      <Abstract v-if="ide == 0"></Abstract>
      <Seclist  v-if="ide == 1"></Seclist>
      <Characters  v-if="ide == 2"></Characters>
      <Staff    v-if="ide == 3"></Staff>
      <Journal  v-if="ide == 4"></Journal>
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

    },
    data: function(){
      return{
       ide: 0,
       barArray: ['概览', '章节', '角色', '制作人员', '日志'],
      }
    },
    methods: {
    },
    mounted(){
      
    }
  }
</script>