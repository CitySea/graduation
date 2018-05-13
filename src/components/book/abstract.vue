<template>
	<section class="animation-abstarct">
		<section class="abstarc-content flex-nc">
			<section class="abstract-left flex-1">
				<h3>主要角色</h3>
				<ul>
          <li class="dynamic-list flex" v-for="item in sectionrArray">
            <section class="img-box left">
              <img :src="item.imgSrc" class="header">
            </section>
            <section class="left detail-text">
            	<p class="tag-name">{{ item.name }}</p>
            	<p><span class="tag-time">主角</span> <span class="small-text">{{ item.cname }}</span></p>
            </section>
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
					<h3>单行本</h3>
					<section class="section-list">
						<ul>
		          <li class="dynamic-list flex" v-for="item in sectionrArray">
		            <a>
		            	<section class="img-box left">
			              <img :src="item.imgSrc" class="header">
			            </section>
			          </a>
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
				<h3>介绍</h3>
				<ul class="abst-actor">
					<li>
						<p>中文名: 灌篮高手 完全版</p>
					</li>
					<li>
						<p>册数: 24</p>
					</li>
					<li>
						<p>话数: 276</p>
					</li>
					<li>
						<p>作者: 井上雄彦</p>
					</li>
					<li>
						<p>出版社: 集英社、尖端出版、长春出版社、天下出版</p>
					</li>
					<li>
						<p>别名: 篮球飞人 完全版</p>
					</li>
					<li>
						<p>发售日: 集英社 2001年、台湾尖端 2005年、长春出版社 2012年12月21日</p>
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
				sectionrArray: [
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'}
				],
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