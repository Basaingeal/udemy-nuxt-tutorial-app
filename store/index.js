import Vuex from 'vuex'

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
        await new Promise(resolve => setTimeout(resolve, 1500))
        vuexContext.commit('setPosts', [
          {
            id: 1,
            title: 'First Post',
            previewText: 'This is our first post!',
            thumbnail: 'https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2015/10/12000759/your-guide-to-the-perfect-spooky-halloween.jpg'
          },
          {
            id: 2,
            title: 'Second Post',
            previewText: 'This is our second post!',
            thumbnail: 'https://images.indianexpress.com/2017/10/halloween_lead_pxabay-759.jpg'
          }
        ])
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
