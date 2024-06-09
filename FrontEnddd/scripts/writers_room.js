document.addEventListener("DOMContentLoaded", function() {
    const uploadBtn = document.getElementById("uploadBtn");
    const uploadImage = document.getElementById("uploadImage");
    const saveBtn = document.getElementById("saveBtn");
    const grammarCheckBtn = document.getElementById("grammarCheckBtn");
    const generateContentBtn = document.getElementById("generateContentBtn");
    const storyContent = document.getElementById("storyContent");

    uploadBtn.addEventListener("click", function() {
        uploadImage.click();
    });

    uploadImage.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "10%";
                img.style.margin = "10px 0";
                img.contentEditable = "false"; // Prevent direct editing of the image
                img.style.resize = "both"; // Allow resizing
                img.style.overflow = "auto"; // Handle overflow

                // Wrap the image in a div to make it resizable and draggable
                const imgWrapper = document.createElement("div");
                imgWrapper.contentEditable = "false";
                imgWrapper.style.position = "relative";
                imgWrapper.style.display = "inline-block";
                imgWrapper.style.width = "auto";
                imgWrapper.style.height = "auto";
                imgWrapper.appendChild(img);

                storyContent.appendChild(imgWrapper);
            }
            reader.readAsDataURL(file);
        }
    });

    saveBtn.addEventListener("click", function() {
        const storyTitle = document.getElementById("storyTitle").value;
        const storyContentHtml = storyContent.innerHTML;
        // Handle saving the story here (e.g., send to server, save to local storage, etc.)
        console.log("Story saved with title:", storyTitle);
        console.log("Story content:", storyContentHtml);
    });

    grammarCheckBtn.addEventListener("click", function() {
        const content = storyContent.innerText;
        fetch('https://api.languagetool.org/v2/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'text': content,
                'language': 'en-US'
            })
        })
        .then(response => response.json())
        .then(data => {
            let correctedContent = content;
            data.matches.forEach(match => {
                const replacement = match.replacements[0]?.value || '';
                correctedContent = correctedContent.slice(0, match.offset) + replacement + correctedContent.slice(match.offset + match.length);
            });
            storyContent.innerText = correctedContent;
        });
    });

    generateContentBtn.addEventListener("click", async function() {
        const currentContent = storyContent.innerText;
        try {
            const response = await fetch('/generate-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: currentContent }),
            });
            const data = await response.json();
            storyContent.innerHTML += `<p>${data.generatedContent}</p>`;
        } catch (error) {
            console.error('Error generating content:', error);
        }
    });
});
