<template>
	<div class="widget friend-list stick-widget ">
		<h4 class="widget-title">Son Üyeler</h4>
		<ul id="people-list" class="friendz-list ps-container ps-theme-default mt-0">
			<li v-for="member in lastMembers">
				<figure>
					<img :src="require(`@/assets/images/avatars/${member.avatar}`)">
				</figure>
				<div class="friendz-meta">
					<router-link :to="'/profile/'+member.username">{{member.username}}</router-link>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import axios from "axios"
	import {ref,onMounted} from "vue"
	export default{
		setup(){
			const lastMembers = ref(null)

			onMounted(async()=>{
				await axios.get("/user")
				.then((res)=>{
					const membersArray = []
					for (var i = 0; i < 5; i++) {
						if (res.data[i] ==null) {
							break;
						}else{
							membersArray.push(res.data[i])
						}						
					}
					lastMembers.value = membersArray
				})
				.catch((err)=>{
					console.log(err)
				})
			})
			return {lastMembers}
		}
	}
</script>
<style>
	
</style>