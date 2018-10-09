<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
import axios from 'axios'

export default {
  components: {
    AdminPostForm
  },
  layout: 'admin',
  async asyncData (context) {
    try {
      const response = await axios.get(`https://nuxt-blog-b8db6.firebaseio.com/posts/${context.params.postId}.json`)
      return {
        loadedPost: response.data
      }
    } catch (e) {
      context.error(e)
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
