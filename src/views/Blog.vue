<template>
    <Progress :show="show" :finish="finish"></Progress>
    <div class="blog-card-wrap">
        <div class="blog-cards container">
            <div class="toggle-edit">
                <span>切换编辑帖子：</span>
                <input type="checkbox" v-model="editPost">
            </div>
            <Blogcard :props="post" v-for="(post, index) in blogPosts" :key="post.blogID"></Blogcard>
        </div>
    </div>
</template>
<script setup>
import Blogcard from '../components/Blogcard.vue';
import { useBlogCardStore } from '../stores/counter';
import { onBeforeUnmount, computed, ref } from 'vue';
import { useGetpostStore } from '../stores/get';
import Progress from '../components/Progress.vue';

const show = ref(true)
const finish = computed(() => storeGetpost.postLoaded)

const storeGetpost = useGetpostStore()
const store = useBlogCardStore()
const blogPosts = computed(() => storeGetpost.blogPosts)
const editPost = computed({
    get() {
        return store.editPost
    },
    set(payload) {
        store.toggleEditPost(payload)
    }
})


// 在组件实例被卸载之前调用
onBeforeUnmount(() => {
    store.toggleEditPost(false)
})

</script>

<style lang="scss" scoped>
.blog-card-wrap {
    background-color: #fff;
}

.blog-cards {
    position: relative;

    .toggle-edit {
        display: flex;
        align-items: center;
        position: absolute;
        top: -70px;
        right: 0;

        span {
            margin-right: 16px;
        }

        input[type="checkbox"] {
            position: relative;
            border: none;
            appearance: none;
            background: #fff;
            outline: none;
            width: 80px;
            height: 30px;
            border-radius: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        input[type="checkbox"]:before {
            content: "";
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            top: 0;
            left: 0;
            background: #303030;
            transform: scale(1.1);
            transition: 750ms ease all;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        input:checked[type="checkbox"]:before {
            background: #fff;
            left: 52px;
        }
    }
}

.div {

    max-width: 1500px;
    border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 250px;
        height: 250px;
    }
}
</style>