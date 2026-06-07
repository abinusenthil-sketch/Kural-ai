const recordBtn = document.getElementById("recordBtn");
const result = document.getElementById("result");
const score = document.getElementById("score");
const expectedWord = document.getElementById("expectedWord");

let attempts = 0;
let correct = 0;

const words = [
    "வணக்கம்",
    "நன்றி",
    "அம்மா",
    "அப்பா",
    "தமிழ்"
];

let currentWord =
words[Math.floor(Math.random() * words.length)];

expectedWord.innerHTML = currentWord;

recordBtn.addEventListener("click", function () {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        result.innerHTML =
        "❌ Speech Recognition not supported";

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

        const text =
        event.results[0][0].transcript.toLowerCase();

        result.innerHTML =
        "🗣 You said: " + text;

        let pronunciationScore = 60;
        let accentScore = 65;
        let fluencyScore = 70;

        if (text.includes(currentWord.toLowerCase())) {

            correct++;

            pronunciationScore = 100;
            accentScore = 95;
            fluencyScore = 92;

            document.getElementById("feedback").innerHTML =
            "✅ Excellent pronunciation! Keep it up.";
        }
        else {

            pronunciationScore = 60;
            accentScore = 70;
            fluencyScore = 68;

            document.getElementById("feedback").innerHTML =
            "⚠️ Try speaking more clearly and slowly.";
        }

        document.getElementById("score").innerHTML =
        pronunciationScore + "%";

        document.getElementById("accentScore").innerHTML =
        accentScore + "%";

        document.getElementById("fluencyScore").innerHTML =
        fluencyScore + "%";

        document.getElementById("attempts").innerHTML =
        "Total Attempts: " + attempts;

        document.getElementById("correct").innerHTML =
        "Correct Attempts: " + correct;

        let accuracy =
        ((correct / attempts) * 100).toFixed(0);

        document.getElementById("accuracy").innerHTML =
        "Accuracy: " + accuracy + "%";

        document.getElementById("progressBar").style.width =
        accuracy + "%";

        let level = "Beginner";

        if (accuracy >= 80) {
            level = "🏆 Expert";
        }
        else if (accuracy >= 50) {
            level = "⭐ Intermediate";
        }

        document.getElementById("level").innerHTML =
        "Level: " + level;

        currentWord =
        words[Math.floor(Math.random() * words.length)];

        expectedWord.innerHTML = currentWord;
    };

    recognition.onerror = function(event){

        recordBtn.classList.remove("recording");

        result.innerHTML =
        "❌ Error: " + event.error;
    };
});
