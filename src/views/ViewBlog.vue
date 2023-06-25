<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <template v-if="currentBlog">
                <!-- <h2>{{ currentBlog.blogTitle }}</h2> -->
                <!-- <img :src="currentBlog.blogCoverPhoto" alt="" class="blogCoverPhoto"> -->
                <div class="post-contain ql-editor" v-html="currentBlog.blogHTML"></div>
                <h4>发布于:{{ formatDate(currentBlog.blogDate) }}</h4>
            </template>
            <template v-else>
                <el-skeleton animated>
                    <template #template>
                        <el-skeleton-item variant="h1" style="display:block;width: 20%;margin-bottom: 20px;" />
                        <el-skeleton-item variant="h3" style="width: 30%;margin-bottom:10px ;" />
                        <el-skeleton-item variant="image" style="width: 240px; height: 240px"></el-skeleton-item>
                        <el-skeleton variant="p" :rows="15" />
                    </template>
                </el-skeleton>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUpdated } from 'vue'
import { useGetpostStore } from '../stores/get';
import { useRoute } from 'vue-router'
const store = useGetpostStore()
const router = useRoute()

const currentBlog = ref(null)

//1.
// const filteredBlogPosts = store.blogPosts.filter(post => {
//     return post.blogID === router.params.blogid
// })
// currentBlog.value = filteredBlogPosts.length > 0 ? filteredBlogPosts[0] : null


//2.
watchEffect(() => {
    // 监听 store.blogPosts 的变化
    const filteredBlogPosts = store.blogPosts.filter(post => {
        return post.blogID === router.params.blogid
    })
    currentBlog.value = filteredBlogPosts.length > 0 ? filteredBlogPosts[0] : null
})
// onMounted(() => {
//     console.log(currentBlog.value) //null
// })
// onUpdated(() => {
//     console.log(currentBlog.value) //Reactive
// })
function formatDate(date) {
    let diff = new Date() - new Date(date); // 以毫秒表示的差值

    if (diff < 1000) { // 少于 1 秒
        return '刚刚';
    }

    let sec = Math.floor(diff / 1000); // 将 diff 转换为秒

    if (sec < 60) {
        return sec + '秒前';
    }

    let min = Math.floor(diff / 60000); // 将 diff 转换为分钟
    if (min < 60) {
        return min + ' 分钟前';
    }

    // 格式化 date
    // 将前置 0 加到一位数 day/month/hours/minutes 前
    let d = new Date(date);
    d = [
        '' + d.getFullYear(),
        '0' + (d.getMonth() + 1),
        '0' + d.getDate(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2)); // 得到每个组件的后两位

    // 将时间信息和日期组合在一起
    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
</script>

<style lang="scss">
.post-view {

    /* 设置页面的默认字体和颜色 */

    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;
    line-height: 1.6;


    /* 设置标题样式 */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-bottom: 20px;
        font-weight: bold;
        color: #333;
    }

    h1 {
        font-size: 28px;
    }

    h2 {
        font-size: 26px;
    }

    h3 {
        font-size: 24px;
    }

    h4 {
        font-size: 22px;
    }

    h5 {
        font-size: 20px;
    }

    h6 {
        font-size: 18px;
    }

    /* 设置段落样式 */
    p {
        margin-bottom: 15px;
    }

    /* 设置链接样式 */
    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    /* 设置列表样式 */
    ul,
    ol {
        margin-bottom: 15px;
        margin-left: 30px;
    }

    /* 设置引用样式 */
    blockquote {
        margin: 0;
        padding-left: 20px;
        border-left: 2px solid #007bff;
        font-style: italic;
        color: #666;
    }

    /* 设置代码样式 */
    code {
        font-family: Consolas, Monaco, Courier, monospace;
        background-color: #f8f8f8;
        padding: 2px 5px;
        border-radius: 3px;
    }

    pre {
        background-color: #f8f8f8;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-family: Consolas, Monaco, Courier, monospace;
        font-size: 18px;
        line-height: 1.4;
        overflow-x: auto;
    }

    /* 设置表格样式 */
    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 20px;
    }

    th,
    td {
        border: 1px solid #ccc;
        padding: 8px;
    }

    th {
        background-color: #f0f0f0;
        font-weight: bold;
    }

    /* 设置图片样式 */
    img {
        max-width: 30%;
        height: auto;
        margin-bottom: 20px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    /* 设置代码块样式 */
    pre code {
        display: block;
        padding: 10px;
        overflow-x: auto;
        background-color: #f8f8f8;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-family: Consolas, Monaco, Courier, monospace;
        font-size: 14px;
        line-height: 1.4;
    }

    /* 设置引用块样式 */
    blockquote {
        margin: 0;
        padding: 10px 20px;
        background-color: #f8f8f8;
        border-left: 2px solid #007bff;
        color: #666;
        font-style: italic;
        border-radius: 3px;
    }

    /* 设置标题锚点样式 */
    h1:hover a.anchor,
    h2:hover a.anchor,
    h3:hover a.anchor,
    h4:hover a.anchor,
    h5:hover a.anchor,
    h6:hover a.anchor {
        opacity: 1;
    }

    a.anchor {
        display: none;
        opacity: 0.5;
        transition: opacity 0.3s;
    }

    a.anchor::before {
        content: "#";
    }

    h1:hover a.anchor::before,
    h2:hover a.anchor::before,
    h3:hover a.anchor::before,
    h4:hover a.anchor::before,
    h5:hover a.anchor::before,
    h6:hover a.anchor::before {
        opacity: 0.5;
    }

    /* 设置代码块中的行号样式 */
    pre code .line-numbers-rows {
        border-right: 1px solid #ccc;
        background-color: #f8f8f8;
        color: #999;
        padding-right: 10px;
    }
}
</style>