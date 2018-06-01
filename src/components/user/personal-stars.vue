<template>
  <section class="personal-stars">
    <section class="bar">
      <ul>
        <li v-for="(item, i) in barArr" :class="{'active': barIdx == i}" @click="barIdx = i">{{ item }} {{ starsInfo[bar[i]]}}</li>
      </ul>
    </section>
    <section class="container">
      <ul class="stars-ul" v-if="barIdx == 0">
        <li class="flex flex-align-start" v-for="(item, i) in starsInfo.bangumi">
          <div class="wraper-img">
            <img :src="item.show_pic">
          </div>
          <div class="wraper-text">
            <p>{{ item.banName }}</p>
            <p class="detail">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
      <ul class="stars-ul" v-if="barIdx == 1">
        <li class="flex flex-align-start" v-for="(item, i) in starsInfo.book">
          <div class="wraper-img">
            <img :src="item.show_pic">
          </div>
          <div class="wraper-text">
            <p>{{ item.bookName }}</p>
            <p class="detail">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
  export default {
    props: ['starsInfo'],
    data: function() {
      return{
        bar: ['bangumilen', 'booklen'],
        barArr: ['动画', '书籍'],
        barIdx: 0,
      }
    },
    created: function(){

    },
    methods: {

    }
  }
</script>