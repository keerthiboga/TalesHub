import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');

    if (!uid) {
        alert('No user ID found in the URL.');
        return;
    }

    const loadUserProfile = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                document.getElementById('username').textContent = userData.username;
                document.getElementById('bio1').textContent = userData.bio1;
                document.getElementById('bio2').textContent = userData.bio2;
                document.getElementById('bio3').textContent = userData.bio3;
                document.getElementById('userPhoto').src = userData.profilePhoto;
            } else {
                console.error("No such document!");
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    };

    loadUserProfile(uid);

    onAuthStateChanged(auth, user => {
        const signInBtn = document.getElementById("signInBtn");
        if (user) {
            signInBtn.textContent = 'Logout';
            signInBtn.classList.add('logout-btn');
            signInBtn.onclick = () => signOut(auth).then(() => {
                alert('Signed out successfully');
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error('Sign Out Error', error);
            });
        } else {
            signInBtn.textContent = 'Sign In';
            signInBtn.classList.remove('logout-btn');
            signInBtn.onclick = () => {
                window.location.href = 'index.html';
            };
        }
    });
});
