<template>
	<div class="container-fluid pdng0">
		<div class="row merged">
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div class="land-featurearea">
					<div class="land-meta">
						<h1>{{siteInfo.name}}</h1>
						<p>
							{{siteInfo.description}}
						</p>
						<div style="display:flex;justify-content: center;flex-wrap: wrap; margin:20px 0 20px 0">
							<div v-for="i in 26">
								<input @click="avatar($event)" class="avatar" type="image" :src="require('../assets/images/avatars/Avatar-Maker ('+i+').png')"  :value="require('../assets/images/avatars/Avatar-Maker ('+i+').png')" width="50" >
							</div>
						</div>
					</div>	
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div class="login-reg-bg">
					<div class="log-reg-area sign">
						<h2 class="log-title">Kayıt Ol</h2>
						<p>
							<router-link to="/">{{siteInfo.name}}</router-link> ailesi üye olmanı sabırsızlıkla bekliyor
						</p>
						<RegisterForm :image="avatarimage"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import RegisterForm from "../components/RegisterForm"
	import {useStore} from "vuex"
	import {ref,computed} from "vue"
	export default{
		components:{
			RegisterForm
		},
		setup(){
			const avatarimage = ref("")

			const store = useStore()

			const siteInfo = computed(()=>{
				return store.getters.getSiteInfoState[0]
			})

			const avatar = (e)=>{
				//console.log(e.target.value)
				avatarimage.value=e.target.value.split("/")[2].split(".")[0]+".png" //sadece image ismini alıyoruz
			}

			return {avatarimage,avatar,siteInfo}
		}
	}
</script>