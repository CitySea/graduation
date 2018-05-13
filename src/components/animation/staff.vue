<template>
	<section class="animation-abstarct">
		<section class="animation-characters">
			<section class="characters-box">
				<ul>
          <li class="dynamic-list" v-for="item in sectionArray">
            <section class="img-box left">
              <img :src="item.imgSrc" class="header">
            </section>
            <section class="left detail-text">
            	<p class="m1 first">{{ item.name }} / {{ item.cname }}</p><span class="status" v-for="it in item.status">{{it}}</span>
            	<br>
            	<p class="m1">性别：{{ item.cv }}</p>
            	<br>
            	<p class="m1">出生日期：{{ item.year }}</p>
            </section>
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
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'},
					{imgSrc: '/static/images/animation/2.jpg', name: '石原立也', cname: '石原立也', status: ['导演', '分镜'], cv: '男', year: '1996'}
				],
			}
		}
	}
</script>