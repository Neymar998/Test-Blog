<template>
    <header>
        <nav class="container">
            <div class="branding">
                <RouterLink class="header" :to="{ name: 'Home' }">Test-Blog</RouterLink>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <RouterLink class="link" :to="{ name: 'Home' }">首页</RouterLink>
                    <RouterLink class="link" :to="{ name: 'Blog' }">博客</RouterLink>
                    <RouterLink class="link" :to="{ name: 'CreatePost' }">发布</RouterLink>
                    <RouterLink v-if='!user' class="link" :to="{ name: 'Login' }">登录/注册</RouterLink>
                </ul>
                <div class="profile" ref="profile" @click="profileMenu = !profileMenu" v-if="user">
                    <span>{{ profileStore.profileInitials }}</span>
                    <div class="profile-menu" v-show="profileMenu">
                        <div class="info">
                            <p class="initials">{{ profileStore.profileInitials }}</p>
                            <div class="right">
                                <p>{{ profileStore.profileFirstName }} {{ profileStore.profileLastName }}</p>
                                <p>{{ profileStore.profileUsername }}</p>
                                <p>{{ profileStore.profileEmail }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <!-- <div class="option">
                                <RouterLink class="option" to="#">
                                    <userIcon class="icon" />
                                    <p>profile</p>
                                </RouterLink>
                            </div>
                            <div class="option">
                                <RouterLink class="option" to="#">
                                    <adminIcon class="icon" />
                                    <p>admin</p>
                                </RouterLink>
                            </div> -->
                            <div class="option">
                                <RouterLink to="#" class="option" @click="out">
                                    <signOutIcon class="icon" />
                                    <p>退出账号</p>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <menuIcon @click="toggle" :class="{ 'rotate': showAnimate }" class="menu-icon" v-show="mobile">
        </menuIcon>
        <Transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <RouterLink class="link" :to="{ name: 'Home' }">首页</RouterLink>
                <RouterLink class="link" :to="{ name: 'Blog' }">博客</RouterLink>
                <RouterLink class="link" :to="{ name: 'CreatePost' }">发布</RouterLink>
                <RouterLink v-if='!user' class="link" :to="{ name: 'Login' }">登录/注册</RouterLink>
            </ul>
        </Transition>
    </header>
</template>

<script setup>
import menuIcon from '../assets/Icons/bars-regular.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';
import adminIcon from '../assets/Icons/user-crown-light.svg';
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg';
import { onMounted, ref, computed, reactive, watch } from 'vue'
import { useProfileStore } from '../stores/profile';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseInit';

const profileStore = useProfileStore()
let user = computed(() => profileStore.user)

let mobile = ref(true)
let mobileNav = ref(false)
let windowWidth = null
let showAnimate = ref(false)
let profileMenu = ref(false)
onMounted(() => {
    window.addEventListener('resize', checkScreen)
    checkScreen()
})
const out = () => {
    signOut(auth)
        .then(() => {
            profileStore.getCurrentUser()
            console.log('退出成功');
        }).catch((error) => {
            console.log('退出出现错误', error);
        })
}
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

            .profile {
                font-size: 12px;
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #fff;
                background-color: #303030;

                .profile-menu {
                    position: absolute;
                    top: 60px;
                    right: 0;
                    width: 250px;
                    background-color: #303030;

                    .info {
                        display: flex;
                        align-items: center;
                        padding: 15px;
                        border-bottom: 1px solid #fff;

                        .initials {
                            position: initial;
                            width: 40px;
                            height: 40px;
                            background-color: #fff;
                            color: #303030;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                        }

                        .right {
                            flex: 1;
                            margin-left: 24px;
                            font-size: 12px;

                            p:nth-child(1) {
                                font-size: 14px;
                            }
                        }
                    }

                    .options {
                        padding: 15px;

                        .option {
                            text-decoration: none;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;

                            .icon {
                                width: 18px;
                                height: auto;
                            }

                            p {
                                margin-left: 12px;
                                font-size: 14px;
                            }

                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
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