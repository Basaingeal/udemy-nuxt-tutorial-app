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
export default {
  async asyncData (context) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      loadedPost: {
        id: 1,
        title: `First Post - ID ${context.params.id}`,
        previewText: 'This is our first post!',
        author: 'Michael J. Currie',
        updatedDate: new Date(),
        content: 'Some dummy text that is not previewText',
        thumbnail: 'https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2015/10/12000759/your-guide-to-the-perfect-spooky-halloween.jpg'
      }
    }
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
