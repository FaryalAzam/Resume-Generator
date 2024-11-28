function renderResume(data) {
    return "\n        ".concat(data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" alt=\"Profile Picture\" class=\"profile-pic\">") : "", "\n        <h2>").concat(data.name, "</h2>\n        \n        <p><strong>Email:</strong> ").concat(data.email, "</p>\n        <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n        \n        <h3>Education:</h3>\n        <p>").concat(data.education, "</p>\n        \n        <h3>Experience:</h3>\n        <p>").concat(data.experience, "</p>\n        \n        <h3>Skills:</h3>\n        <div id=\"skills-section\">\n            <p>").concat(data.skills, "</p>\n        </div>\n        <button id=\"toggle-skills\">Hide Skills</button>\n    ");
}
function handleFormSubmit(event) {
    event.preventDefault();
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var educationInput = document.getElementById("education");
    var experienceInput = document.getElementById("experience");
    var skillsInput = document.getElementById("skills");
    var profilePictureInput = document.getElementById("profilePicture");
    if (!nameInput || !emailInput || !phoneInput || !educationInput || !experienceInput || !skillsInput) {
        console.error("One or more form fields are missing.");
        return;
    }
    var resumeData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        education: educationInput.value,
        experience: experienceInput.value,
        skills: skillsInput.value,
    };
    var resumeOutput = document.getElementById("resume-output");
    if (!resumeOutput)
        return;
    var renderWithProfile = function () {
        resumeOutput.innerHTML = renderResume(resumeData);
        var toggleButton = document.getElementById("toggle-skills");
        var skillsSection = document.getElementById("skills-section");
        // Add event listener to the toggle button
        toggleButton.addEventListener("click", function () {
            if (skillsSection.style.display === "none") {
                skillsSection.style.display = "block";
                toggleButton.textContent = "Hide Skills";
            }
            else {
                skillsSection.style.display = "none";
                toggleButton.textContent = "Show Skills";
            }
        });
    };
    if (profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.files[0]) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            resumeData.profilePicture = reader_1.result;
            renderWithProfile();
        };
        reader_1.readAsDataURL(profilePictureInput.files[0]);
    }
    else {
        renderWithProfile();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-form");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", handleFormSubmit);
});
