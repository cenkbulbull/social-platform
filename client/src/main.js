import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/color.css"
import "./assets/css/style.css"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API

createApp(App).use(store).use(router).mount('#app')
