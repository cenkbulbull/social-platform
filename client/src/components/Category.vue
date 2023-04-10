<template>
	<div class="widget">
		<h4 class="widget-title">Duygularına Göre</h4>
		<ul class="naves">

			<li v-for="cat in category">
				<!--<i class="ti-comments-smiley"></i>-->
				<router-link :to="'/'+cat.url" title="">{{cat.category}}</router-link>
			</li>		

		</ul>
	</div>

</template>
<script>
	import axios from "axios"
	import {useRoute} from "vue-router"
	import {useStore} from "vuex"
	import {ref,watch} from "vue"
	export default{
		setup(){
			const category = ref([
				{category:"Mutluluk",url:"mutluluk"},
				{category:"Üzüntü",url:"uzuntu"},
				{category:"Umut Dolu",url:"umut-dolu"},
				{category:"Komik",url:"komik"},
				{category:"Korku",url:"korku"},
				{category:"Şaşkınlık",url:"saskinlik"},
				{category:"Öfke",url:"ofke"},
				{category:"Aşk",url:"ask"},
				{category:"Utanç",url:"utanc"},
				{category:"Tiksinti",url:"tiksinti"},
			])

			const store = useStore()
			const route = useRoute()

			watch(route,(newRoute,oldRoute) =>{
				//console.log(newRoute.params.category)
				store.dispatch("setMutationFilterPosts")
			}) 

			return{category}
		}
	}
</script>
<style lang="scss">
	
</style>