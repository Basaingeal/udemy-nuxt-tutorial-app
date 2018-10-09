<template>
  <section class="posts-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      title="Hello there!"
      preview-text="This is my first post!"
      thumbnail="https://www.extremetech.com/wp-content/uploads/2016/11/Intel-Chipset-640x353.jpg"/>
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      title="Hello there - the second time!"
      preview-text="This is my second post!"
      thumbnail="https://www.extremetech.com/wp-content/uploads/2016/11/Intel-Chipset-640x353.jpg"/>
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      title="Hi!"
      preview-text="This is my third post!"
      thumbnail="https://www.extremetech.com/wp-content/uploads/2016/11/Intel-Chipset-640x353.jpg"/>
  </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
