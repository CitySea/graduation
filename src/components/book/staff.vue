<template>
	<section class="animation-abstarct">
		<section class="animation-characters">
			<section class="characters-box">
				<ul>
          <li class="dynamic-list" v-for="item in offprint">
            <section class="img-box left">
              <img :src="item.show_pic" class="header">
            </section>
            <section class="left detail-text">
              <p class="m1 first">{{ item.name }} / {{ item.cnname }}</p></span>
              <br>
              <p class="text">第{{ item.off_no }}卷/册/话</p>
              <br>
              <p class="text">开始连载时间：{{ item.broadcast_time }}</p>
              <br>
              <p class="text">简介：<span v-html="item.detail"></span></p>
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
        offprint: [],
			}
		},
    created: function(){
      let vw = this;

      vw.offprint = vw.dataInfo.offprint;
    }
	}
</script>