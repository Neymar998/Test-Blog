<template>
    <div class="home">
        <Blogpost :props="welcomScreen" />
        <Blogpost :props="prop" v-for="(prop, index) in sampleBlogPost" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3>更多最近帖子：</h3>
                <div class="blog-cards">
                    <Blogcard :props="post" v-for="(post, index) in sampleBlogCards" :key="index" />
                </div>
            </div>
        </div>
        <div class="updates" v-if="!user">
            <div class="container">
                <h2>不错过任何帖子。 立即注册您的免费帐户！</h2>
                <router-link class="router-button" :to="{ name: 'Register' }">
                    立即注册
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
import { reactive, computed } from 'vue'
import { useGetpostStore } from '../stores/get';
import { useProfileStore } from '../stores/profile';

const profileStore = useProfileStore()
let user = computed(() => profileStore.user)

const storeGetpost = useGetpostStore()
const sampleBlogPost = computed(() => storeGetpost.blogPostsFeed);
const sampleBlogCards = computed(() => storeGetpost.blogPostsCards);
let welcomScreen = reactive({
    title: 'Welcome!',
    blogPost: "欢迎来到个人博客，只为记录美好生活",
    welcomScreen: true,
    photo: "coding"
})



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