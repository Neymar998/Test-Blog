import { defineStore } from "pinia";
import { auth } from '../firebase/firebaseInit';

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
                console.log(user.uid);
            } else {
                console.log('没有user');
            }
            console.log("store里的getCurrentUser被调用了");
        },
    }
})