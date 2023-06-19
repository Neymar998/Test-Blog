import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/firebaseInit';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
        title: "Home"
      }
    },
    {
      path: "/blogs",
      name: 'Blog',
      component: () => import('../views/Blog.vue'),
      meta: {
        title: "Blogs"
      }
    },
    {
      path: "/login",
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: "login"
      }
    },
    {
      path: "/register",
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: {
        title: "register"
      }
    },
    {
      path: "/forgetpassword",
      name: 'ForgetPassword',
      component: () => import('../views/ForgetPassword.vue'),
      meta: {
        title: "forget-password"
      }
    },
    {
      path: "/create-post",
      name: 'CreatePost',
      component: () => import('../views/CreatePost.vue'),
      meta: {
        title: "CreatePost",
        requireAuth: true
      }
    },
    {
      path: "/view-blog/:blogid",
      name: "ViewBlog",
      props: true,
      component: () => import('../views/ViewBlog.vue'),
      meta: {
        title: "ViewBlog"
      }
    }
  ]
})

//路由跳转时标签显示的文字
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Test-Blog`
  next()
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser
  if (to.matched.some((res) => res.meta.requireAuth)) {
    if (user) {
      return next()
    } else {
      return next({ name: 'Home' })
    }
  }
  return next()
})

export default router
