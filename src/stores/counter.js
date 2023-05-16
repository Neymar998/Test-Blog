import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment(number) {
    count.value += number
  }

  return { count, doubleCount, increment }
})

export const useBlogCardStore = defineStore('blogcards', () => {
  const sampleBlogCard = reactive([
    { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May,1,2023" },
    { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May,2,2023" },
    { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May,3,2023" }
  ])
  let editPost = ref(false)
  const toggleEditPost = (payload) => {
    editPost.value = payload
  }
  return { sampleBlogCard, editPost, toggleEditPost }
})

// '华文中宋', monospace