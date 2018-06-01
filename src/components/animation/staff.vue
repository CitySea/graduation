<template >
	<section class="animation-abstarct">
		<section class="animation-characters">
			<section class="characters-box">
				<ul v-if="isShowInfo">
          <li class="dynamic-list" v-for="item in infoObj">
            <section class="img-box left">
              <router-link :to="'/cv/detail?staffId=' + item.id"><img :src="item.info.small_show_pic" class="header"></router-link>
            </section>
            <section class="left detail-text">
            	<p class="m1 first"><router-link :to="'/cv/detail?staffId=' + item.id">{{ item.info.name }}</router-link> / <router-link :to="'/cv/detail?staffId=' + item.id">{{ item.info.cnname }}</router-link></p><span class="status" v-for="it in item.name">{{ it }}</span>
            	<br>
            	<p class="m1">性别：{{ item.info.sex }}</p>
            	<br>
            	<p class="m1">出生日期：{{ item.info.date }}</p>
            </section>
          </li>
        </ul>
			</section>
		</section>
	</section>
</template>

<script>
  import staffName from "@/assets/js/staffName.js"
	export default {
    props: ['dataInfo'],
		data: function() {
			return{
        infoObj: {},
        isShowInfo: false,
			}
		},
    created: function() {
      let vw = this;
      let temp = [];
      let idArr = [];
      let promiseAll;
      let staff = {};

      temp = JSON.parse(vw.dataInfo.base[0].staff_total);

      if(temp){
        for(let i = 0; i < temp.length; i++ ){
          if(temp[i].id !==''){
            let arr  = [];
            let nameArr = [];

            arr = temp[i].id.split(',');//id数组化
            nameArr = temp[i].name.split(',');//姓名数组化
            for(let j in arr){
              let data = {};

              if(idArr.indexOf(arr[j]) < 0){
                idArr.push(arr[j]);
                data.id = arr[j];
                data.name = [];
                data.name.push(staffName[nameArr[0]]);
                staff[arr[j]] = data;
              }else{
                staff[temp[i].id].name.push(staffName[nameArr[0]]);
              }
            }
          }
        }
      }
      
      //循环异步数据请求
      promiseAll = idArr.map(function(id){
        return vw.$http.post('/api/manage/staff/staffInfo', {id: id});
      });
      vw.$http.all(promiseAll).then(function(resArr){
        for(let i = 0; i < resArr.length; i++){
          let info = resArr[i].data.data[0];

          staff[info.id].info = info;
        }
        vw.infoObj = staff;
        vw.isShowInfo = true;
      });
    },
    methods: {
    },
    mounted: function() {

    }
	}
</script>