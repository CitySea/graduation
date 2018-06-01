<template>
  <section class="personal-stars">
    <section class="bar">
      <ul>
        <li v-for="(item, i) in barArr" :class="{'active': barIdx == i}" @click="barIdx = i">{{ item }} {{journalInfo.bar[i]}}</li>
      </ul>
    </section>
    <section class="container">
      <div class="cont" v-if="barIdx == 0">
        <ul class="stars-ul">
          <li class="" v-for="(item, i) in journalInfo.bangumi">
            <router-link :to="'/journal/detail?banId=' + item.id">
              <div class="wraper-text">
                <p class="title">{{ item.title }}<span class="time">--{{ item.time }}</span></p>
                <p class="detail-text">{{ item.content }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="cont" v-if="barIdx == 1">
        <ul class="stars-ul">
            <li class="" v-for="(item, i) in journalInfo.book">
              <router-link :to="'/journal/detail?bookId=' + item.id">
              <div class="wraper-text">
                <p class="title">{{ item.title }}<span class="time">--{{ item.time }}</span></p>
                <p class="detail-text">{{ item.content }}</p>
              </div>
              </router-link>
            </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
  export default {
    props: ['journalInfo'],
    data: function() {
      return{
        bar: ['bangumilen', 'booklen'],
        barArr: ['动画', '书籍'],
        barIdx: 0,
      }
    },
    created: function(){
      let vw = this;

      console.log(vw.journalInfo);
    },
    methods: {

    }
  }
</script>