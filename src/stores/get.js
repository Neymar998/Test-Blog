import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { collection, doc, addDoc, getDocs, query, where, orderBy, limit, deleteDoc } from 'firebase/firestore'
import db from '../firebase/firebaseInit'
export const useGetpostStore = defineStore('getpost', () => {
    const postLoaded = ref(null)
    const blogPosts = ref([])
    const blogPostsFeed = computed(() => blogPosts.value.slice(0, 2))
    const blogPostsCards = computed(() => blogPosts.value.slice(2, 6))

    const getPost = async () => {
        const querySnap = await getDocs(query(collection(db, 'blogPosts'), orderBy('date', 'desc')))
        querySnap.forEach((doc) => {
            if (!blogPosts.value.some((post) => post.blogID === doc.data().blogID)) {
                // console.log(blogPosts.value);
                const data = reactive({
                    blogID: doc.data().blogID,
                    blogHTML: doc.data().blogHTML,
                    blogCoverPhoto: doc.data().blogCoverPhoto,
                    blogTitle: doc.data().blogTitle,
                    blogDate: doc.data().date.toDate(),
                    blogCoverName: doc.data().blogCoverName,
                    blogProfileId: doc.data().profileID
                })
                blogPosts.value.push(data)
                // console.log('store里的get中的blogPosts更新了');
            }
        })
        postLoaded.value = true
    }
    const deletePost = async (blogID) => {
        await deleteDoc(doc(db, 'blogPosts', blogID)).then(() => {
            console.log('删除成功');
            filterPosts(blogID)
        }).catch((err) => {
            console.log(err);
        })
    }
    const filterPosts = (payload) => {
        blogPosts.value = blogPosts.value.filter((post) => post.blogID !== payload)
    }

    return {
        postLoaded, blogPosts, blogPostsFeed, blogPostsCards, getPost, deletePost
    }
})