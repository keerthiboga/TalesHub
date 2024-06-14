// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: Your_API,
    authDomain: "login-data-db8f1.firebaseapp.com",
    projectId: "login-data-db8f1",
    storageBucket: "login-data-db8f1.appspot.com",
    messagingSenderId: "961621531882",
    appId: "1:961621531882:web:d24b6fb684fc188f8f0b93",
    measurementId: "G-0238ER3JDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function() {
    // Handle Register
    const createAccountForm = document.getElementById('createAccountForm');
    createAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newEmail').value;
        const password = document.getElementById('newPassword').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // Registered successfully
                alert('Account created successfully!');
                createAccountForm.reset();
                document.getElementById('loginModal').style.display = 'none';
            })
            .catch(error => {
                // Handle errors
                alert(error.message);
            });
    });

    // Handle Login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // Logged in successfully
                loginForm.reset();
                modal.style.display = 'none';
            })
            .catch(error => {
                // Handle errors
                alert(error.message);
            });
    });

    function handleLogout() {
        signOut(auth).then(() => {
           
        }).catch((error) => {
            // Handle errors
            console.error('Sign Out Error', error);
        });
    }

    // Listen for changes in the user's authentication status
    auth.onAuthStateChanged(user => {
        const signInBtn = document.getElementById("signInBtn");

        if (user) {
            // User is signed in
            signInBtn.textContent = 'Logout';
            signInBtn.classList.add('logout-btn');
            signInBtn.onclick = handleLogout;
        } else {
            // User is signed out
            signInBtn.textContent = 'Sign In';
            signInBtn.classList.remove('logout-btn');
            signInBtn.onclick = () => {
                modal.style.display = "block";
                loginPanel.style.display = "block";
                createAccountPanel.style.display = "none";
            };
        }
    });

    
    

    // Description text typing animation
    const descriptionText = "Tale Hub is a groundbreaking online platform designed to revolutionize the way writers share their stories and connect with readers. Unlike traditional publishing platforms, Tale Hub offers writers the opportunity to showcase their work in a dynamic and interactive environment, while also providing readers with access to a diverse range of captivating content.";
    const descriptionElement = document.getElementById("description");

    let words = descriptionText.split(" ");
    let index = 0;

    function displayWord() {
        if (index < words.length) {
            descriptionElement.innerHTML += words[index] + " ";
            index++;
            setTimeout(displayWord, 100); 
        }
    }

    displayWord();

    // Modal functionality
    const signInBtn = document.getElementById("signInBtn");
    const modal = document.getElementById("loginModal");
    const span = document.getElementsByClassName("close")[0];
    const loginPanel = document.getElementById("loginPanel");
    const createAccountPanel = document.getElementById("createAccountPanel");
    const createAccountLink = document.getElementById("createAccountLink");
    const backToLoginLink = document.getElementById("backToLoginLink");

    signInBtn.onclick = function() {
        modal.style.display = "block";
        loginPanel.style.display = "block";
        createAccountPanel.style.display = "none";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    createAccountLink.onclick = function(event) {
        event.preventDefault();
        loginPanel.style.display = "none";
        createAccountPanel.style.display = "block";
    }

    backToLoginLink.onclick = function(event) {
        event.preventDefault();
        loginPanel.style.display = "block";
        createAccountPanel.style.display = "none";
    }

    // Sidebar functionality
    const menuIcon = document.getElementById("menuIcon");
    const sidebar = document.getElementById("sidebar");

    menuIcon.onclick = function() {
        sidebar.style.width = "25%";
    }

    // Close sidebar when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.style.width = "0";
        }
    });

    // Profile picture upload functionality
    const uploadIcon = document.getElementById("uploadIcon");
    const uploadPhoto = document.getElementById("uploadPhoto");
    const userPhoto = document.getElementById("userPhoto");

    uploadIcon.onclick = function() {
        uploadPhoto.click();
    }

    uploadPhoto.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userPhoto.src = e.target.result;
                localStorage.setItem('profilePhoto', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }

    // Load sidebar profile details from localStorage
    const profilePhoto = localStorage.getItem('profilePhoto');
    const username = localStorage.getItem('username');
    const bio1 = localStorage.getItem('bio1');
    const bio2 = localStorage.getItem('bio2');
    const bio3 = localStorage.getItem('bio3');

    if (profilePhoto) {
        document.getElementById('userPhoto').src = profilePhoto;
    }
    if (username) {
        document.getElementById('username').textContent = username;
    }
    if (bio1) {
        document.getElementById('bio1').textContent = bio1;
    }
    if (bio2) {
        document.getElementById('bio2').textContent = bio2;
    }
    if (bio3) {
        document.getElementById('bio3').textContent = bio3;
    }

    // Proceed button functionality
    const proceedBtn = document.getElementById("proceedBtn");

    proceedBtn.addEventListener("click", function() {
        window.location.href = "readerspage.html";
    });
});
