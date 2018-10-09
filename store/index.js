import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts (state, posts) {
        state.loadedPosts = posts
      }
    },
    actions: {
      async nuxtServerInit (vuexContext, context) {
        try {
          const response = await axios.get('https://nuxt-blog-b8db6.firebaseio.com/posts.json')
          const postsArray = []
          for (const key in response.data) {
            postsArray.push({ ...response.data[key], id: key })
          }
          vuexContext.commit('setPosts', postsArray)
        } catch (e) {
          context.error(e)
        }
      },
      setPosts (vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      }
    },
    getters: {
      loadedPosts (state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore
