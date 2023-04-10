<template>
	<div v-for="post in posts" class="central-meta item" style="display: inline-block;">
		<div class="user-post">
			<div class="friend-info">
				<figure>
					<img :src="require(`@/assets/images/avatars/${post.userAvatar}`)">
				</figure>

				
				<div class="friend-name">
					<ins><router-link :to="'/profile/'+post.user">{{post.user}}</router-link></ins>
					<span>{{post.date}}</span>
				</div>
				<div style="word-wrap: break-word;" class="description">
					<h5>{{post.title}}</h5>
					<p>{{post.content}}</p>
				</div>

				
				
				<div class="post-meta">
					<div class="we-video-info">
						<ul>
							<li>
								<form class="likeForm" action="javascript:void(0);">
									<input class="post_id" type="hidden" name="post_id" value="51">
									<input type="hidden" name="post_sahip" value="kullanici5">
									<input class="begenen" type="hidden" name="begenen" value="">

									<span data-toggle="tooltip" title="" data-original-title="like">
										<!--<i class="fa-regular fa-heart"></i>-->
										<ins>{{post.likes}}</ins>

										<div v-if="userlogin!=null && userlogin.username != post.user" >
											<i v-if="!(likedPosts.some(item=> item == post._id))" @click="like(post.user, post._id)" class="fa-solid fa-heart" style="cursor: pointer;"></i> 
											<i v-else class="fa-sharp fa-solid fa-heart-circle-check" style="color: #088dcd;"></i>
										</div>
										<div v-else>
											<i class="fa-sharp fa-solid fa-heart-circle-xmark" style="color: #088dcd;"></i>
										</div>
									</span>

								</form>
							</li>
						</ul>
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
	import {useStore,getters } from "vuex"
	import {computed,onMounted,ref} from "vue"
	export default{
		setup(props,context){
			const store = useStore()
			
			const userlogin = computed(()=>{
				return JSON.parse(ls.get('vuex')).loggedInUser
			})

			const posts = computed(()=>{
				return store.getters.getFilterPostsState.length>0 ? store.getters.getFilterPostsState : store.getters.getPostsState
			})


			const likedPosts = computed(()=>{
				return store.getters.getLoginUserLikesState
			})


			const like = async(postUser,postId) =>{
				/*console.log("beğenen-->"+ userlogin.value.username)
				console.log("post sahibi-->"+postUser + " postıd-->" + postId)*/

				await axios.put("/user/liked/"+postId,{username:userlogin.value.username, postUser})
				.then((res)=>{
					console.log("kullanıcı beğeni arrayi güncellendi & totallike artırıldı")
				})
				.catch((err)=>{
					console.log(err)
				})


				//post beğenisi artırma 
				await axios.put("/post/"+postId)
				.then((res)=>{
					console.log("post beğenisi arttı")
				})
				.catch((err)=>{
					console.log(err)
				})


				store.dispatch("setMutationLoginUserLikes") // beğeni durumunda giriş yapan kullanıcının beğendikleri postları storeda güncelliyoruz.

			}

			return {userlogin,posts,like,likedPosts}

		}
	}
</script>
<style lang="scss">
	.fa-heart{
		&:hover{
			color:#008000
		}
	}
</style>