<template>
  <section class="posts-list">
    <PostPreview
      id="1"
      title="Hello there!"
      preview-text="this is my first post!"
      thumbnail="https://www.extremetech.com/wp-content/uploads/2016/11/Intel-Chipset-640x353.jpg"/>
    <PostPreview
      id="2"
      title="Hello there - the second time!"
      preview-text="This is my second post!"
      thumbnail="https://www.extremetech.com/wp-content/uploads/2016/11/Intel-Chipset-640x353.jpg"/>
    <PostPreview
      id="3"
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
