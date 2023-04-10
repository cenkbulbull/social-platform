<template>
	<div v-if="user!=null" class="widget">
		<h4 class="widget-title">Senin Anıların</h4>	
		<div class="your-page">
			<figure>
				<a href="#" title=""><img :src="require(`@/assets/images/avatars/${user.avatar}`)"></a>
			</figure>
			<div class="page-meta">
				<router-link :to="'/profile/'+userlogin.username" title="" class="underline">Senin Sayfan</router-link>
				<span><i class="fa-solid fa-comments" style="color:#008000 "></i>Anılar <em>{{user.totalPosts}}</em></span>
			</div>
			<div class="page-likes">
				<!-- Tab panes -->
				<div class="tab-content">
					<div class="tab-pane active fade show" id="link1">
						<span><i class="fa-solid fa-heart"></i> {{user.totalLikes}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import SecureLS from "secure-ls";
	var ls = new SecureLS({ isCompression: false });

	import axios from "axios"
	import {computed,onMounted,ref} from "vue"
	import {useStore} from "vuex"
	export default{
		setup(){
			const user = ref(null)
			const userlogin = computed(()=>{
				return JSON.parse(ls.get('vuex')).loggedInUser
			})

			onMounted(async()=>{
				await axios.get("/user/"+userlogin.value.username)
				.then((res)=>{
					//console.log(res.data)
					user.value=res.data[0]
				})
				.catch((err)=>{
					console.log(err)
				})
			})

			return {user,userlogin}
		}
	}
</script>
<style>
	
</style>