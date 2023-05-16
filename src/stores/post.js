import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore("post", () => {
    const blogHTML = ref("Write your blog title here...")
    const blogTitle = ref("")
    const blogPhotoName = ref("")
    //文件上传的URL
    const blogPhotoFileURL = ref("")
    //是否显示预览
    const blogPhotoPreview = ref(false)
    //封面图片
    const blogCoverPhoto = null

    const updateBlogTitle = (payload) => {
        blogTitle.value = payload
        // console.log(blogTitle.value);
    }
    const newBlogPost = (payload) => {
        blogHTML.value = payload
        // console.log(blogHTML.value);
    }
    const updateFileName = (payload) => {
        blogPhotoName.value = payload
    }
    const createFileURL = (payload) => {
        blogPhotoFileURL.value = payload
    }

    // 预览按钮
    const openPhotoPreview = () => {
        blogPhotoPreview.value = !blogPhotoPreview.value
    }
    return {
        blogHTML, blogTitle, blogPhotoName, blogPhotoFileURL, blogPhotoPreview, blogCoverPhoto,
        updateBlogTitle, newBlogPost, updateFileName, createFileURL, openPhotoPreview
    }
})
