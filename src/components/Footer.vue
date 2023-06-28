<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{ name: 'Home' }">TestBlog</router-link>
                    <ul>
                        <li>
                            <a href="#">
                                <qq class="svg-icon" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <wechat class="svg-icon" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <weibo class="svg-icon" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <zhihu class="svg-icon" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul>
                        <RouterLink class="link" :to="{ name: 'Home' }">首页</RouterLink>
                        <RouterLink class="link" :to="{ name: 'Blog' }">博客</RouterLink>
                        <RouterLink class="link" :to="{ name: 'CreatePost' }">发布</RouterLink>
                        <RouterLink class="link" :to="{ name: 'Login' }">登录/注册</RouterLink>
                    </ul>
                </div>
            </div>
            <div class="right">
                <p>© 2023 Test-Blog. All rights reserved.</p>
                <p>京ICP备123456789号-00</p>
                <p>渝公网安备 73216471923812846号 </p>
            </div>
        </div>
    </footer>
</template>
  
<script setup>
import qq from "../assets/Icons/qq-brands.svg";
import wechat from "../assets/Icons/wechat-brands.svg";
import weibo from "../assets/Icons/weibo-brands.svg";
import zhihu from "../assets/Icons/zhihu-brands.svg";

</script>
  
<style lang="scss" scoped>
footer {
    margin-top: auto;
    padding: 100px 25px;
    background-color: #303030;

    .container {
        display: flex;
        flex-direction: column;
        gap: 32px;

        @media (min-width: 800px) {
            flex-direction: row;
            gap: 0px;
        }

        >div {
            display: flex;
            flex: 1;
        }

        .left {
            gap: 32px;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;

            @media (min-width: 800px) {
                flex-direction: row;
                align-items: initial;
                gap: 0;
            }

            .header {
                text-align: center;
                font-size: 24px;
                color: #fff;
                margin-bottom: 16px;
                text-decoration: none;
                font-weight: 600;

                @media (min-width: 800px) {
                    text-align: initial;
                }
            }

            ul {
                gap: 16px;
                list-style: none;
                display: flex;
            }

            .col-1,
            .col-2 {
                gap: 32px;
                display: flex;
                flex: 1;

                @media (min-width: 800px) {
                    gap: 0;
                }
            }

            .col-1 {
                flex-direction: column;

                h2 {
                    text-align: center;

                    @media (min-width: 800px) {
                        text-align: initial;
                    }
                }

                ul {
                    margin-top: auto;

                    li {
                        display: flex;
                        align-items: center;

                        .svg-icon {
                            width: 24px;
                            height: auto;
                            color: #fff;
                        }
                    }
                }
            }

            .col-2 {
                ul {
                    height: 100%;
                    justify-content: center;
                    flex-direction: row;
                    flex-wrap: wrap;

                    @media (min-width: 800px) {
                        flex-direction: column;
                    }

                    .link {
                        font-size: 16px;
                        font-weight: 500;
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }

        .right {
            gap: 32px;
            color: #fff;
            align-items: center;
            flex-direction: column;

            @media (min-width: 800px) {
                align-items: flex-end;
                gap: 0;
            }
        }

        p {
            margin-top: auto;
        }
    }
}
</style>
  