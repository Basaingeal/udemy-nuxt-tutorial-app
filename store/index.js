import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
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
      },
      setToken (state, token) {
        state.token = token
      }
    },
    actions: {
      async nuxtServerInit (vuexContext, context) {
        try {
          const data = await context.app.$axios.$get(`${process.env.baseUrl}/posts.json`)
          const postsArray = []
          for (const key in data) {
            postsArray.push({ ...data[key],
              id: key
            })
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
          vuexContext.commit('addPost', { ...createdPost,
            id: data.name
          })
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
      },
      async authenticateUser (vuexContext, authData) {
        let authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
          process.env.fbAPIKey
        }`
        if (!authData.isLogin) {
          authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
            process.env.fbAPIKey
          }`
        }

        try {
          const responseData = await this.$axios.$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          vuexContext.commit('setToken', responseData.idToken)
        } catch (error) {
          console.log(error)
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
