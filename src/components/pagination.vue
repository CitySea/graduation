<template>
  <section class="pagination-box flex">
    <ul class="flex-1">
      <li v-if="showFirst"><a @click="decIde()">上一页</a></li>
      <li v-for="index in pageData" :class="{active: index == ide}"><a @click="pageClick(index)">{{ index }}</a></li>
      <li v-if="showLast"><a @click="addIde()">下一页</a></li>
    </ul>
    <div class="flex-1">
      <p>共{{ totalData }}页，跳转至<input type="" name="">页<button>确定</button></p>
    </div>
  </section>
</template>

<script>
  export default{
    props: {
      pageIde: {
        type: [Number],
        default: 1
      },
      pageTotal: {
        type: [Number],
        default: 1
      }
    },
    data: function(){
      return{
        totalData: 20,
        ide: 0
      }
    },
    created: function() {
      let vw = this;

      vw.ide = vw.pageIde;
      vw.totalData = vw.pageTotal;
    },
    methods: {
      pageClick: function(index) {
        let vw = this;
        vw.ide  =index;

        //传递给父组件
        this.$emit('now-ide', vw.ide);
      },
      addIde: function() {
        let vw = this;
        vw.ide++;

        //传递给父组件
        this.$emit('now-ide', vw.ide);
      },
      decIde: function() {
        let vw = this;
        vw.ide--;

        //传递给父组件
        this.$emit('now-ide', vw.ide);
      }
    },
    computed: {
      pageData: function() {
        let vw = this;
        let arr = [];
        let leftIde;
        let rightIde;

        if(vw.ide < 5){
          leftIde = 1;
          if(vw.totalData <5 ){
            rightIde = vw.totalData;
          }else{
            rightIde = 5;
          }
        }else if(vw.ide < vw.totalData){
          leftIde = vw.ide-2;
          if(vw.ide > vw.totalData-3 ){
            rightIde = vw.totalData;
          }else{
            rightIde = vw.ide + 2;
          }
        }else if(vw.ide == vw.totalData){
          leftIde = vw.totalData - 5;
          rightIde = vw.totalData;
        }else{
          vw.ide = vw.totalData;
        }

        for( let i = leftIde; i <= rightIde; i++){
          arr.push(i);
        }
        return arr;
      },
      showFirst: function() {
        var vw = this;
        return vw.ide == 1 ? false : true;
      },
      showLast: function() {
        var vw = this;
        return vw.ide == vw.totalData ? false : true;
      }
    }
  }
</script>
