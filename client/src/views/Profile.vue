<template>
	<div class="col-lg-12">
		<div class="inbox-sec">
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12">
					<div class="inbox-lists">

						<div class="mesages-lists">
							<hr>
							<i><span style="margin-left: 30px; color:#4fb4d5;font-size: 20px;">{{$route.params.name}}'in paylaşımları</span></i>
							<hr>

							<TransitionGroup name="list">
								<ul v-for="post in posts" :key="post._id" id="message-list" class="message-list ps-container ps-theme-default">

									<li class="unread">
										<figure style="width:50px;height: 50px;display: flex; flex-direction: row;">
											<img :src="require(`@/assets/images/avatars/${post.userAvatar}`)">
											<p style="margin:11px 10px">{{$route.params.name}}</p>
										</figure>

										<h3 class="sender-name ml-0">{{post.title}}</h3>

										<p>{{post.content}}</p>

										<div class="we-video-info">
											<ul>
												<li>
													<form class="likeForm" action="javascript:void(0);">
														<input class="post_id" type="hidden" name="post_id" value="51">
														<input type="hidden" name="post_sahip" value="kullanici5">
														<input class="begenen" type="hidden" name="begenen" value="">

														<span data-toggle="tooltip" title="" data-original-title="like">
															<ins>{{post.likes}}</ins>

															<div v-if="userlogin!=null && userlogin.username != $route.params.name" >
																<i style="cursor: pointer;" v-if="!(likedPosts.some(item=> item == post._id))" @click="like(post.user, post._id)" class="fa-solid fa-heart"></i>
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

										<div v-if="userlogin!=null && userlogin.username == $route.params.name">
											<button @click="deletePost(post._id)" class="btn btn-danger btn-sm">Delete</button>
										</div>

									</li>
								</ul>
							</TransitionGroup>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import SecureLS from "secure-ls";
	var ls = new SecureLS({ isCompression: false });

	import Swal from 'sweetalert2'
	import axios from "axios"
	import {useRoute} from "vue-router"
	import {computed,onMounted,ref} from "vue"
	import {useStore} from "vuex"

	export default{
		setup(){
			const route = useRoute()
			const store = useStore()
			const userlogin = computed(()=>{
				return JSON.parse(ls.get('vuex')).loggedInUser
			})

			const posts = ref(null)

			onMounted(async()=>{
				store.dispatch("setMutationUserPosts")
				store.dispatch("setMutationPosts")


				//route'a göre postları çağırma
				await axios.get("/post/"+route.params.name)
				.then((res)=>{
					//console.log(res.data)
					posts.value = res.data
				})
				.catch((err)=>{
					console.log(err)
				})
			})

			const deletePost = (event) =>{
				//console.log(event)

				Swal.fire({
					title: 'Siliniyor',
					text: 'Post ID : '+event,
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#d33',
					cancelButtonColor: '#3085d6',
					confirmButtonText: 'Sil',
					cancelButtonText: 'Silme'
				}).then((result) => {
					if (result.isConfirmed) {
						axios.delete("/post/remove/"+event)
						.then((res)=>{
							//console.log(res.data)

							//post silinince anı sayısını 1 azaltma işlemi için istek
							axios.put("/user/totalpost/"+userlogin.value.username,{operator:-1})
							.then((res)=>{
								//console.log("anı azaltıldı")
							})
							.catch((err)=>{
								console.log(err)
							})

							store.dispatch("setMutationUserPosts") // post silinince veritabanından tekrar çağırma
							store.dispatch("setMutationPosts") //post silinince tüm postları tekrar çağırma(anasayfada kullanılıyor)

							//post silinince route'a göre postları çağırma
							axios.get("/post/"+route.params.name)
							.then((res)=>{
								//console.log(res.data)
								posts.value = res.data
							})
							.catch((err)=>{
								console.log(err)
							})


						})
						.catch((err)=>{
							console.log(err)
						})
					}
				})

			}


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

			return {posts,userlogin,deletePost,like,likedPosts}
		}
	}
</script>
<style lang="scss">
	.fa-heart{
		&:hover{
			color:#008000
		}
	}

	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}
	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
</style>