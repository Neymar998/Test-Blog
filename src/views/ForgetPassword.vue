<template>
    <div class="reset-password">
        <Modal v-if="modalActive" :props="modalMessage" @close-modal="closeModal"></Modal>
        <Loading v-if="loadingActive"></Loading>
        <div class="form-wrap">
            <form class="reset">
                <h2>重置密码</h2>
                <router-link class="router-link" :to="{ name: 'Login' }">返回到登录</router-link>
                <p>忘记密码? 请输入邮箱</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email">
                        <Email class="icon" />
                    </div>
                </div>
                <button @click.prevent="reset">重置</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import Email from "../assets/Icons/envelope-regular.svg"
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";
import eventBus from '../libs/eventBus';

const modalMessage = ref(null)
const modalActive = ref(null)
const loadingActive = ref(null)
const email = ref(null)

const closeModal = () => {
    modalActive.value = !modalActive.value;
    email.value = "";
}
const reset = () => {
    modalMessage.value = '暂时无法使用'
    modalActive.value = true
}
eventBus.on('closeModal', closeModal)

onBeforeUnmount(() => {
    eventBus.off('closeModal', closeModal)
})

</script>
<style lang="scss">
@import "../../public/css/login-register-forget.scss";

.reset {
    P {
        font-size: 18px;
        margin-bottom: 20px;
    }

    .router-link {
        margin-top: -20px;
        margin-bottom: 10px;
    }

}
</style>