<template>
	<section>
		<div class="gap no-top">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<div class="g-map">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48152.69528633698!2d29.01271007818618!3d41.035243200158526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac826d524c9f1%3A0xc14f7612337b7f38!2zw5xza8O8ZGFyL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1519733547760" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</section>

	<section>
		<div class="gap no-top overlap">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<div class="contct-info">
							<div class="contact-form">
								<div class="cnt-title">
									<span>Bize Mesaj Gönder</span>
									<!--<i><img src="images/envelop.png" alt=""></i>-->
								</div>
								<ContactForm/>
							</div>
							<div class="cntct-adres">
								<h3>İletişim Bilgileri</h3>
								<ul>
									<li>
										<i class="fa-solid fa-location-dot"></i>
										<span>{{infostate.contact.location}}</span>
									</li>
									<li>
										<i class="fa fa-mobile-phone"></i>
										<span>{{infostate.contact.tel}}</span>
									</li>
									<li>
										<i class="fa-solid fa-envelopes-bulk"></i>
										<span>{{infostate.contact.mail}}</span>
									</li>
								</ul>
								<ul class="social-media">
									<li>
										<a :href="infostate.contact.facebook" target="_blank"><i class="fa-brands fa-square-facebook"></i></a>
									</li>
									<li>
										<a :href="infostate.contact.instagram" target="_blank"><i class="fa-brands fa-square-instagram"></i></a>
									</li>
									<li>
										<a :href="infostate.contact.linkedin" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
									</li>
									<li>
										<a :href="infostate.contact.twitter" target="_blank"><i class="fa-brands fa-square-twitter"></i></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import ContactForm from "../components/ContactForm"
	import {useStore} from "vuex"
	import {computed} from "vue"
	export default{
		components:{
			ContactForm
		},
		setup(){
			const store = useStore()

			const infostate = computed(()=>{
				return store.getters.getSiteInfoState[0]
			})


			return{infostate}


		}
	}
</script>
<style>
	
</style>