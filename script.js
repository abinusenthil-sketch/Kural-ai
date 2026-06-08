// ===============================
// SPEECH PRACTICE SECTION
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

            attempts++;

            const text = event.results[0][0].transcript.toLowerCase();
            result.innerHTML = "🗣 You said: " + text;

            let pronunciationScore = 60;
            let accentScore = 65;
            let fluencyScore = 70;

            if (text.includes(currentWord.toLowerCase())) {

                correct++;

                pronunciationScore = 100;
                accentScore = 95;
                fluencyScore = 92;

                if (feedback) {
                    feedback.innerHTML = "✅ Excellent pronunciation! Great job!";
                }

            } else {

                pronunciationScore = 60;
                accentScore = 70;
                fluencyScore = 68;

                if (feedback) {
                    feedback.innerHTML = "⚠️ Try speaking slowly and clearly.";
                }
            }

            if (score) score.innerHTML = pronunciationScore + "%";
            if (accentScoreEl) accentScoreEl.innerHTML = accentScore + "%";
            if (fluencyScoreEl) fluencyScoreEl.innerHTML = fluencyScore + "%";

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
// THIRUKKURAL SPEECH SECTION
// ===============================

const kuralBtn = document.getElementById("kuralBtn");
const kuralResult = document.getElementById("kuralResult");

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

            const text = event.results[0][0].transcript;

            if (kuralResult) {
                kuralResult.innerHTML = "🗣 You said: " + text;
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
