import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as Quill from 'quill';
import { auth } from './firebase/firebaseInit';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

//观测器可确保在您获取当前用户时，Auth 对象不会处于中间状态（例如初始化）
//使用 signInWithRedirect 时，onAuthStateChanged 观测器会等到 getRedirectResult 解析后再触发
// auth.onAuthStateChanged(() => {

// })

