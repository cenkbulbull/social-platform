<template>
	<div class="central-meta">
		<form @submit.prevent="share">
			<textarea v-model="form.title" name="post_baslik" rows="2" placeholder="başlık" maxlength="85" required="required"></textarea>
			<textarea v-model="form.content" name="post_icerik" rows="7" placeholder="içerik" maxlength="1200" required="required"></textarea>

			<div>
				<select v-model="form.category" class="custom-select custom-select-sm" size="5">
					<option selected="selected">Yaşadığın olaya en yakın duyguyu seç</option>

					<option value="mutluluk">Mutluluk</option>

					<option value="uzuntu">Üzüntü</option>

					<option value="umut-dolu">Umut Dolu</option>

					<option value="komik">Komik</option>

					<option value="korku">Korku</option>

					<option value="saskinlik">Şaşkınlık</option>

					<option value="ofke">Öfke</option>

					<option value="ask">Aşk</option>

					<option value="utanc">Utanç</option>

					<option value="tiksinti">Tiksinti</option>

				</select>
			</div>

			<div class="attachments">
				<button type="submit">Anını Paylaş</button>
			</div>
		</form>
	</div>
</template>
<script>
	import SecureLS from "secure-ls";
	var ls = new SecureLS({ isCompression: false });

	import Swal from 'sweetalert2'
	import axios from "axios"
	import {useStore} from "vuex"
	import {ref,computed} from "vue"
	export default{
		setup(){
			const userlogin = computed(()=>{
				return JSON.parse(ls.get('vuex')).loggedInUser
			})
 
			const form = ref({
				user:userlogin.value.username,
				userAvatar:userlogin.value.avatar,
				date:new Date(),
				title:null,
				content:null,
				category:null,
				likes:0
			})

			const store = useStore()



			const share = async() =>{
				//console.log(form)
				await axios.post("/post",form.value)
				.then((res)=>{
					//console.log(res.data)
					store.dispatch("setMutationPosts")
					//anı sayısını 1 artırma işlemi için istek
					axios.put("/user/totalpost/"+userlogin.value.username,{operator:1})
					.then((res)=>{
						//console.log("anı artırıldı")
					})
					.catch((err)=>{
						console.log(err)
					})
				})
				.catch((err)=>{
					console.log(err)
				})

				//sweetalert ile uyarı
				Swal.fire({
					icon: 'success',
					text: 'Paylaşıldı.!',
					timer: 1500,
				})

			}

			return {share,form,userlogin}
		}
	}
</script>
<style>
	
</style>