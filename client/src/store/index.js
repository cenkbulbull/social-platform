import { createStore } from 'vuex'
import axios from "axios"
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    loggedInUser:null,
    siteInfo:{},
    posts:[],
    filterPosts:[],
    users:[],

    loginUserLikes:[],
    userPosts:[]

  },
  getters: {
    getLoggedInState(state){
      return state.loggedInUser!=null
    },
    getSiteInfoState(state){
      return state.siteInfo
    },
    getUsersState(state){
      return state.users
    },
    getPostsState(state){
      const post = state.posts
      return post
    },
    getFilterPostsState(state){
      return state.filterPosts
    },
    getLoginUserLikesState(state){
      return state.loginUserLikes
    },
    getUserPostsState(state){
      return state.userPosts
    }
  },
  mutations: {
    setStateloggedInUser(state,payload){
      state.loggedInUser = payload
    },
    setStateUser(state,payload){
      state.users = payload
    },
    setStateSiteInfo(state,payload){
      state.siteInfo = payload
    },
    setStatePosts(state,payload){
      state.posts = payload
    },
    setStateFilterPosts(state,payload){
      state.filterPosts = payload
    },
    setStateLoginUserLikes(state,payload){
      state.loginUserLikes = payload
    },
    setStateUserPosts(state,payload){
      state.userPosts = payload
    }
  },
  actions: {
    setMutationUser(context){
      axios.get("/user")
      .then((res)=>{
        context.commit("setStateUser",res.data)
      }).catch((err)=>{
        console.log(err)
      })
    },
    setMutationSiteInfo(context){
      axios.get("/site")
      .then((res)=>{
        context.commit("setStateSiteInfo",res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    setMutationPosts(context){
      axios.get("/post")
      .then((res)=>{
        context.commit("setStatePosts",res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    setMutationFilterPosts(context,par){
      //console.log(window.location.pathname)
      axios.get("/post/filter"+window.location.pathname)
      .then((res)=>{
        //console.log(res.data)
        context.commit("setStateFilterPosts",res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    setMutationLoginUserLikes(context){
        axios.get("user/"+context.state.loggedInUser.username)
        .then((res)=>{
          let likedPosts = []
          res.data[0].likedPostsId.forEach((item)=>{
            likedPosts.push(item)
          })
          context.commit("setStateLoginUserLikes",likedPosts)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    setMutationUserPosts(context){
        axios.get("/post/"+context.state.loggedInUser.username)
        .then((res)=>{
          let userPosts = []
          
          res.data.forEach((item)=>{
            userPosts.push(item)
          })
          context.commit("setStateUserPosts",userPosts)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
})
