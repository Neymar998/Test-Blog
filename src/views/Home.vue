<template>
    <div class="home">
        <Blogpost :props="welcomScreen" />
        <Blogpost :props="prop" v-for="(prop, index) in sampleBlogPost" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3>View More Recent Card</h3>
                <div class="blog-card">
                    <Blogcard v-for="(post, index) in sampleBlogCard" :key="index" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Blogpost from '../components/Blogpost.vue';
import Blogcard from '../components/Blogcard.vue';
import { reactive } from 'vue'
let welcomScreen = reactive({
    title: 'Welcome!',
    blogPost: "Just fucking go on ,let's do it!欢迎来到90年代",
    welcomScreen: true,
    photo: "coding"
})
let sampleBlogPost = reactive([{
    title: 'This is a title1',
    blogHTML: 'aaaaaaaaaaaaaaaaaaaaaaa',
    blogCoverPhoto: 'beautiful-stories'
}, {
    title: 'This is a title2',
    blogHTML: 'bbbbbbbbbbbbbbb',
    blogCoverPhoto: 'designed-for-everyone'
}])
let sampleBlogCard = [
    { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May,1,2023" },
    { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May,2,2023" },
    { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May,3,2023" }
]
</script>

<style lang="scss" scoped></style>