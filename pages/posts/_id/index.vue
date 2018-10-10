<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div>Last updated on {{ loadedPost.updatedDate }}</div>
        <div>Written by {{ loadedPost.author }}</div>
      </div>
      <p>{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send mail to
        <a href="mailto:michaeljcurrie136@gmail.com">michaeljcurrie136@gmail.com</a>
      </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData (context) {
    try {
      const response = await axios.get(`https://nuxt-blog-b8db6.firebaseio.com/posts/${context.params.id}.json`)
      return {
        loadedPost: response.data
      }
    } catch (e) {
      context.error(e)
    }
  },
  head: {
    title: 'A blog post'
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
