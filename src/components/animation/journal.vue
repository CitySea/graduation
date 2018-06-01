<template>
	<section class="animation-abstarct">
		<section class="animation-characters">
			<section class="characters-box">
				<ul>
          <li class="dynamic-list" v-for="item in journal">
            <section class="img-box left">
              <img :src="item.profile" class="header">
            </section>
            <section class="left detail-text">
            	<p class="m1 tag-name"><router-link :to="'/journal/detail?banId=' + item.id">{{ item.title }}</router-link></p>
            	<br>
            	<p class="m1"><span class="light-color">by</span><a class="dark-color">{{ item.userName }}</a></p><span class="tag-time">——{{ item.time }}</span>
            	<br>
            	<p class="m1 tag-text text-content">{{ item.content }}</p>
            </section>
          </li>
        </ul>
			</section>
      <section class="edit-fixed"  v-if="isLogin">
        <router-link :to="'/journal/add?banId=' + banId">
        <i class="iconfont icon-edit"></i>
        <p>我也来</p>
        </router-link>
      </section>
		</section>
	</section>
</template>

<script>
	export default {
    props: ['dataInfo'],
		data: function() {
			return{
        isLogin: false,
        banId: 0,
        journal: [],
			}
		},
    created: function(){
      let vw    = this;
      let index = window.location.href.indexOf('id=');

      vw.banId = window.location.href.substring(index+3);
      vw.$http.post('/api/manage/bgmiManage/isLogin', {}, {}).then(function(data){
        if(data.data.code == '11000'){
          vw.isLogin = true;
        }else{
          vw.isLogin = false;
        }
        vw.journal = vw.dataInfo.journal;
      });
    }
	}
</script>