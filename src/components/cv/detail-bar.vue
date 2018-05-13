<template>
	
	<section id="app">
		<section class="detail-header">
			<div class="detail-header-bg blur">
			</div>
			<header class="header">
				<section class="left">
					<section class="header-img">
						<img :src="cvInfo.show_pic">
					</section>
					<section class="header-detail">
						<h1>{{ cvInfo.name }}（ {{ cvInfo.cnname }} ）</h1>
						<p>职业: 声优 音乐人</p>
					</section>
				</section>
<!-- 				<section class="right">
					<section class="score-box">
						<div class="score-detail">
							<div class="flex">
								<p class="flex-1">喜爱程度:非常爱</p>
							</div>
							<ul>
								<li v-for="item in scoreArray">
									<a :title="item.title"><span class="process-bar" :style="{height: item.rate}"></span><span class="score-text">{{ item.score }}</span></a>
								</li>
							</ul>
						</div>
					</section>
				</section> -->
			</header>
		</section>

	</section>
</template>

<script>
	export default {
		props: ['cvInfo'],
    created: function(){
    },
    data: function(){
      return{
      	
    		scoreArray: [
    			{score: '10', rate: '50%', title: '100人评分'},
    			{score: '9',  rate: '20%', title: '90人评分'},
    			{score: '8',  rate: '11%', title: '80人评分'},
    			{score: '7',  rate: '9%',  title: '70人评分'},
    			{score: '6',  rate: '8%',  title: '60人评分'},
    			{score: '5',  rate: '7%',  title: '50人评分'},
    			{score: '4',  rate: '16%', title: '40人评分'},
    			{score: '3',  rate: '5%',  title: '30人评分'},
    			{score: '2',  rate: '4%',  title: '20人评分'},
    			{score: '1',  rate: '1%',  title: '10人评分'}
    		]
      }
    },
    methods: {
    },
    mounted(){
      
    }
	}
</script>