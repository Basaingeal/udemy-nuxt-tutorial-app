import Vuex from 'vuex'

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
          const data = await context.app.$axios.$get(`${process.env.baseUrl}/posts.json`)
          const postsArray = []
          for (const key in data) {
            postsArray.push({ ...data[key], id: key })
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
          const data = await this.$axios.$post(`/posts.json`, createdPost)
          vuexContext.commit('addPost', { ...createdPost, id: data.name })
        } catch (e) {
          console.log(e)
        }
      },
      async editPost (vuexContext, editedPost) {
        try {
          await this.$axios.put(`/posts/${editedPost.id}.json`, editedPost)
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
