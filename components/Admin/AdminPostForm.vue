<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
    <AppControlInput
      v-model="editedPost.content"
      control-type="textarea">Content</AppControlInput>
    <AppControlInput
      v-model="editedPost.previewText"
      control-type="textarea">Preview Text</AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel">Cancel</AppButton>
  </form>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'

export default {
  components: {
    AppControlInput,
    AppButton
  },
  props: {
    post: {
      type: Object,
      required: false,
      default () { return null }
    }
  },
  data () {
    return {
      editedPost: this.post ? { ...this.post } : {
        author: '',
        title: '',
        tumbnailLink: '',
        content: '',
        previewText: '',
        id: ''
      }
    }
  },
  methods: {
    onSave () {
      // Save the post
      this.$emit('submit', this.editedPost)
    },
    onCancel () {
      this.$router.push('/admin')
    }
  }
}
</script>
