import Vuex from 'vuex'
import Cookie from 'js-cookie'

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
      },
      clearToken (state, token) {
        state.token = null
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
          const data = await this.$axios.$post(`/posts.json?auth=${vuexContext.state.token}`, createdPost)
          vuexContext.commit('addPost', { ...createdPost,
            id: data.name
          })
        } catch (e) {
          console.log(e)
        }
      },
      async editPost (vuexContext, editedPost) {
        try {
          await this.$axios.put(`/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`, editedPost)
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
          window.localStorage.setItem('token', responseData.idToken)
          window.localStorage.setItem('tokenExpiration', new Date().getTime() + responseData.expiresIn * 1000)
          Cookie.set('jwt', responseData.idToken)
          Cookie.set('expirationDate', new Date().getTime() + responseData.expiresIn * 1000)
        } catch (error) {
          console.log(error)
        }
      },
      initAuth (vuexContext, request) {
        let token
        let expirationDate

        if (request) {
          if (!request.headers.cookie) {
            return
          }

          const jwtCookie = request.headers.cookie
            .split(';')
            .find(c => c.trim()
              .startsWith('jwt='))

          if (!jwtCookie) {
            return
          }

          token = jwtCookie.split('=')[1]
          expirationDate = request.headers.cookie
            .split(';')
            .find(c => c.trim()
              .startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = window.localStorage.getItem('token')
          expirationDate = window.localStorage.getItem('tokenExpiration')
        }

        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          vuexContext.dispatch('logout')
          return
        }

        vuexContext.commit('setToken', token)
      },
      logout (vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      loadedPosts (state) {
        return state.loadedPosts
      },
      isAuthenticated (state) {
        return state.token != null
      }
    }
  })
}

export default createStore
