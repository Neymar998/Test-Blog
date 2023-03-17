<template>
    <div class="blog-wrapper no-user">
        <div class="blog-content">
            <div>
                <h2 v-if="props.props.welcomScreen">{{ props.props.blogPost }}</h2>
                <h2 v-else>{{ props.props.blogHTML }}</h2>
                <router-link v-if="props.props.welcomScreen" to="#" class="link link-light">
                    Login/Register
                    <Arrow class="arrow arrow-light" />
                </router-link>
                <router-link v-else to="#" class="link">
                    View the Post
                    <Arrow class="arrow " />
                </router-link>
            </div>
        </div>
        <div class="blog-photo">
            <img v-if="props.props.welcomScreen" :src="imgaleUrl1" alt="">
            <img v-else :src="imgaleUrl2" alt="">
        </div>
    </div>
</template>

<script setup>
import Arrow from '../assets/Icons/arrow-right-light.svg'
const props = defineProps(['props'])
const imgaleUrl1 = new URL(`../assets/blogPhotos/${props.props.photo}.jpg`, import.meta.url).href
const imgaleUrl2 = new URL(`../assets/blogPhotos/${props.props.blogCoverPhoto}.jpg`, import.meta.url).href
</script>

<style lang="scss">
.blog-wrapper {
    display: flex;
    flex-direction: column;

    @media(min-width: 700px) {
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }

    .blog-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 4;
        order: 2;

        @media(min-width:700px) {
            order: 1;
        }

        @media(min-width: 800px) {
            flex: 3;
        }

        div {
            max-width: 350px;
            padding: 72px 24px;

            @media(min-width:700px) {
                padding: 0 24px
            }

            h2 {
                font-size: 32px;
                font-weight: 300;
                text-transform: uppercase;

                @media(min-width:700px) {
                    font-size: 40px
                }
            }

            P {
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
            }

            .content-preview {
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .link {
                display: inline-flex;
                align-items: center;
                margin-top: 32px;
                padding-bottom: 4px;
                border-bottom: 0.5s solid transparent;
                transition: 0.5s ease-in all;

                &:hover {
                    border-bottom-color: #fff;
                }
            }
        }
    }

    .blog-photo {
        order: 1;
        flex: 2;

        @media(min-width:700px) {
            order: 2
        }

        @media(min-width:800px) {
            flex: 4
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;

        }
    }

    &:nth-child(even) {
        .blog-content {
            order: 2
        }

        .blog-photo {
            order: 1;
        }
    }
}

.no-user:first-child {
    .blog-content {
        background-color: #303030;
        color: #fff;
    }
}
</style>