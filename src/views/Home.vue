<template>
    <div class="container">
        <Blogpost :props="welcomScreen" />
        <Blogpost :props="prop" v-for="(prop, index) in sampleBlogPost" :key="index" />
    </div>
</template>

<script setup>
import Blogpost from '../components/Blogpost.vue';
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
</script>

<style lang="scss" scoped></style>