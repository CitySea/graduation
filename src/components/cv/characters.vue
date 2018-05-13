<template>
	<section class="animation-abstarct">
		<section class="animation-cv">
			<section class="characters-box">
				<ul>
          <li class="dynamic-list flex" v-for="item in sectionArray">
            <section class="img-box left">
              <img :src="item.imgSrc" class="header">
            </section>
            <section class="left detail-text">
            	<p class="m1 first">{{ item.name }} / {{ item.cname }}</p>
            </section>
          </li>
        </ul>
			</section>
		</section>
	</section>
</template>

<script>
	export default {
		props: ['cvInfo'],
		data: function() {
			return{
				sectionArray: [
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿'}
				],
			}
		}
	}
</script>