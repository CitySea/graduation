<template>
	<section class="animation-abstarct">
		<section class="abstarc-content flex-nc">
			<section class="abstract-left flex-1">
				<h3>角色声优</h3>
				<ul class="abst-actor">
					<li v-for="item in roleInfo">
						<p>{{ item.roleName }}：<router-link :to="'/cv/detail?id=' + item.cvId">{{ item.cvName }}</router-link></p>
					</li>
				</ul>
			</section>
			<section class="abstract-cnter flex-2">
				<section class="abstract-sample-text">
					<h3>简介</h3>
					{{ baseInfo.detail || '' }}
				</section>
				<section class="section-list-box">
					<h3>章节列表</h3>
					<section class="section-list">
						<ul class="section-ul">
							<li v-for="item in episodeInfo">
								<a>
									<p>第{{ item.epi_no }}话： {{ item.name }}</p>
									<p>中文标题： {{ item.cnname }}</p>
									<p>首播： {{ item.broadcast_time }}</p>
									<p>时长： {{ item.duration }}</p>
								</a>
							</li>
							<li class="last">
								<p>进入</p>
							</li>
						</ul>
					</section>
				</section>
				<section class="related-list-box">
					<h3>推荐</h3>
					<!-- <ul class="related-list">
						<li v-for="item in itemToal">
							<a>
								<img :src="item.imgSrc">
								<p>{{ item.title }}</p>
							</a>
						</li>
					</ul> -->
				</section>
			</section>
			<section class="abstract-left flex-1">
				<h3>STAFF</h3>
				<ul class="abst-actor" >
					<li v-for="item in staffInfo" v-if="item.id !== ''">
						<p>{{ staffPosi[item.job] }}：  <a :href="'#/cv/detail?staffId=' + i" v-for="(i,val) in item.id">{{ item.peo[val] }}<span v-if="val < item.id.length - 1">，</span></a></p>
					</li>
				</ul>
			</section>
		</section>
	</section>
</template>

<script>
	import staffName from "@/assets/js/staffName.js"
	export default {
		props: ['dataInfo'],
		data: function() {
			return{
				baseInfo: {},
				episodeInfo: [],
				roleInfo: [], 
				staffInfo: [],
				staffPosi: {}
			}
		},
		created: function(){
			let vw = this;
			let len;
			let tempEpisode = [];
			let arr = [];
			//声优相关信息
			vw.roleInfo = vw.dataInfo.role;

			//集数相关信息
			tempEpisode = vw.dataInfo.episode;
			len = tempEpisode.length > 9 ? 9 : tempEpisode.length;
			vw.episodeInfo = tempEpisode.slice(0, len);

			//staff相关信息
			vw.baseInfo = vw.dataInfo.base[0];
			arr = JSON.parse(vw.baseInfo.staff_total);
			vw.staffPosi = staffName;
			for(let i in arr){
				if(arr[i].id != ''){
					let data = {};

					data.job = arr[i].name;
					data.peo = arr[i][arr[i].name].split(',');
					data.id  = arr[i].id.split(',');
					vw.staffInfo.push(data);
				}
			}
		}
	}
</script>