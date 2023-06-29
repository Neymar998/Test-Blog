<template>
    <div class="create-post">
        <BlogCoverPreview v-show="store.blogPhotoPreview" />
        <div class="container">
            <div class="err-message" :class="{ invisible: !error }">
                <h6><span>Error:</span>{{ errorMessage }}</h6>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="输入博客标题" v-model="blogTitle">
                <div class="upload-file">
                    <label for="blog-photo">上传封面图片</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg" @change="fileChange">
                    <button @click="openPreview" class="preview"
                        :class="{ 'button-inactive': !store.blogPhotoFileURL }">预览图片</button>
                    <span>File Chosen:{{ store.blogPhotoName }}</span>
                </div>
            </div>
            <Editor v-model="content" api-key="vbu9blblrlgdnv7j2zs8788kohlwf6206bqjgucdguelw77m" :init="{
                height: 500,
                language: 'zh_CN',
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'advcode',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat',
            }" />
            <div class="blog-actions">
                <button @click="uploadBlog"> 发 布 </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, } from 'vue';
import { usePostStore } from '../stores/post';
import { useGetpostStore } from '../stores/get';
import { useRouter } from 'vue-router';
import { useProfileStore } from '../stores/profile';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import Editor from '@tinymce/tinymce-vue';
import db from '../firebase/firebaseInit'
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import { load } from '../utils/loading.js'

const store = usePostStore()
const profileStore = useProfileStore()
const storeGetpost = useGetpostStore()
const router = useRouter()

let error = ref(null)
let errorMessage = ref(null)
let file = ref(null)
let blogPhoto = ref(null)
let content = ref(null)
let blogTitle = computed({
    get() {
        return store.blogTitle
    },
    set(payload) {
        store.updateBlogTitle(payload)
    }
})
// 封面图片
const fileChange = (event) => {
    // file.value = blogPhoto.value.files[0]
    file.value = event.target.files[0]
    const fileName = file.value.name
    store.updateFileName(fileName)
    // 创建FileReader对象
    const reader = new FileReader()
    // 当文件加载完成时
    reader.onload = (e) => {
        // 读取的DataURL存储在组件的数据属性中
        store.createFileURL(e.target.result)
    }
    // 读取文件
    reader.readAsDataURL(file.value)
}
//是否预览封面图片
const openPreview = () => {
    store.openPhotoPreview()
}
//发布blog
const uploadBlog = async () => {
    store.newBlogPost(content.value)
    if (blogTitle.value && store.blogHTML) {
        if (file.value) {
            load.show('发布中')
            const colRef = collection(db, 'blogPosts')
            const dataObj = {
                blogTitle: blogTitle.value,
                blogCoverPhoto: store.blogPhotoFileURL,
                blogCoverName: store.blogPhotoName,
                blogHTML: store.blogHTML,
                date: new Date(),
                profileID: profileStore.profileId,
            }
            await addDoc(colRef, dataObj)
                .then(async (docRef) => {
                    const blogID = docRef.id
                    await updateDoc(doc(db, 'blogPosts', blogID), {
                        blogID: blogID
                    }, { merge: true })
                })
                .then(async () => {
                    await storeGetpost.getPost()
                    load.hide()
                    // console.log('NO3：马上我要跳转了');
                    router.push('/')
                }).catch((e) => {
                    load.hide()
                    errorMessageFun(`发布失败${e}`, 5000)
                    return
                })
        } else {
            errorMessageFun('请上传封面', 2000)
            return
        }
    } else {
        errorMessageFun('没有Title或者Blog为空', 2000)
    }
}
const errorMessageFun = (str, time) => {
    error.value = true
    errorMessage.value = str
    setTimeout(() => {
        error.value = false
        errorMessage.value = ''
    }, time);
}
</script>

<style lang="scss">
.create-post {
    position: relative;
    height: 100%;

    button {
        margin-top: 0;
    }

    .router-button {
        text-decoration: none;
        color: #fff;
    }

    label,
    button,
    .router-button {
        transition: 0.5s ease all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;

        &:hover {
            background-color: rgba(48, 48, 48, 0.8);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;
    }

    // error styling
    .invisible {
        opacity: 0 !important;
    }

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #303030;
        opacity: 1;
        transition: 0.5s ease all;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1) {
            min-width: 30px;
        }

        input {
            transition: .5s ease all;
            border: none;
            border-bottom: 1px solid #303030;
            padding: 10px 4px;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }
    }

    .upload-file {
        flex: 1;
        margin-left: 16px;
        position: relative;
        display: flex;

        input {
            display: none;
        }
    }

    .preview {
        margin-left: 16px;
        text-transform: initial;
    }

    span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
    }

    .editor {
        height: 60vh;
        display: flex;
        flex-direction: column;

        .ql-container {
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            overflow: scroll;
        }
    }

    .blog-actions {
        margin-top: 32px;

        button {
            margin-right: 16px;

        }
    }
}
</style>