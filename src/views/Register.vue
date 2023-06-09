<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                已经有账号了?
                <router-link class="router-link" :to="{ name: 'Login' }">登录</router-link>
            </p>
            <h3>创建你的TestBlog账号</h3>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="姓" v-model="firstName">
                    <User class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="名" v-model="lastName">
                    <User class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="用户名" v-model="username">
                    <User class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="邮箱" v-model="email">
                    <Email class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="密码" v-model="password">
                    <Password class="icon" />
                </div>
            </div>
            <div v-show="error" class="error">{{ errorMsg }}</div>
            <button @click.prevent="register"> 注册</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script setup>
import Email from "../assets/Icons/envelope-regular.svg"
import Password from '../assets/Icons/lock-alt-solid.svg'
import User from '../assets/Icons/user-alt-light.svg'
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'
import db from '../firebase/firebaseInit'
import router from "../router";

const firstName = ref()
const lastName = ref()
const username = ref()
const email = ref()
const password = ref()
const error = ref()
const errorMsg = ref()
const register = async () => {
    if (email.value !== undefined && firstName.value !== undefined && lastName.value !== undefined && username.value !== undefined && password.value !== undefined) {

        error.value = false
        errorMsg.value = ''
        //登录firebase
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // 'users' collection reference
                // const colRef = collection(db, 'users')
                // data to send
                const dataObj = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    username: username.value,
                    email: email.value
                }
                await setDoc(doc(db, 'users', user.uid), dataObj)
                router.push({ name: 'Login' })

            })
            .catch((e) => {
                error.value = true
                errorMsg.value = e.message
            });
        return;
    }
    error.value = true
    errorMsg.value = 'Please fill out all the fields!'

}
</script>
<style lang="scss" >
@import "../../public/css/login-register-forget.scss";
</style>