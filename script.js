const typingtext = document.querySelector('.typing-text p');
const input = document.querySelector('.input-field');
const timeDisplay = document.querySelector('.time span b');
const mistakeDisplay = document.querySelector('.mistake span b');
const wpmDisplay = document.querySelector('.wpm span b');
const cpmDisplay = document.querySelector('.cpm span b');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let correctChars = 0; // To track the number of correct characters

// Initialize typing test
function initTyping() {
    const chars = typingtext.querySelectorAll('span');
    const typed = input.value.charAt(charIndex); // Get the current character typed by the user

    if (charIndex < chars.length && timeLeft > 0) {
        if (chars[charIndex].innerText === typed) {
            chars[charIndex].classList.add('correct');
            correctChars++; // Increment correct character count
        } else {
            chars[charIndex].classList.add('incorrect');
            mistakes++; // Increment mistakes if the character is incorrect
            mistakeDisplay.innerText = mistakes; // Update the mistake count on the screen
        }
        charIndex++; // Move to the next character

        // Highlight the next character
        if (charIndex < chars.length) {
            chars[charIndex].classList.add('active');
        }
        // Remove highlight from the previous character
        if (charIndex > 0) {
            chars[charIndex - 1].classList.remove('active');
        }
    }

    // Start the timer when typing starts
    if (!isTyping) {
        timer = setInterval(startTimer, 1000);
        isTyping = true;
    }

    // Calculate and update WPM and CPM
    calculateWPM();
    calculateCPM();
}

// Timer function
function startTimer() {
    if (timeLeft > 0) {
        timeLeft--; // Decrease time
        timeDisplay.innerText = timeLeft; // Update time on the screen
    } else {
        clearInterval(timer); // Stop the timer when it reaches zero
        input.disabled = true; // Disable input when time is over
    }
}

// Calculate WPM (Words Per Minute)
function calculateWPM() {
    // WPM is calculated by dividing the correct characters by 5 (average word length) and dividing by the elapsed time in minutes
    let wordsTyped = correctChars / 5;
    let timeElapsed = (maxTime - timeLeft) / 60; // Convert time to minutes
    let wpm = Math.round(timeElapsed > 0 ? wordsTyped / timeElapsed : 0); // Prevent divide by zero
    wpmDisplay.innerText = wpm < 0 || !wpm ? 0 : wpm; // Display WPM
}

// Calculate CPM (Characters Per Minute)
function calculateCPM() {
    // CPM is calculated by dividing the total characters typed by the elapsed time in minutes
    let timeElapsed = (maxTime - timeLeft) / 60; // Convert time to minutes
    let cpm = Math.round(timeElapsed > 0 ? charIndex / timeElapsed : 0); // Prevent divide by zero
    cpmDisplay.innerText = cpm < 0 || !cpm ? 0 : cpm; // Display CPM
}

// Reset everything when the "Try Again" button is clicked
btn.addEventListener('click', () => {
    resetTest();
});

// Load a random paragraph to be typed
function loadParagraph() {
    const para = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];

    const random = Math.floor(Math.random() * para.length);
    typingtext.innerHTML = ''; // Clear previous text

    // Add each character in a span
    para[random].split("").forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        typingtext.appendChild(span);
    });
    typingtext.querySelectorAll('span')[0].classList.add('active'); // Highlight the first character
}

// Reset the typing test
function resetTest() {
    clearInterval(timer); // Stop the timer
    loadParagraph(); // Load a new paragraph
    input.value = ''; // Clear input field
    timeLeft = maxTime; // Reset time
    charIndex = 0; // Reset character index
    mistakes = 0; // Reset mistakes
    correctChars = 0; // Reset correct characters
    mistakeDisplay.innerText = mistakes; // Reset mistake display
    timeDisplay.innerText = timeLeft; // Reset time display
    wpmDisplay.innerText = 0; // Reset WPM display
    cpmDisplay.innerText = 0; // Reset CPM display
    isTyping = false; // Reset typing status
    input.disabled = false; // Enable input field
}

input.addEventListener("input", initTyping);

// Load the paragraph initially
loadParagraph();
