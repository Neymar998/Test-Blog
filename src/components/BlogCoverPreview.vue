<template>
    <div class="modal" ref="modal">
        <div class="modal-content">
            <closeIcon @click="closePreview" class="icon"></closeIcon>
            <img :src="blogCoverPhoto" :alt="blogCoverPhoto">
        </div>
    </div>
</template>

<script setup>
import closeIcon from "../assets/Icons/times-circle-light.svg"
import { usePostStore } from "../stores/post";
import { computed } from 'vue'
const store = usePostStore()

const closePreview = () => {
    store.openPhotoPreview()
}

const blogCoverPhoto = computed(() => {
    return store.blogPhotoFileURL
})
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    .modal-content {
        height: 400px;
        width: 600px;
        border-radius: 12px;
        background-color: #fff;
        display: flex;
        position: relative;
        padding: 50px;
        justify-content: center;

        .icon {
            width: 24px;
            cursor: pointer;
            position: absolute;
            top: 15px;
            right: 15px;
            color: #303030
        }

        img {
            margin-top: 16px;
            display: block;
            width: auto;
            height: 100%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
    }


}
</style>