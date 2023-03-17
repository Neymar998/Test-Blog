import { initializeApp } from "firebase/app";
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFqGYuTUxkdBpSvs5SnXCm-RfkNwqux3A",
    authDomain: "test-blog-d03f5.firebaseapp.com",
    projectId: "test-blog-d03f5",
    storageBucket: "test-blog-d03f5.appspot.com",
    messagingSenderId: "190400527351",
    appId: "1:190400527351:web:51bcbfe8f6aed8d42d8cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default app.firestore()