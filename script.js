// ===============================
// ELEMENTS (SAFE LOADING)
// ===============================

const recordBtn = document.getElementById("recordBtn");
const result = document.getElementById("result");
const score = document.getElementById("score");
const expectedWord = document.getElementById("expectedWord");

const feedback = document.getElementById("feedback");
const accentScoreEl = document.getElementById("accentScore");
const fluencyScoreEl = document.getElementById("fluencyScore");
const attemptsEl = document.getElementById("attempts");
const correctEl = document.getElementById("correct");
const accuracyEl = document.getElementById("accuracy");
const progressBar = document.getElementById("progressBar");
const levelEl = document.getElementById("level");

const kuralBtn = document.getElementById("kuralBtn");
const kuralResult = document.getElementById("kuralResult");

// ===============================
// VARIABLES
// ===============================

let attempts = 0;
let correct = 0;

const words = [
    "வணக்கம்", "நன்றி", "அம்மா", "அப்பா", "தமிழ்",
    "கல்வி", "மாணவர்", "நூலகம்", "பள்ளி", "விழா",
    "தமிழ்நாடு", "சென்னை", "அன்பு", "நட்பு", "உழைப்பு"
];

let currentWord = words[Math.floor(Math.random() * words.length)];

if (expectedWord) {
    expectedWord.innerHTML = currentWord;
}

// ===============================
// AI-LIKE SIMILARITY FUNCTION
// ===============================

function similarity(a, b) {
    let longer = a.length > b.length ? a : b;
    let shorter = a.length > b.length ? b : a;

    let longerLength = longer.length;
    if (longerLength === 0) return 100;

    let matchCount = 0;

    for (let i = 0; i < shorter.length; i++) {
        if (longer[i] === shorter[i]) matchCount++;
    }

    return Math.round((matchCount / longerLength) * 100);
}

// ===============================
// SPEECH RECOGNITION (WORD PRACTICE)
// ===============================

if (recordBtn) {
    recordBtn.addEventListener("click", function () {

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            result.innerHTML = "❌ Speech Recognition not supported";
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "ta-IN";

        recordBtn.classList.add("recording");
        result.innerHTML = "🎤 Listening...";

        recognition.start();

        recognition.onresult = function (event) {

            recordBtn.classList.remove("recording");

            const text = event.results[0][0].transcript.toLowerCase();
            result.innerHTML = "🗣 You said: " + text;

            let similarityScore = similarity(text, currentWord.toLowerCase());

            let pronunciationScore = similarityScore;
            let accentScore = Math.max(similarityScore - 5, 0);
            let fluencyScore = Math.min(similarityScore + 3, 100);

            let feedbackText = "";

            if (similarityScore > 85) {
                feedbackText = "🟢 Excellent pronunciation!";
                correct++;
            } 
            else if (similarityScore > 60) {
                feedbackText = "🟡 Good, but improve clarity.";
            } 
            else {
                feedbackText = "🔴 Try speaking more clearly.";
            }

            if (feedback) feedback.innerHTML = feedbackText;

            if (score) score.innerHTML = pronunciationScore + "%";
            if (accentScoreEl) accentScoreEl.innerHTML = accentScore + "%";
            if (fluencyScoreEl) fluencyScoreEl.innerHTML = fluencyScore + "%";

            attempts++;

            if (attemptsEl) attemptsEl.innerHTML = "Total Attempts: " + attempts;
            if (correctEl) correctEl.innerHTML = "Correct Attempts: " + correct;

            let accuracy = ((correct / attempts) * 100).toFixed(0);

            if (accuracyEl) accuracyEl.innerHTML = "Accuracy: " + accuracy + "%";
            if (progressBar) progressBar.style.width = accuracy + "%";

            let level = "Beginner";
            if (accuracy >= 80) level = "🏆 Expert";
            else if (accuracy >= 50) level = "⭐ Intermediate";

            if (levelEl) levelEl.innerHTML = "Level: " + level;

            currentWord = words[Math.floor(Math.random() * words.length)];
            if (expectedWord) expectedWord.innerHTML = currentWord;
        };

        recognition.onerror = function (event) {
            recordBtn.classList.remove("recording");
            result.innerHTML = "❌ Error: " + event.error;
        };
    });
}

// ===============================
// THIRUKKURAL SPEECH + AI ANALYSIS
// ===============================

if (kuralBtn) {
    kuralBtn.addEventListener("click", function () {

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            if (kuralResult) {
                kuralResult.innerHTML = "❌ Speech Recognition not supported";
            }
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "ta-IN";

        kuralBtn.classList.add("recording");

        if (kuralResult) {
            kuralResult.innerHTML = "🎤 Listening to Thirukkural...";
        }

        recognition.start();

        recognition.onresult = function (event) {

            kuralBtn.classList.remove("recording");

            const text = event.results[0][0].transcript.toLowerCase();

            let kuralLine =
                "அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு";

            let score = similarity(text, kuralLine.toLowerCase());

            let analysis = "";

            if (score > 85) {
                analysis = "🟢 Excellent Thirukkural pronunciation!";
            } 
            else if (score > 60) {
                analysis = "🟡 Good attempt, improve clarity.";
            } 
            else {
                analysis = "🔴 Needs more practice.";
            }

            if (kuralResult) {
                kuralResult.innerHTML =
                    "🧠 AI Analysis Score: " + score + "%<br>" +
                    analysis;
            }
        };

        recognition.onerror = function (event) {
            kuralBtn.classList.remove("recording");

            if (kuralResult) {
                kuralResult.innerHTML = "❌ Error: " + event.error;
            }
        };
    });
}
