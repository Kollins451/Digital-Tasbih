// ================================
// TASBIH APP
// ================================

// Get elements from HTML
const countDisplay = document.getElementById("countDisplay");
const countText = document.getElementById("count");
const targetText = document.getElementById("target");
const progressBar = document.getElementById("progressBar");

const countBtn = document.getElementById("countBtn");
const minusBtn = document.getElementById("minusBtn");
const resetBtn = document.getElementById("resetBtn");

const dhikrSelect = document.getElementById("dhikrSelect");
const customDhikr = document.getElementById("customDhikr");
const currentDhikr = document.getElementById("currentDhikr");

const customTarget = document.getElementById("customTarget");
const targetButtons = document.querySelectorAll(".target-buttons button");

const themeButtons = document.querySelectorAll(".theme");
const darkModeBtn = document.getElementById("darkModeBtn");


// ================================
// DEFAULT VALUES
// ================================

let count = Number(localStorage.getItem("tasbihCount")) || 0;

let target = Number(localStorage.getItem("tasbihTarget")) || 33;

let selectedDhikr =
    localStorage.getItem("tasbihDhikr") || "SubhanAllah";

let savedTheme =
    localStorage.getItem("tasbihTheme") || "#198754";

let darkMode =
    localStorage.getItem("tasbihDarkMode") === "true";


// ================================
// UPDATE COUNTER
// ================================

function updateCounter() {

    countDisplay.textContent = count;
    countText.textContent = count;
    targetText.textContent = target;

    // Calculate progress
    let progress = (count / target) * 100;

    // Prevent progress from going above 100%
    progress = Math.min(progress, 100);

    progressBar.style.width = `${progress}%`;

    // Save count
    localStorage.setItem("tasbihCount", count);

    // Update Dhikr
    currentDhikr.textContent = selectedDhikr;

    // Check target
    if (count >= target) {
        countDisplay.classList.add("count-animation");

        setTimeout(() => {
            countDisplay.classList.remove("count-animation");
        }, 200);
    }
}


// ================================
// COUNT BUTTON
// ================================

countBtn.addEventListener("click", () => {

    count++;

    updateCounter();

    // Animation
    countDisplay.classList.remove("count-animation");

    void countDisplay.offsetWidth;

    countDisplay.classList.add("count-animation");

    // Target reached
    if (count === target) {

        setTimeout(() => {
            alert(`MashaAllah! You reached ${target} counts.`);
        }, 100);
    }
});


// ================================
// MINUS BUTTON
// ================================

minusBtn.addEventListener("click", () => {

    if (count > 0) {
        count--;
        updateCounter();
    }
});


// ================================
// RESET BUTTON
// ================================

resetBtn.addEventListener("click", () => {

    const confirmReset = confirm(
        "Are you sure you want to reset your count?"
    );

    if (confirmReset) {

        count = 0;

        updateCounter();
    }
});


// ================================
// DHIKR SELECTION
// ================================

dhikrSelect.value = selectedDhikr;

dhikrSelect.addEventListener("change", () => {

    selectedDhikr = dhikrSelect.value;

    if (selectedDhikr === "Custom") {

        customDhikr.classList.remove("hidden");

        customDhikr.focus();

        currentDhikr.textContent = "Custom Dhikr";

    } else {

        customDhikr.classList.add("hidden");

        currentDhikr.textContent = selectedDhikr;

        localStorage.setItem(
            "tasbihDhikr",
            selectedDhikr
        );
    }
});


// ================================
// CUSTOM DHIKR
// ================================

customDhikr.addEventListener("input", () => {

    const value = customDhikr.value.trim();

    if (value !== "") {

        selectedDhikr = value;

        currentDhikr.textContent = value;

        localStorage.setItem(
            "tasbihDhikr",
            value
        );
    }
});


// ================================
// TARGET BUTTONS
// ================================

targetButtons.forEach(button => {

    button.addEventListener("click", () => {

        target = Number(button.dataset.target);

        customTarget.value = "";

        localStorage.setItem(
            "tasbihTarget",
            target
        );

        updateCounter();
    });

});


// ================================
// CUSTOM TARGET
// ================================

customTarget.addEventListener("change", () => {

    const value = Number(customTarget.value);

    if (value > 0) {

        target = value;

        localStorage.setItem(
            "tasbihTarget",
            target
        );

        updateCounter();
    }

});


// ================================
// THEME / COLOR CHANGER
// ================================

function changeTheme(color) {

    document.documentElement.style.setProperty(
        "--primary-color",
        color
    );

    // Create a darker version for hover
    document.documentElement.style.setProperty(
        "--primary-dark",
        color
    );

    localStorage.setItem(
        "tasbihTheme",
        color
    );
}


themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const color = button.dataset.color;

        changeTheme(color);

    });

});


// ================================
// DARK MODE
// ================================

function updateDarkMode() {

    if (darkMode) {

        document.body.classList.add("dark-mode");

        darkModeBtn.textContent = "☀️";

    } else {

        document.body.classList.remove("dark-mode");

        darkModeBtn.textContent = "🌙";
    }
}


darkModeBtn.addEventListener("click", () => {

    darkMode = !darkMode;

    localStorage.setItem(
        "tasbihDarkMode",
        darkMode
    );

    updateDarkMode();
});


// ================================
// LOAD SAVED SETTINGS
// ================================

changeTheme(savedTheme);

updateDarkMode();

updateCounter();


// ================================
// KEYBOARD SUPPORT
// ================================

// Press SPACE to count
document.addEventListener("keydown", (event) => {

    // Don't count when typing inside an input
    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "SELECT"
    ) {
        return;
    }

    if (event.code === "Space") {

        event.preventDefault();

        count++;

        updateCounter();

        countDisplay.classList.remove(
            "count-animation"
        );

        void countDisplay.offsetWidth;

        countDisplay.classList.add(
            "count-animation"
        );

        if (count === target) {

            setTimeout(() => {
                alert(
                    `MashaAllah! You reached ${target} counts.`
                );
            }, 100);
        }
    }

});