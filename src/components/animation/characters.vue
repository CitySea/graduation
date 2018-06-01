<template>
	<section class="animation-abstarct">
		<section class="animation-characters">
			<section class="characters-box">
				<ul>
          <li class="dynamic-list" v-for="item in roleInfo">
            <section class="img-box left">
              <img :src="item.small_show_pic" class="header">
            </section>
            <section class="left detail-text">
            	<p class="m1 first">{{ item.roleName }} / {{ item.roleCnname }}</p><span class="status">{{ posi[item.position] }}</span>
            	<br>
            	<p class="m1">cv：<router-link :to="'/cv/detail?id=' + item.cvId">{{ item.cvName }}</router-link> / <router-link :to="'/cv/detail?id=' + item.cvId">{{ item.cvCnname }}</router-link></p>
              <br>
	            <p class="text">简介: <span v-html="item.roleDetail"></span></p>
            </section>
          </li>
        </ul>
			</section>
		</section>
	</section>
</template>

<script>
	export default {
    props: ['dataInfo'],
		data: function() {
			return{
				roleInfo: [],
        posi: ['主角', '配角']
			}
		},
    created: function() {
      let vw = this;

      vw.roleInfo = vw.dataInfo.role;
    }
	}
</script>