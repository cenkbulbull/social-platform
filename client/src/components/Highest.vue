<template>
	<div class="widget stick-widget" style="">
		<h4 class="widget-title">En Beğenilenler</h4>

		<ul v-for="h in highest" class="followers ps-container ps-theme-default ps-active-y">

			<li>
				<figure><img :src="require(`@/assets/images/avatars/${h.avatar}`)"></figure>
				<div class="friend-meta">
					<h4><router-link :to="'/profile/'+h.username" title="">{{h.username}}</router-link></h4>
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
			const highest = ref(null)

			onMounted(async()=>{
				await axios.get("/user/top5")
				.then((res)=>{
					//console.log(res.data)
					highest.value=res.data
				})
				.catch((err)=>{
					console.log(err)
				})
			})

			return {highest}
		}
	}
</script>
<style>
	
</style>