<template>
  <div class="posts-page">
    <PostsList :posts="loadedPosts"/>
  </div>
</template>

<script>
import PostsList from '@/components/Posts/PostsList'

export default {
  components: {
    PostsList
  },
  async asyncData () {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
      loadedPosts: [
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
      ]
    }
  }
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
