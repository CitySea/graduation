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
      <Characters  v-if="ide == 1"></Characters>
      <Staff    v-if="ide == 2"></Staff>
      <Journal  v-if="ide == 3"></Journal>
      <Mfooter></Mfooter>
    </section>  
  </section>
</template>


<script>
  import Mheader from "@/components/main-header.vue"
  import Mfooter from "@/components/main-footer.vue"
  import Detailbar from "@/components/book/detail-bar.vue"
  import Abstract from "@/components/book/abstract.vue"
  import Characters from "@/components/book/characters.vue"
  import Staff from "@/components/book/staff.vue"
  import Journal from "@/components/book/journal.vue"
  
  export default {
    components: {
      Mheader,
      Mfooter,
      Detailbar,
      Abstract,
      Characters,
      Staff,
      Journal
    },
    created: function(){

    },
    data: function(){
      return{
       ide: 0,
       barArray: ['概览', '角色', '制作人员', '日志'],
      }
    },
    methods: {
    },
    mounted(){
      
    }
  }
</script>