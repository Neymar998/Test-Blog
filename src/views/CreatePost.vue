<template>
    <div class="create-post">
        <BlogCoverPreview v-show="store.blogPhotoPreview" />
        <div class="container">
            <div class="error-message">
                <p><span>Error:</span>出错了？</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="store.blogTitle">
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg" @change="fileChange">
                    <button @click="openPreview" class="preview"
                        :class="{ 'button-inactive': !store.blogPhotoFileURL }">Preview Photo</button>
                    <span>File Chosen:{{ store.blogPhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                <QuillEditor theme="snow" v-model:content="blogHTML" @ready="onEditorReady($event)"></QuillEditor>
            </div>
            <div class="blog-actions">
                <button>Publish Blog</button>
                <router-link to="#" class="router-button">Preview Post</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePostStore } from '../stores/post';
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
const store = usePostStore()

const file = ref(null)
const blogPhoto = ref(null)
const fileChange = (event) => {
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


const profileId = computed(() => {
    return store.profileId
})
const blogCoverPhoto = computed(() => {
    return store.blogPhotoName
})
const blogTitle = computed({
    get() {
        return store.blogTitle
    },
    set(payload) {
        store.updateBlogTitle(payload)
    }
})
const blogHTML = computed({
    get() {
        return store.blogHTML
    },
    set(payload) {
        store.newBlogPost(payload)
    }
})
const onEditorReady = (e) => {
    // console.log(e);
    e.container.querySelector('.ql-blank').innerHTML = 'write your blog here...'
}
const openPreview = () => {
    store.openPhotoPreview()
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

    //error style
    .invisible {
        opacity: 0 !important;
    }

    .err-message {
        width: 100%;
        padding: 12px;
        color: #fff;
        margin-bottom: 10px;
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
            min-width: 300px;
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