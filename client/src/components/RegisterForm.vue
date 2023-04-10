<template>
	<form @submit.prevent="signup">

		<div class="form-outline mb-4">
			<!--<div v-if="registered" class="alert alert-success">Kayıt başarılı, giriş yapabilirsiniz...</div>-->
			<input v-if="register.avatar.length>0" :src="require('../assets/images/avatars/'+register.avatar)" :value="require('../assets/images/avatars/'+register.avatar)" type="image" width="50" disabled />
			<div v-else class="alert alert-warning">Lütfen yan taraftan avatar seçiniz!!</div>
		</div>

		<div class="form-outline mb-4">
			<input v-model="register.mail" type="email" class="form-control" placeholder="E-mail" />
			<span v-if="v$.mail.$error" class="text-danger">
				Lütfen mail formatı girin
			</span>
		</div>
		<div class="form-outline mb-4">
			<input v-model="register.username" type="text" class="form-control" placeholder="Kullanıcı Adı" />
			<span v-if="v$.username.$error" class="text-danger">
				Lütfen kullanıcı adınızı girin
			</span>
		</div>
		<div class="row mb-4">
			<div class="col">
				<div class="form-outline">
					<input v-model="register.password" type="password" class="form-control" placeholder="Şifre" />
					<span v-if="v$.password.$error" class="text-danger">
						Lütfen en az 8 karakterli şifre girin
					</span>
				</div>
			</div>
			<div class="col">
				<div class="form-outline">
					<input v-model="register.repassword" type="password" class="form-control" placeholder="Şifreyi Tekrarla" />
				</div>
				<span v-if="v$.repassword.$error" class="text-danger">
					Şifreler Uyuşmuyor
				</span>
			</div>
		</div>


		<div class="form-check d-flex justify-content-center mb-4">
			<input required style="width:15px;" name="kullanimsozlesmesi" value="" type="checkbox"/><p style="font-size: 13px;margin: 5px 5px;"><router-link class="kullanicisartlarilabel" to="/terms" target="_blank">Kullanıcı Şartları</router-link>nı okudum ve kabul ediyorum</p>
		</div>


		<button type="submit" class="btn btn-primary btn-block mb-4">Kayıt Ol</button>

	</form>
</template>
<script>
	import Swal from 'sweetalert2'
	import { reactive,ref,computed,watch} from 'vue'
	import axios from "axios"
	import CryptoJS from "crypto-js"
	import {useStore} from "vuex"
	import { useVuelidate } from '@vuelidate/core'
	import { required, email,minLength,sameAs } from '@vuelidate/validators'
	export default{
		props:["image"],
		setup(props){

			const store = useStore()
			const registered = ref(false)


			const register = reactive({
				mail: '',
				username: '',
				password: '',
				repassword:'',
				avatar:''
			})


			const rules = computed(() => {
				return{
					mail: { required,email },
					username: { required},
					password: { required,minLength:minLength(8) },
					repassword: {required,sameAsPassword: sameAs(register.password)},
					avatar:{required}
				}
			})

			const v$ = useVuelidate(rules, register)

			
			watch(props,(newprops,oldprops)=>{
				//console.log(newprops)
				register.avatar = props.image
			})		
			

			const signup = async()=>{
		       const result = await v$.value.$validate()
				//console.log(result)
				if (result) {

					const cryptedPassword = CryptoJS.HmacSHA1(register.password,process.env.VUE_APP_CRYPTOKEY).toString()

					const users = store.getters.getUsersState
					//console.log(users)

					if (users.length>0) {
						let mükerrer = false
						for(var i=0; i<users.length;i++){

							if (users[i].username == register.username) {
								console.log("Mükerrer Kayıt")
								mükerrer = true

								//sweetalert ile uyarı
								Swal.fire({
									icon: 'error',
									text: 'Bu kullanıcı adıyla bir kayıt zaten var.!',
									confirmButtonText: 'Tekrar',
								})
								break;
							}

						}

						if (mükerrer==false) {
							axios.post(process.env.VUE_APP_API+"/user",{...register,password:cryptedPassword,likedPostsId:[],totalPosts:0,totalLikes:0,dateOfRegister:new Date})
								.then((res)=>{
									//console.log(res)
									store.dispatch("setMutationUser") //kayıt işleminden hemen sonra state güncelliyoruz

									//sweetalert ile uyarı
									Swal.fire({
										icon: 'success',
										text: 'Kayıt başarılı, giriş yapabilirsiniz.!',
										timer: 1500,
									})
								})
								.catch((err)=>{
									console.log(err)
								})

								//console.log(cryptedPassword)

								registered.value = true
						}

					}else{
						axios.post(process.env.VUE_APP_API+"/user",{...register,password:cryptedPassword,likedPostsId:[],totalLikes:0})
						.then((res)=>{
							console.log(res)
								store.dispatch("setMutationUser") //kayıt işleminden hemen sonra state güncelliyoruz

								//sweetalert ile uyarı
								Swal.fire({
									icon: 'success',
									text: 'Kayıt başarılı, giriş yapabilirsiniz.!',
									confirmButtonText: 'Tamam',

								})
							})
						.catch((err)=>{
							console.log(err)
						})

						registered.value = true
					}

				}

			}

			return { register, v$,signup,registered }
		}
	}
</script>
<style scoped lang="scss">
	form{
		span{
			font-size:11px
		}
	}
</style>