<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home' }">Test-Blog</router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" to="#">Home</router-link>
                    <router-link class="link" to="#">Blogs</router-link>
                    <router-link class="link" to="#">Create Post</router-link>
                    <router-link class="link" to="#">Login/Register</router-link>
                </ul>
            </div>
        </nav>
        <menuIcon @click="toggle" :class="{ 'rotate': showAnimate }" class="menu-icon" v-show="mobile">
        </menuIcon>
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" to="#">Home</router-link>
                <router-link class="link" to="#">Blogs</router-link>
                <router-link class="link" to="#">Create Post</router-link>
                <router-link class="link" to="#">Login/Register</router-link>
            </ul>
        </transition>
    </header>
</template>

<script setup>
import menuIcon from '../assets/Icons/bars-regular.svg'
import { onMounted, ref } from 'vue'

let mobile = ref(true)
let mobileNav = ref(false)
let windowWidth = null
let showAnimate = ref(false)
onMounted(() => {
    window.addEventListener('resize', checkScreen)
    checkScreen()
})

const checkScreen = () => {
    windowWidth = window.innerWidth
    if (windowWidth <= 720) {
        mobile.value = true
        mobileNav.value = false
    } else {
        mobile.value = false
        mobileNav.value = false
    }
    return
}

const toggle = () => {
    mobileNav.value = !mobileNav.value
    showAnimate.value = true
    setTimeout(() => {
        showAnimate.value = false
    }, 1000);
}

</script>

<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 99;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;

        &:hover {
            color: #1eb8b8
        }
    }

    nav {
        display: flex;
        padding: 25px 0;

        .branding {
            display: flex;
            align-items: center;

            .header {
                font-weight: 600;
                font-size: 24px;
                color: #000;
                text-decoration: none;
            }
        }

        .nav-links {
            position: relative;
            display: flex;
            flex: 1;
            align-items: content;
            justify-content: flex-end;

            ul {
                margin-right: 5px;

                .link {
                    margin-right: 25px;
                }

                .link:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    .menu-icon {
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        width: auto;
    }

    .rotate {
        animation: rotate 0.6s;
    }

    @keyframes rotate {
        from {
            transform: rotate(0);
        }

        to {
            transform: rotate(180deg);
        }
    }

    .mobile-nav {
        padding: 20px;
        width: 70%;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100%;
        background-color: #303030;
        top: 0;
        left: 0;

        .link {
            padding: 15px 0;
            color: #fff;

            &:hover {
                color: #1eb8b8
            }
        }

    }


    // 移动端导航显示与隐藏动画
    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: all 0.8s;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to,
    .mobile-nav-leave-from {
        transform: translateX(0);
    }
}
</style>