<template>
	<section class="animation-abstarct">
		<section class="animation-seclist">
			<section class="seclist-box">
				<ul>
					<li class="flex" v-for="item in sectionArray">
						<p class="flex-1">第一话：{{ item.tile }} / {{ item.ctitle }}</p>
						<p class="flex-1">时长：{{ item.time }} / 首播：{{ item.time }}</p>
					</li>
				</ul>
			</section>
		</section>
	</section>
</template>

<script>
	export default {
		data: function() {
			return{
				sectionArray: [
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{tile: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'}
				],
				itemToal: [
          { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题1111111'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题'},
          { imgSrc: '/static/images/animation/2.jpg' , title: '动画标题'}
        ],
			}
		}
	}
</script>