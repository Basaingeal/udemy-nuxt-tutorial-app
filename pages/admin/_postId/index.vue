<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  components: {
    AdminPostForm
  },
  data () {
    return {
      loadedPost: {
        author: 'Michael J. Currie',
        title: 'Awesome Post',
        content: 'Great content! Super good, really!',
        thumbnail: 'https://www.extremetech.com/wp-content/uploads/2016/11/Intel-Chipset-640x353.jpg'
      }
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
