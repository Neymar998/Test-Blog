<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="navigation" />
      <router-view></router-view>
      <Footer v-if="navigation"></Footer>
    </div>
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useProfileStore } from './stores/profile'
import { useGetpostStore } from './stores/get';

const storeGetpost = useGetpostStore()
const store = useProfileStore()
const route = useRoute()

let navigation = ref(null)

onMounted(async () => {
  checkRouter()
  await storeGetpost.getPost()
  store.getCurrentUser()
})

const checkRouter = () => {
  if (route.name === "Login" || route.name === "Register" || route.name === "ForgetPassword") {
    navigation.value = false
    return
  }
  navigation.value = true
}

watch(
  () => route.name,
  checkRouter,
)

</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans SC', sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;

  path {
    fill: #000;
  }
}

.arrow-light {
  path {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 30px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;

  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;

  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: rgb(31, 66, 74);
  opacity: 0.75;
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}
</style>
