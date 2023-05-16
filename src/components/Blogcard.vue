<template>
    <div class="blog-card">
        <div class="icons" v-show="toggle">
            <div class="icon">
                <Edit class="edit"></Edit>
            </div>
            <div class="icon">
                <Delete class="delete"></Delete>
            </div>
        </div>
        <img :src="imgaleUrl1">
        <div class="info">
            <h4>{{ props.props.blogTitle }}</h4>
            <h6>Posted on:{{ props.props.blogDate }}</h6>
            <router-link class="link" to="#">View The Post
                <Arrow class="arrow" />
            </router-link>
        </div>
    </div>
</template>

<script setup >
import Arrow from '../assets/Icons/arrow-right-light.svg'
import Edit from '../assets/Icons/edit-regular.svg'
import Delete from '../assets/Icons/trash-regular.svg'
import { useBlogCardStore } from '../stores/counter';
import { computed } from 'vue';
const store = useBlogCardStore()
const props = defineProps(['props'])
const imgaleUrl1 = new URL(`../assets/blogCards/${props.props.blogCoverPhoto}.jpg`, import.meta.url).href
const toggle = computed(() => {
    return store.editPost
})


</script>

<style lang="scss">
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    transition: 0.5s ease all;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: 0.5s ease all;

            &:hover {
                background-color: #303030;

                .edit,
                .delete {
                    path {
                        fill: #fff
                    }
                }
            }

            &:nth-child(1) {
                margin-right: 8px;
            }

            .edit,
            .delete {
                pointer-events: none;
                height: 15px;
                width: auto;
            }
        }
    }

    img {
        display: block;
        border-radius: 8px 8px 0 0;
        z-index: 1;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        z-index: 3;
        padding: 32px 16px;
        color: #000;
    }
}
</style>