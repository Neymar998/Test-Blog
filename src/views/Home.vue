<template>
    <div class="home">
        <Blogpost :props="welcomScreen" />
        <Blogpost :props="prop" v-for="(prop, index) in sampleBlogPost" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3>View More Recent Card</h3>
                <div class="blog-cards">
                    <Blogcard :props=post v-for="(post, index) in sampleBlogCard" :key="index" />
                </div>
            </div>
        </div>
        <div class="updates">
            <div class="container">
                <h2>never miss a post. Register for your free account today!</h2>
                <router-link class="router-button" to="#">
                    Register for FireBlogs
                    <Arrow class="arrow arrow-light" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import Arrow from '../assets/Icons/arrow-right-light.svg'
import Blogpost from '../components/Blogpost.vue';
import Blogcard from '../components/Blogcard.vue';
import { reactive } from 'vue'
import { useBlogCardStore } from '../stores/counter';
const BlogCardStore = useBlogCardStore()
const sampleBlogCard = BlogCardStore.sampleBlogCard

let welcomScreen = reactive({
    title: 'Welcome!',
    blogPost: "Just fucking go on ,let's do it!欢迎来到90年代",
    welcomScreen: true,
    photo: "coding"
})
let sampleBlogPost = reactive([{
    title: 'This is a title1',
    blogHTML: 'aaaaa',
    blogCoverPhoto: 'beautiful-stories'
}, {
    title: 'This is a title2',
    blogHTML: 'bbbbbbbbbbbbbbb',
    blogCoverPhoto: 'designed-for-everyone'
}])

</script>

<style lang="scss" scoped>
.updates {
    .container {
        padding: 100px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media(min-width: 800px) {
            padding: 125px 25px;
            flex-direction: row;
        }
    }

    .router-button {
        display: flex;
        font-size: 14px;
        text-decoration: none;

        @media(min-width:800px) {
            margin-left: auto;
        }

        h2 {
            font-weight: 300;
            font-size: 32px;
            max-width: 425px;
            width: 100%;
            text-align: center;
            text-transform: uppercase;

            @media(min-width: 800px) {
                text-align: initial;
                font-size: 40px;
            }
        }
    }
}
</style>