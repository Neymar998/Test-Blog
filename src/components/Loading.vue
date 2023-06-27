<template>
    <div class="loading" v-show="msg.show">
        <div class="loading-block">
            <span></span>
            <p>{{ msg.title }}</p>
        </div>
    </div>
</template>

  
<script setup>
const props = defineProps({
    msg: Object,
});
</script>

<style lang="scss" >
.loading {
    top: 0;
    z-index: 101;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes spin {
        to {
            transform: rotateZ(360deg);
        }
    }

    span {
        display: block;
        width: 60px;
        height: 60px;
        border: 3px solid transparent;
        border-top-color: #fff;
        border-bottom-color: #fff;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }

    p {
        color: #fff;
        margin-top: 20px;
    }
}
</style> 


