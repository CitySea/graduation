<template>
	<section class="animation-abstarct">
		<section class="abstarc-content flex-nc">
			<section class="abstract-left flex-1">
				<h3>角色声优</h3>
				<ul class="abst-actor">
					<li>
						<p>栉枝实乃梨：堀江由衣</p>
					</li>
					<li>
						<p>逢坂大河：釘宮理恵</p>
					</li>
					<li>
						<p>川岛亚美：喜多村英梨</p>
					</li>
					<li>
						<p>高须龙儿：間島淳司</p>
					</li>
					<li>
						<p>北村祐作：野島裕史</p>
					</li>
					<li>
						<p>恋ヶ窪ゆり：田中理恵</p>
					</li>
					<li>
						<p>木原麻耶：野中藍</p>
					</li>
					<li>
						<p>狩野堇：甲斐田裕子</p>
					</li>
					<li>
						<p>狩野さくら：阿澄佳奈</p>
					</li>
				</ul>
			</section>
			<section class="abstract-cnter flex-2">
				<section class="abstract-sample-text">
					<h3>简介</h3>
					<p>因眼神凶恶而被班里同学看作不良少年的高须龙儿，进入了高中二年级，并幸运地和暗恋的少女栉枝实乃梨同班，对崭新的校园生活满怀希望。<br>
					　 开学典礼后龙儿与校内最恐怖的有“掌上老虎”之称的逢坂大河狭路相逢，周围人一同陷入了惊恐状态。然而他意外地发现，逢坂同时也是实乃梨的闺蜜。<br>
					　 在二人相遇的当晚，龙儿知道了原来她暗恋的是自己的好友北村祐作，而自己暗恋实乃梨的事也被大河知道了！互相了解对方情况的两人结成了“恋爱同盟战线”，开始了半共同生活……</p>
				</section>
				<section class="section-list-box">
					<h3>章节列表</h3>
					<section class="section-list">
						<ul class="section-ul">
							<li v-for="item in sectionArray">
								<a>
									<p>第一话： {{ item.title }}</p>
									<p>中文标题： {{ item.ctitle }}</p>
									<p>首播： {{ item.bo }}</p>
									<p>时长： {{ item.time }}</p>
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
					<ul class="related-list">
						<li v-for="item in itemToal">
							<a>
								<img :src="item.imgSrc">
								<p>{{ item.title }}</p>
							</a>
						</li>
					</ul>
				</section>
			</section>
			<section class="abstract-left flex-1">
				<h3>STAFF</h3>
				<ul class="abst-actor">
					<li>
						<p>原作：  水無月すう</p>
					</li>
					<li>
						<p>导演:  水無月すう</p>
					</li>
					<li>
						<p>脚本：  水無月すう</p>
					</li>
					<li>
						<p>分镜：  水無月すう</p>
					</li>
					<li>
						<p>演出：  水無月すう</p>
					</li>
					<li>
						<p>音乐：  水無月すう</p>
					</li>
					<li>
						<p>人物设定：  水無月すう</p>
					</li>
					<li>
						<p>系列构成：  水無月すう</p>
					</li>
					<li>
						<p>色彩设计：  水無月すう</p>
					</li>
					<li>
						<p>总作画监督：  水無月すう</p>
					</li>
					<li>
						<p>作画进度：  水無月すう</p>
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
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'},
					{title: ' 虎と竜', ctitle: '龙与虎', bo: '2008-10-01', time: '00:24:54'}
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