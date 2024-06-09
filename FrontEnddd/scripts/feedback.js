document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("8HH-dDlSaTcIefnaI");

    const feedbackForm = document.getElementById("feedbackForm");

    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const templateParams = {
            to_email: "sametithirumanivigneshwar@gmail.com",
            from_email: email,
            message: message
        };

        emailjs.send("service_79uiwli", "template_h90yi3f", templateParams)
            .then(function(response) {
                alert("Feedback sent successfully!");
            }, function(error) {
                alert("Failed to send feedback. Please try again.");
            });
    });
});
