import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Initialize Firebase storage and firestore
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function() {
    const completeProfileForm = document.getElementById('completeProfileForm');

    completeProfileForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) {
            alert('No user is signed in');
            return;
        }

        const username = document.getElementById('profileUsername').value;
        const bio1 = document.getElementById('profileBio1').value;
        const bio2 = document.getElementById('profileBio2').value;
        const bio3 = document.getElementById('profileBio3').value;
        const profilePhoto = document.getElementById('profilePhoto').files[0];

        try {
            // Upload profile photo to Firebase Storage
            const storageRef = ref(storage, `profilePhotos/${user.uid}`);
            await uploadBytes(storageRef, profilePhoto);
            const photoURL = await getDownloadURL(storageRef);

            // Save profile details to Firestore
            await setDoc(doc(firestore, "users", user.uid), {
                username,
                bio1,
                bio2,
                bio3,
                photoURL
            });

            alert('Profile completed successfully!');
            window.location.href = 'profilepage.html'; // Redirect to profile page
        } catch (error) {
            alert('Error completing profile: ' + error.message);
        }
    });
});
