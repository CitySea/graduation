<template>
	<section class="animation-abstarct">
		<section class="animation-cv">
			<section class="characters-box">
				<ul v-if="roleInfo.status == 0">
          <li class="dynamic-list flex" v-for="item in roleInfo.role">
            <section class="img-box left">
              <img :src="item.small_show_pic" class="header">
            </section>
            <section class="left detail-text">
            	<p class="m1 first">配音角色：{{ item.roleName }} / {{ item.roleCnname }}</p>
              <br>
              <P class="m1">动画名称：<router-link :to="'/animate/detail?id=' + item.id">{{ item.bangumiName }}</router-link> / <router-link :to="'/animate/detail?id=' + item.id">{{ item.bangumiCnname }}</router-link></P>
            </section>
          </li>
        </ul>
        <ul v-else>
          <li class="dynamic-list flex" v-for="item in roleInfo.role">
            <section class="img-box left">
              <img :src="item.small_show_pic" class="header">
            </section>
            <section class="left detail-text">
              <P class="m1 first">动画名称：<router-link :to="'/animate/detail?id=' + item.bangumiId">{{ item.bangumiName }}</router-link> / <router-link :to="'/animate/detail?id=' + item.bangumiId">{{ item.bangumiCnname }}</router-link></P>
              <br>
              <p class="m1"><span v-for="it in item.job" class="status">{{it}}</span></p>
            </section>
          </li>
        </ul>
			</section>
		</section>
	</section>
</template>

<script>
	export default {
		props: ['roleInfo'],
		data: function() {
			return{
			}
		},
    created: function() {
      var vw = this;

    }
	}
</script>