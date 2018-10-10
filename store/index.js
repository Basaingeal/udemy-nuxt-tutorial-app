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
      },
      addPost (state, newPost) {
        state.loadedPosts.push(newPost)
      },
      editPost (state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
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
      },
      async addPost (vuexContext, newPost) {
        const createdPost = {
          ...newPost,
          updatedDate: new Date()
        }
        try {
          const response = await axios.post('https://nuxt-blog-b8db6.firebaseio.com/posts.json', createdPost)
          vuexContext.commit('addPost', { ...createdPost, id: response.data.name })
        } catch (e) {
          console.log(e)
        }
      },
      async editPost (vuexContext, editedPost) {
        try {
          await axios.put(`https://nuxt-blog-b8db6.firebaseio.com/posts/${editedPost.id}.json`, editedPost)
          vuexContext.commit('editPost', editedPost)
        } catch (e) {
          console.log(e)
        }
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
