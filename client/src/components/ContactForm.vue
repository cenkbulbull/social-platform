<template>

	<form ref="form" @submit.prevent="send">
		<div class="form-outline mb-4">
			<input v-model="contact.name" type="text" class="form-control" name="from_name" placeholder="Ad ve soyad" />
			<span v-if="v$.name.$error" class="text-danger">
				Lütfen adınızı girin
			</span>
		</div>

		<div class="form-outline mb-4">
			<input v-model="contact.email" type="text" class="form-control" name="from_email" placeholder="E-mail" />
			<span v-if="v$.email.$error" class="text-danger">
				Lütfen mail formatı girin
			</span>
		</div>

		<div class="form-outline mb-4">
			<input v-model="contact.tel" type="number" class="form-control" name="from_tel"  placeholder="Telefon" />
			<span v-if="v$.tel.$error" class="text-danger">
				Lütfen en fazla 11 karakterli sayı girin
			</span>
		</div>

		<div class="form-outline mb-4">
			<textarea v-model="contact.message" class="form-control" rows="4" name="message"  placeholder="Mesaj"></textarea>
			<span v-if="v$.message.$error" class="text-danger">
				Mesaj alanı boş geçilemez
			</span>
		</div>

		<button type="submit" class="btn btn-primary btn-block mb-4 w-25 float-right"><i class="fa-solid fa-paper-plane"></i></button>
	</form>

</template>
<script>
	import { reactive,computed,ref} from 'vue'
	import emailjs from '@emailjs/browser';
	import { useVuelidate } from '@vuelidate/core'
	import { required, email,numeric,maxLength } from '@vuelidate/validators'
	export default{
		setup(){

			const form = ref(null)

			const service_id = process.env.VUE_APP_SERVICEIDEMAILJS
			const template_id = process.env.VUE_APP_TEMPLATEIDEMAILJS
			const public_key = process.env.VUE_APP_PUBLICKEYEMAILJS

			const contact = reactive({
				name: '',
				email: '',
				tel: '',
				message:''
			})

			const rules = computed(() => {
				return{
					name: { required}, 
					email: { required,email },
					tel: { required,numeric,maxLength: maxLength(11)},
					message: { required }
				}
			})

			const v$ = useVuelidate(rules, contact)

			const send = async()=>{
				const result = await v$.value.$validate()
				//console.log(result)
				if (result) {
					emailjs.sendForm(service_id, template_id , form.value , public_key)
					.then((result) => {
						console.log('SUCCESS!', result.text);
					}, (error) => {
						console.log('FAILED...', error.text);
					});
				}
			}

			return { contact, v$,send,form }
		}
	}
</script>
<style scoped lang="scss">
	.btn-primary{
		background-color:#103f6e;
		border:none;
		&:hover{
			background-color:#103f6e;

		}
	}
	form{
		span{
			font-size:11px
		}
	}
</style>