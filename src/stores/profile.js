import { defineStore } from "pinia";
import { auth } from '../firebase/firebaseInit';
import { getDoc, doc } from "firebase/firestore";
import db from '../firebase/firebaseInit';
export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: null,
        profileAdmin: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUsername: null,
        profileId: null,
        profileInitials: null,
    }),
    actions: {
        getCurrentUser() {
            const user = auth.currentUser
            if (user) {
                this.user = true
                this.profileId = user.uid;
                this.updateInfo(this.profileId)
                // console.log('userID:', user.uid);
            } else {
                // 退出登录时清空数据
                this.user = null
                this.profileId = null
                this.profileEmail = null
                this.profileFirstName = null
                this.profileLastName = null
                this.profileUsername = null
                // console.log('没有user');
            }
        },
        async updateInfo(payload) {
            const snapshot = await getDoc(doc(db, "users", payload))
            if (snapshot.exists()) {
                this.profileEmail = snapshot.data().email;
                this.profileFirstName = snapshot.data().firstName;
                this.profileLastName = snapshot.data().lastName;
                this.profileUsername = snapshot.data().username;
                this.profileInitials = this.profileFirstName.charAt(0).toUpperCase() + this.profileLastName.charAt(0).toUpperCase();
            } else {
                throw Error('No such document!');
            }
        }
    }
})