<template>
	<div class="topbar stick">
		<div class="logo">
			<router-link class="logoText" to="/" title="">LOGO</router-link>
		</div>

		<div class="top-area">
			<ul class="main-menu">
				<li>
					<router-link to="/">Anasayfa</router-link >
				</li>

				
				<li>
					<router-link  to="/contact" title="">İletişim</router-link>
				</li>		
				
			</ul>

			<!--<div v-if="userlogin==null" class="login-form">-->
				<div v-if="$store.getters.getLoggedInState!=true" class="login-form">	
					<form @submit.prevent="signin" method="post">
						<input v-model="user.username" class="mr-2" name="kullanici_kullaniciadi" type="text" placeholder="Kullanıcı Adı">
						<input v-model="user.password" class="mr-2" name="kullanici_password" type="password" placeholder="Şifre">
						<button class="mr-2" name="kullanicigiris" type="submit">Giriş Yap</button>
						<router-link class="mr-2" to="/signup"><button type="button">Kayıt Ol</button></router-link>
					</form>
				</div>

				<div v-else @click="logout" class="user-img">
				<!--<img style="width:50px;height: 50px;" src="" alt="">
				<div class="user-setting">
					<a><i class="ti-settings"></i>Hesap Ayarları</a>
					<a @click="logout" ><i class="ti-power-off"></i>Çıkış Yap</a>
				</div>-->
				<button class="btn btn-warning text-white btn-sm">Çıkış Yap</button>
			</div>
			
		</div>
	</div>
</template>
<script>
	import SecureLS from "secure-ls";
	var ls = new SecureLS({ isCompression: false });

	import { toast } from 'vue3-toastify';
	import 'vue3-toastify/dist/index.css';

	import Swal from 'sweetalert2'
	import {ref,onMounted,computed} from "vue"
	import CryptoJS from "crypto-js"
	import {useStore} from "vuex"
	import {useRouter} from"vue-router"
	export default{
		setup(props,context){
			const user = ref({
				username:null,
				password:null
			})
			const store = useStore()
			const router = useRouter()
			
			const userlogin = computed(()=>{
				return JSON.parse(ls.get('vuex')).loggedInUser
			})
			//const userlogin = JSON.parse(ls.get('vuex')).loggedInUser

			const logout = () =>{
				Swal.fire({
					title: 'Çıkış Yapılıyor',
					text: "Eminmisin",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#d33',
					cancelButtonColor: '#3085d6',
					confirmButtonText: 'Çık',
					cancelButtonText: 'Kal'
				}).then((result) => {
					if (result.isConfirmed) {
						store.commit("setStateloggedInUser",null)
						router.push("/signup")

						//çıkış yapıldığını söyleyen alert
						toast.warning('Çıkış yapıldı!!', {
							theme: 'colored',
							position: toast.POSITION.TOP_RIGHT,
							autoClose: 2000,
						});
					}
				})
			}

			const signin = () =>{
				const users = store.getters.getUsersState
				//console.log(users)

				const cryptedPassword = CryptoJS.HmacSHA1(user.value.password,process.env.VUE_APP_CRYPTOKEY).toString()

				users.filter((filter)=>{
					if (filter.username == user.value.username && filter.password == cryptedPassword) {
						//console.log(filter)
						store.commit("setStateloggedInUser",filter)
						router.push("/")

						//giriş yapıldığını söyleyen alert
						toast.success('Giriş yapıldı, hoşgeldiniz!!', {
							theme: 'colored',
							position: toast.POSITION.TOP_RIGHT,
							autoClose: 2000,
						});

					}
				})
				
				
			}

			return {logout,signin,user,userlogin}
		}
	}
</script>