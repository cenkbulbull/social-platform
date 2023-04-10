<template>
 <Navbar/>
 <Transition>
  <router-view/>
 </Transition>
 <!--<Footer/> //tasarım bozukluğu!! -->
</template>
<script>
  import Navbar from "./components/shared/AppNavbar"
  import Footer from "./components/shared/AppFooter"

  import {onMounted} from "vue"
  import {useStore} from "vuex"

  export default{
    components:{
      Navbar,
      Footer
    },
    setup(){
      const store = useStore()


      onMounted(()=>{
        store.dispatch("setMutationUser")
        store.dispatch("setMutationSiteInfo")
        store.dispatch("setMutationPosts")
      })
    }
  }
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
