<template>
	<section>
		<div class="gap gray-bg">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<div class="row" id="page-contents">
							<div class="col-lg-3">
								<aside class="sidebar static">


									<Category/>

									<!-- en çok beğeni alanlar -->
									<Highest/>
									<!-- en çok beğeni alanlar -->


								</aside>
							</div>

							<!-- anasayfa postlar -->
							<div class="col-lg-6">

								<Share v-if="userlogin!=null"/>

								<Post/>

							</div>


							<!-- anasayfa postlar -->

							<!-- son üyeler -->
							<div class="col-lg-3">
								<aside class="sidebar static">

									<MyMemories v-if="userlogin!=null"/>

									<LastMembers/>

								</aside>
							</div>
							<!-- son üyeler -->

						</div>	
					</div>
				</div>
			</div>
		</div>	
	</section>
</template>

<script>
	import SecureLS from "secure-ls";
	var ls = new SecureLS({ isCompression: false });

	import Share from "../components/Share"
	import Post from "../components/Post"
	import Category from "../components/Category"
	import Highest from "../components/Highest"
	import LastMembers from "../components/LastMembers"
	import MyMemories from "../components/MyMemories"

	import {ref,computed} from "vue"
	import {useStore} from "vuex"
	export default {
		components:{
			Share,
			Post,
			Category,
			Highest,
			LastMembers,
			MyMemories
		},
		setup(props,context){
			const state = useStore()

			const userlogin = computed(()=>{
				return JSON.parse(ls.get('vuex')).loggedInUser
			})

			return {userlogin}

			onMounted(()=>{
				store.dispatch("setMutationLoginUserLikes")
			})
		}

	}
</script>
<style lang="scss">
	a{
		color:#088dcd
	}
	.fa-heart{
		color:#088dcd
	}
</style>