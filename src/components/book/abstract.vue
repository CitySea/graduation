<template>
	<section class="animation-abstarct">
		<section class="abstarc-content flex-nc">
			<section class="abstract-left flex-1">
				<h3>主要角色</h3>
				<ul>
          <li class="dynamic-list flex" v-for="item in roleArr">
            <section class="img-box left">
              <img :src="item.small_show_pic" class="header">
            </section>
            <section class="left detail-text">
            	<p class="tag-name">{{ item.roleName }}</p>
            	<p><span class="tag-time">{{ posiArr[item.position] }}</span> <span class="small-text">{{ item.roleCnname }}</span></p>
            </section>
          </li>
        </ul>
			</section>
			<section class="abstract-cnter flex-2">
				<section class="abstract-sample-text">
					<h3>简介</h3>
					<div v-html="baseArr.detail"></div>
				</section>
				<section class="section-list-box">
					<h3>单行本</h3>
					<section class="section-list">
						<ul>
		          <li class="dynamic-list flex" v-for="item in offprintArr">
		            <a>
		            	<section class="img-box left">
			              <img :src="item.show_pic" class="header" :title="item.name">
			            </section>
			          </a>
		          </li>
		          <li class="dynamic-list flex" v-if="isShowMoreOff">
		          	<a>
		            	<section class="center-text left">
			            	<p>更多...</p>
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
						<p>中文名: {{ baseArr.cnname }}</p>
					</li>
					<li>
						<p>册数: {{ num }}</p>
					</li>
					<li>
						<p>话数: {{ baseArr.chapter }}</p>
					</li>
					<li>
						<p>作者: {{ baseArr.author }}</p>
					</li>
					<li>
						<p>出版社: {{ baseArr.press }}</p>
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
				baseArr: {},
				roleArr: [],
				offprintArr: [],
				num: 0,
				posiArr: ['主角', '配角'],
				sectionrArray: [
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
				itemToal: [],
				isShowMoreOff: false,
			}
		},
		created: function(){
			let vw = this;

			vw.roleArr     = vw.dataInfo.role;
			vw.baseArr     = vw.dataInfo.base[0];
			vw.num         = vw.dataInfo.offprint.length;
			vw.offprintArr = vw.dataInfo.offprint;
			if( vw.offprintArr.length > 9 ){
				vw.offprintArr   = vw.offprintArr.slice(0, 9);
				vw.isShowMoreOff = true;
			} else {
				vw.isShowMoreOff = false;
			}
		}
	}
</script>