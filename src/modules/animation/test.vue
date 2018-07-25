<template>
  <section id="app" class="home">
    <div class="box">
      <div class="cont c1" :style="{left: leftPx1 + 'px'}">
        恭喜xxxxxxc1中奖啦
      </div>
      <div class="cont c2" :style="{left: leftPx2 + 'px'}">
        恭喜xxxxxxc2中奖啦
      </div>
      <div class="cont c3" :style="{left: leftPx3 + 'px'}">
        恭喜xxxxxxc3中奖啦
      </div>
      <div class="cont c4" :style="{left: leftPx4 + 'px'}">
        恭喜xxxxxxc4中奖啦
      </div>
    </div>
  </section>
</template>


<script>
  export default {
    created: function(){
      this.run()
    },
    data: function(){
      return{
        leftPx1: -140,
        leftPx2: 0,
        leftPx3: 140,
        leftPx4: 280
      }
    },
    methods: {
      run() {
        var vw = this;

        setTimeout(() => {
          vw.leftPx1++;
          vw.leftPx2++;
          vw.leftPx3++;
          vw.leftPx4++;
          if(vw.leftPx1 > 420){
            vw.leftPx1 = -140;
          }
          if(vw.leftPx2 > 420){
            vw.leftPx2 = -140;
          }
          if(vw.leftPx3 > 420){
            vw.leftPx3 = -140;
          }
          if(vw.leftPx4 > 420){
            vw.leftPx4 = -140;
          }
          vw.run()
        }, 10)
        
      }
    },
    mounted(){
     
    },
  }
</script>

<style type="text/css">
  .box {
    position: relative;
    width: 403px;
    height: 400px;
    background-color: #eee;
    margin: 0 auto;
    overflow: hidden;
  }
  .box .cont {
    position: absolute;
    top: 40px;
    width: 120px;
    height: 20px;
    font-size: 12px;
    line-height: 12px;
    color: #000;
    border: 1px solid #000;
  }
  .c2 {
    left: 0px;
  }
  .c3 {
    left: 140px;
  }
  .c4 {
    left: 280px;
  }
  .c1{
    left: -140px;
  }
</style>