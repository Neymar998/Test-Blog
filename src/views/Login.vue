<template>
    <div class="form-wrap">
        <form class="login">
            <p class="login-register">
                还没有账号?
                <router-link class="router-link" :to="{ name: 'Register' }">注册</router-link>
            </p>
            <h2>登录到TestBlogs</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="邮箱" v-model="email">
                    <Email class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="密码" v-model="password">
                    <Password class="icon" />
                </div>
            </div>
            <!-- <div v-show="error" class="error">{{ errorMsg }}</div> -->
            <router-link class="forget-password" :to="{ name: 'ForgetPassword' }">忘记密码?</router-link>
            <button @click.prevent="loginIn">登录</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script setup>
import Email from "../assets/Icons/envelope-regular.svg"
import Password from '../assets/Icons/lock-alt-solid.svg'
import { ref } from 'vue'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebaseInit'
import { useRouter } from "vue-router";
import { useProfileStore } from '../stores/profile'
import modal from '../utils/modal'
const profileStore = useProfileStore()

const email = ref()
const password = ref()
const router = useRouter()

const loginIn = () => {
    if (email.value != undefined && password.value != undefined) {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                //Sign in
                const user = userCredential.user

                // console.log('登录成功：',user.uid);
                profileStore.getCurrentUser()
                router.push('/')
            })
            .catch((err) => {
                modal(err.message, (close) => close())
            })
    } else {
        modal('请输入邮箱和密码', (close) => close())
    }
}

</script>

<style lang="scss" scoped>
@import "../../public/css/login-register-forget.scss";
</style>