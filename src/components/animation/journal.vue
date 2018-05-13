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
            	<p class="m1">{{ item.title }}</p>
            	<br>
            	<p class="m1">by<a class="tag-name">{{ item.name }}</a></p><span class="tag-time">——{{ item.time }}</span>
            	<br>
            	<p class="m1 tag-text">{{ item.detail }}</p>
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
					{imgSrc: '/static/images/animation/2.jpg', title: '假装是个标题1111111', name: "呆唯是我的", time: '2018:05:02', detail: '假装有一大段东西哈哈哈哈哈哈啊哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈·啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈啊哈男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'},
					{imgSrc: '/static/images/animation/2.jpg', title: '假装是个标题1111111', name: "呆唯是我的", time: '2018:05:02', detail: '假装有一大段东西哈哈哈哈哈哈啊哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈·啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈啊哈'},
					{imgSrc: '/static/images/animation/2.jpg', title: '假装是个标题1111111', name: "呆唯是我的", time: '2018:05:02', detail: '假装有一大段东西哈哈哈哈哈哈啊哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈·啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈啊哈'},
					{imgSrc: '/static/images/animation/2.jpg', title: '假装是个标题1111111', name: "呆唯是我的", time: '2018:05:02', detail: '假装有一大段东西哈哈哈哈哈哈啊哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈·啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈啊哈'},
					{imgSrc: '/static/images/animation/2.jpg', title: '假装是个标题1111111', name: "呆唯是我的", time: '2018:05:02', detail: '假装有一大段东西哈哈哈哈哈哈啊哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈·啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈啊哈'},
					{imgSrc: '/static/images/animation/2.jpg', title: '假装是个标题1111111', name: "呆唯是我的", time: '2018:05:02', detail: '假装有一大段东西哈哈哈哈哈哈啊哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈·啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈啊哈'},
					{imgSrc: '/static/images/animation/2.jpg', title: '假装是个标题1111111', name: "呆唯是我的", time: '2018:05:02', detail: '假装有一大段东西哈哈哈哈哈哈啊哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈·啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈啊哈'},
					{imgSrc: '/static/images/animation/2.jpg', title: '假装是个标题1111111', name: "呆唯是我的", time: '2018:05:02', detail: '假装有一大段东西哈哈哈哈哈哈啊哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈·啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈啊哈'}
				],
			}
		}
	}
</script>