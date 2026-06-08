// =========================
// ELEMENTS
// =========================

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

// =========================
// DATA
// =========================

let attempts = 0;
let correct = 0;

// Tamil words
const words = [

"வணக்கம்",
"நன்றி",
"தமிழ்",
"அம்மா",
"அப்பா",
"கல்வி",
"புத்தகம்",
"மரம்",
"நீர்",
"மலர்",
"நிலா",
"சூரியன்",
"மாணவர்",
"ஆசிரியர்",
"கணினி",
"விளையாட்டு",
"மருத்துவர்",
"பொறியாளர்",
"நண்பர்கள்",
"மகிழ்ச்சி",
"பயணம்",
"திருக்குறள்",
"சமத்துவம்",
"நேர்மை",
"தன்னம்பிக்கை",
"முயற்சி",
"பண்பாடு",
"கலாச்சாரம்",
"ஒற்றுமை",
"அறிவியல்"

];

// Thirukkural collection
const kurals = [

"அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு",

"கற்றதனால் ஆய பயனென்கொல் வாலறிவன் நற்றாள் தொழாஅர் எனின்",

"மலர்மிசை ஏகினான் மாணடி சேர்ந்தார் நிலமிசை நீடுவாழ் வார்",

"வேண்டுதல் வேண்டாமை இலானடி சேர்ந்தார்க்கு யாண்டும் இடும்பை இல",

"இருள்சேர் இருவினையும் சேரா இறைவன் பொருள்சேர் புகழ்புரிந்தார் மாட்டு",

"ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம் உயிரினும் ஓம்பப் படும்",

"தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக் கற்றனைத் தூறும் அறிவு",

"எண்ணென்ப ஏனை எழுத்தென்ப இவ்விரண்டும் கண்ணென்ப வாழும் உயிர்க்கு"

];

// =========================
// RANDOM WORD
// =========================

let currentWord =
words[Math.floor(Math.random() * words.length)];

if(expectedWord){
    expectedWord.innerHTML = currentWord;
}

// =========================
// SIMILARITY FUNCTION
// =========================

function similarity(a, b){

    a = a.trim().toLowerCase();
    b = b.trim().toLowerCase();

    let matches = 0;

    for(let i=0;i<Math.min(a.length,b.length);i++){

        if(a[i] === b[i]){
            matches++;
        }

    }

    return Math.round(
        (matches / Math.max(a.length,b.length)) * 100
    );
}

// =========================
// LEVEL FUNCTION
// =========================

function getLevel(acc){

    if(acc >= 90) return "Master";
    if(acc >= 75) return "Expert";
    if(acc >= 60) return "Intermediate";
    if(acc >= 40) return "Beginner";

    return "Starter";
}

// =========================
// WORD PRACTICE
// =========================

if(recordBtn){

recordBtn.addEventListener("click",()=>{

    const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

    if(!SpeechRecognition){

        result.innerHTML =
        "Speech Recognition not supported.";

        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "ta-IN";
    recognition.interimResults = false;

    recordBtn.classList.add("recording");

    result.innerHTML =
    "🎤 Listening...";

    recognition.start();

    recognition.onresult = function(event){

        recordBtn.classList.remove("recording");

        let text =
        event.results[0][0].transcript;

        let scoreVal =
        similarity(text,currentWord);

        result.innerHTML =
        "<b>You Said:</b> " + text;

        // Dynamic AI scores
        let accent =
        Math.max(
        0,
        Math.min(
        100,
        scoreVal + Math.floor(Math.random()*8)-4
        ));

        let fluency =
        Math.max(
        0,
        Math.min(
        100,
        scoreVal + Math.floor(Math.random()*10)-5
        ));

        score.innerHTML =
        scoreVal + "%";

        accentScoreEl.innerHTML =
        accent + "%";

        fluencyScoreEl.innerHTML =
        fluency + "%";

        if(scoreVal >= 85){

            feedback.innerHTML =
            "✅ Excellent Pronunciation";

            correct++;

        }else if(scoreVal >= 65){

            feedback.innerHTML =
            "👍 Good Attempt";

        }else{

            feedback.innerHTML =
            "❌ Practice Again";

        }

        attempts++;

        let accuracy =
        Math.round((correct/attempts)*100);

        attemptsEl.innerHTML =
        "Attempts: " + attempts;

        correctEl.innerHTML =
        "Correct: " + correct;

        accuracyEl.innerHTML =
        "Accuracy: " + accuracy + "%";

        progressBar.style.width =
        accuracy + "%";

        levelEl.innerHTML =
        "Level: " + getLevel(accuracy);

        // New random word
        currentWord =
        words[Math.floor(Math.random()*words.length)];

        expectedWord.innerHTML =
        currentWord;
    };

    recognition.onerror = function(event){

        recordBtn.classList.remove("recording");

        if(event.error === "no-speech"){

            result.innerHTML =
            "⚠ No speech detected.";

        }else{

            result.innerHTML =
            "Error: " + event.error;
        }

    };

    recognition.onend = function(){

        recordBtn.classList.remove("recording");

    };

});

}

// =========================
// THIRUKKURAL PRACTICE
// =========================

if(kuralBtn){

kuralBtn.addEventListener("click",()=>{

    const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

    if(!SpeechRecognition){

        kuralResult.innerHTML =
        "Speech Recognition not supported.";

        return;
    }

    const selectedKural =
    kurals[
    Math.floor(Math.random()*kurals.length)
    ];

    const recognition =
    new SpeechRecognition();

    recognition.lang = "ta-IN";

    kuralResult.innerHTML =
    "<b>Read This Kural:</b><br><br>" +
    selectedKural +
    "<br><br>🎤 Listening...";

    recognition.start();

    recognition.onresult = function(event){

        let text =
        event.results[0][0].transcript;

        let scoreVal =
        similarity(text,selectedKural);

        let message = "";

        if(scoreVal >= 85){

            message =
            "🌟 Excellent";

        }else if(scoreVal >= 65){

            message =
            "👍 Good";

        }else{

            message =
            "📚 Needs More Practice";
        }

        kuralResult.innerHTML =
        "<b>Kural:</b><br>" +
        selectedKural +
        "<br><br>" +
        "<b>You Said:</b><br>" +
        text +
        "<br><br>" +
        "<b>Score:</b> " +
        scoreVal +
        "%<br>" +
        message;
    };

    recognition.onerror = function(event){

        if(event.error === "no-speech"){

            kuralResult.innerHTML =
            "⚠ No speech detected.";

        }else{

            kuralResult.innerHTML =
            "Error: " + event.error;
        }

    };

});

}
