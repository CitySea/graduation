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
            	<p class="m1 first">{{ item.name }} / {{ item.cname }}</p><span class="status">主角</span>
            	<br>
            	<p class="m1">cv：{{ item.cv }} / {{ item.ccv }}</p>
	            <p class="text">简介：{{ item.detail }}</p>
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
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿', status: '主角', cv: '间岛淳司', ccv: '間島淳司', detail: '男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿', status: '主角', cv: '间岛淳司', ccv: '間島淳司', detail: '男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿', status: '主角', cv: '间岛淳司', ccv: '間島淳司', detail: '男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿', status: '主角', cv: '间岛淳司', ccv: '間島淳司', detail: '男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿', status: '主角', cv: '间岛淳司', ccv: '間島淳司', detail: '男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿', status: '主角', cv: '间岛淳司', ccv: '間島淳司', detail: '男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿', status: '主角', cv: '间岛淳司', ccv: '間島淳司', detail: '男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'},
					{imgSrc: '/static/images/animation/2.jpg', name: '高須竜児', cname: '高须龙儿', status: '主角', cv: '间岛淳司', ccv: '間島淳司', detail: '男主角。16岁，就读于2年C班。金牛座。由于遗传到爸爸的凶恶眼神，常常被误认为不良少年，因此本人十分讨厌自己的长相，而其个性则是一个普通的认真少年。得意的技能是料理，也十分擅长裁缝，但爱干净到神经质的程度，清扫时会一边碎碎念。暗恋同班同学栉枝实乃梨，但是也不吝惜照顾大河。饲养一只名为“小鹦”的鹦鹉，并与母亲高须泰子和逢坂大河生活。'}
				],
			}
		}
	}
</script>