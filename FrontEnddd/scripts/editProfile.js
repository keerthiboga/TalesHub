document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const newProfilePhoto = document.getElementById('profilePhoto').files[0];
    const newUsername = document.getElementById('usernameInput').value;
    const newBio = document.getElementById('bioInput').value.split('\n');

    if (newProfilePhoto) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('profilePhoto', e.target.result);
            saveAndRedirect();
        };
        reader.readAsDataURL(newProfilePhoto);
    } else {
        saveAndRedirect();
    }

    function saveAndRedirect() {
        localStorage.setItem('username', newUsername);
        localStorage.setItem('bio1', newBio[0]);
        localStorage.setItem('bio2', newBio[1]);
        localStorage.setItem('bio3', newBio[2]);
        window.location.href = 'profilepage.html';  // Change redirection to profilepage.html
    }
});
