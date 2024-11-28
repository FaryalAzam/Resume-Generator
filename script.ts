function renderResume(data) {
    return `
        ${data.profilePicture ? `<img src="${data.profilePicture}" alt="Profile Picture" class="profile-pic">` : ""}
        <h2>${data.name}</h2>
        
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        
        <h3>Education:</h3>
        <p>${data.education}</p>
        
        <h3>Experience:</h3>
        <p>${data.experience}</p>
        
        <h3>Skills:</h3>
        <div id="skills-section">
            <p>${data.skills}</p>
        </div>
        <button id="toggle-skills">Hide Skills</button>
    `;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const educationInput = document.getElementById("education");
    const experienceInput = document.getElementById("experience");
    const skillsInput = document.getElementById("skills");
    const profilePictureInput = document.getElementById("profilePicture");

    if (!nameInput || !emailInput || !phoneInput || !educationInput || !experienceInput || !skillsInput) {
        console.error("One or more form fields are missing.");
        return;
    }

    const resumeData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        education: educationInput.value,
        experience: experienceInput.value,
        skills: skillsInput.value,
    };

    const resumeOutput = document.getElementById("resume-output");
    if (!resumeOutput) return;

    const renderWithProfile = () => {
        resumeOutput.innerHTML = renderResume(resumeData);
        const toggleButton = document.getElementById("toggle-skills");
        const skillsSection = document.getElementById("skills-section");

        // Add event listener to the toggle button
        toggleButton.addEventListener("click", () => {
            if (skillsSection.style.display === "none") {
                skillsSection.style.display = "block";
                toggleButton.textContent = "Hide Skills";
            } else {
                skillsSection.style.display = "none";
                toggleButton.textContent = "Show Skills";
            }
        });
    };

    if (profilePictureInput?.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
            resumeData.profilePicture = reader.result;
            renderWithProfile();
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    } else {
        renderWithProfile();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form");
    form?.addEventListener("submit", handleFormSubmit);
});
