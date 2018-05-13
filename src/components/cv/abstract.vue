<template>
	<section class="animation-abstarct">
		<section class="abstarc-content flex-nc">
			<section class="abstract-left flex-1">
				<h3>简介</h3>
				<ul class="abst-actor">
					<li><p>名字：{{ cvInfo.name }}</p></li>
					<li><p>中文名：{{ cvInfo.cnname }}</p></li>
					<li><p>性别：{{ cvInfo.sex }}</p></li>
					<li><p>出生日期：{{ cvInfo.date }}</p></li>
				</ul>
			</section>
			<section class="abstract-cnter flex-2">
				<section class="abstract-sample-text">
					<h3>介绍</h3>
					<section id="detail"></section>
				</section>
			</section>
		</section>
	</section>
</template>

<script>
	export default {
		props: ['cvInfo'],
		created: function() {
		},
		data: function() {
			return{
				
			}
		},
		mounted () {
			let vw = this;
			let detail = document.getElementById('detail');
			console.log(vw.cvInfo.detail);
			console.log(vw.cvInfo.name);
			detail.innerHTML = vw.cvInfo.detail;
		}
 	}
</script>