import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Contact from '../views/Contact.vue'
import Terms from '../views/Terms.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
import page404 from '../views/404.vue'

//guard
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

const authKontrol = (to,from,next) =>{
  let user = JSON.parse(ls.get('vuex')).loggedInUser

  if (!user) {
    next({name:"signup"}) //eğer giriş yapılmamışsa ve urlden başka biryere gidilmeye çalışılırsa signupa atılıyor
  }else{
    next() // girilmek istenen sayfaya gidiliyor
  }
}

const signUpKontrol = (to,from,next) =>{
  let user = JSON.parse(ls.get('vuex')).loggedInUser

  if (user) {
    next({name:""}) //eğer giriş yapılmışsa ve urlden signupa gidilmeye çalışılırsa anasayfa atılıyor
  }else{
    next() //signup sayfasına gidebiliyor
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter:authKontrol
  },
  {
    path: '/:category',
    name: 'home-category',
    component: HomeView,
    beforeEnter:authKontrol
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    beforeEnter:signUpKontrol
  },
  {
    path: '/profile/:name',
    name: 'profile',
    component: Profile,
    beforeEnter:authKontrol
  },
  {
    path:"/:pathMatch(.*)*", 
    name:page404,
    component:page404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
