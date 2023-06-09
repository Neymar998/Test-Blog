import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useBlogCardStore = defineStore('blogcards', () => {

  let editPost = ref(false)
  const toggleEditPost = (payload) => {
    editPost.value = payload
  }
  return { editPost, toggleEditPost }
})

// '华文中宋', monospace