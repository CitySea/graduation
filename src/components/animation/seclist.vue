<template>
	<section class="animation-abstarct">
		<section class="animation-seclist">
			<section class="seclist-box">
				<ul>
					<li class="flex" v-for="item in episodeInfo">
						<p class="flex-1">第{{ item.epi_no }}话：{{ item.name }} / {{ item.cnname }}</p>
						<p class="flex-1">时长：{{ item.duration }} / 首播：{{ item.broadcast_time }}</p>
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
        episodeInfo: []
			}
		},
    created: function(){
      var vw = this;

      vw.episodeInfo =  vw.dataInfo.episode;
    }
	}
</script>