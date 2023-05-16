<template>
    <div class="form-wrap">
        <form class="login">
            <p class="login-register">
                Don't have an account ?
                <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
            </p>
            <h2>Login to TestBlogs</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <Email class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password">
                    <Password class="icon" />
                </div>
            </div>
            <div v-show="error" class="error">{{ errorMsg }}</div>
            <router-link class="forget-password" :to="{ name: 'ForgetPassword' }">Forgot your password?</router-link>
            <button @click.prevent="loginIn">Sing In</button>
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

const email = ref()
const password = ref()
const error = ref()
const errorMsg = ref()

const router = useRouter()

const loginIn = () => {
    if (email.value != undefined && password.value != undefined) {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                //Sign in
                const user = userCredential.user
                console.log(user.uid);
                router.push('/')
            })
        // .catch((err) => {
        //     const errorMessage = err.message
        //     error.value = true
        //     errorMsg.value = errorMessage
        // })
    } else {
        error.value = true
        errorMsg.value = ' Please fill out all the fields!'
    }
}

</script>

<style lang="scss" scoped>
@import "../../public/css/login-register-forget.scss";
</style>