// ======================
// ELEMENTS
// ======================

const expectedWord = document.getElementById("expectedWord");
const recordBtn = document.getElementById("recordBtn");
const nextWordBtn = document.getElementById("nextWordBtn");

const result = document.getElementById("result");
const score = document.getElementById("score");
const accentScore = document.getElementById("accentScore");
const fluencyScore = document.getElementById("fluencyScore");
const feedback = document.getElementById("feedback");

const attemptsEl = document.getElementById("attempts");
const correctEl = document.getElementById("correct");
const accuracyEl = document.getElementById("accuracy");
const levelEl = document.getElementById("level");
const progressBar = document.getElementById("progressBar");

const kuralNumber = document.getElementById("kuralNumber");
const kuralText = document.getElementById("kuralText");
const readKuralBtn = document.getElementById("readKuralBtn");
const practiceKuralBtn = document.getElementById("practiceKuralBtn");
const nextKuralBtn = document.getElementById("nextKuralBtn");
const kuralResult = document.getElementById("kuralResult");

// ======================
// DASHBOARD
// ======================

let attempts = 0;
let correct = 0;

// ======================
// WORDS
// ======================

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

// ======================
// THIRUKKURALS
// ======================

const kurals = [

{
number:1,
text:"அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு"
},

{
number:2,
text:"கற்றதனால் ஆய பயனென்கொல் வாலறிவன் நற்றாள் தொழாஅர் எனின்"
},

{
number:3,
text:"மலர்மிசை ஏகினான் மாணடி சேர்ந்தார் நிலமிசை நீடுவாழ் வார்"
},

{
number:4,
text:"வேண்டுதல் வேண்டாமை இலானடி சேர்ந்தார்க்கு யாண்டும் இடும்பை இல"
},

{
number:5,
text:"இருள்சேர் இருவினையும் சேரா இறைவன் பொருள்சேர் புகழ்புரிந்தார் மாட்டு"
},

{
number:6,
text:"ஒழுக்கம் விழுப்பம் தரலான் ஒழுக்கம் உயிரினும் ஓம்பப் படும்"
}

];

// ======================
// CURRENT VALUES
// ======================

let currentWord =
words[Math.floor(Math.random()*words.length)];

let currentKural =
kurals[Math.floor(Math.random()*kurals.length)];

if(expectedWord){
expectedWord.innerHTML = currentWord;
}

displayKural();

// ======================
// DISPLAY KURAL
// ======================

function displayKural(){

if(kuralNumber){
kuralNumber.innerHTML =
"📜 Thirukkural #" +
currentKural.number;
}

if(kuralText){
kuralText.innerHTML =
currentKural.text;
}

}

// ======================
// SIMILARITY
// ======================

function similarity(a,b){

a = a.trim().toLowerCase();
b = b.trim().toLowerCase();

let matches = 0;

for(
let i=0;
i<Math.min(a.length,b.length);
i++
){

if(a[i]===b[i]){
matches++;
}

}

return Math.round(
(matches/Math.max(a.length,b.length))*100
);

}

// ======================
// LEVEL
// ======================

function getLevel(acc){

if(acc>=90) return "Master";
if(acc>=75) return "Expert";
if(acc>=60) return "Intermediate";
if(acc>=40) return "Beginner";

return "Starter";

}

// ======================
// DASHBOARD
// ======================

function updateDashboard(){

let accuracy = attempts === 0
? 0
: Math.round((correct/attempts)*100);

if(attemptsEl){
attemptsEl.innerHTML = attempts;
}

if(correctEl){
correctEl.innerHTML = correct;
}

if(accuracyEl){
accuracyEl.innerHTML =
accuracy + "%";
}

if(levelEl){
levelEl.innerHTML =
getLevel(accuracy);
}

if(progressBar){
progressBar.style.width =
accuracy + "%";
}

}

// ======================
// NEXT WORD
// ======================

if(nextWordBtn){

nextWordBtn.addEventListener(
"click",
()=>{

currentWord =
words[Math.floor(
Math.random()*words.length
)];

expectedWord.innerHTML =
currentWord;

}
);

}

// ======================
// NEXT KURAL
// ======================

if(nextKuralBtn){

nextKuralBtn.addEventListener(
"click",
()=>{

currentKural =
kurals[Math.floor(
Math.random()*kurals.length
)];

displayKural();

if(kuralResult){
kuralResult.innerHTML = "";
}

}
);

}

// ======================
// READ KURAL
// ======================

if(readKuralBtn){

readKuralBtn.addEventListener(
"click",
()=>{

const speech =
new SpeechSynthesisUtterance(
currentKural.text
);

speech.lang = "en-US";
speech.rate = 0.8;

speechSynthesis.cancel();
  setTimeout(()=>{
speechSynthesis.speak(speech);

},100);
));

}

// ======================
// RECORD
// ======================

if(recordBtn){

recordBtn.addEventListener(
"click",
()=>{

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

result.innerHTML =
"Speech Recognition not supported.";

return;
}

const recognition =
new SpeechRecognition();

recognition.lang = "ta-IN";

recordBtn.classList.add(
"recording"
);

result.innerHTML =
"🎤 Listening...";

recognition.start();

recognition.onresult =
function(event){

recordBtn.classList.remove(
"recording"
);

let spoken =
event.results[0][0].transcript;

let pronunciation =
similarity(
spoken,
currentWord
);

let confidence =
Math.round(
(event.results[0][0].confidence || 0.8)
*100
);

let accent =
Math.round(
(pronunciation*0.7)+
(confidence*0.3)
);

let fluency =
Math.round(
(pronunciation*0.8)+
(confidence*0.2)
);

score.innerHTML =
pronunciation + "%";

accentScore.innerHTML =
accent + "%";

fluencyScore.innerHTML =
fluency + "%";

result.innerHTML =
"<b>You Said:</b><br>" +
spoken;

if(pronunciation >= 85){

feedback.innerHTML =
"🌟 Excellent Pronunciation";

correct++;

}
else if(pronunciation >= 65){

feedback.innerHTML =
"👍 Good Attempt";

}
else{

feedback.innerHTML =
"📚 Needs More Practice";

}

attempts++;

updateDashboard();

currentWord =
words[Math.floor(
Math.random()*words.length
)];

expectedWord.innerHTML =
currentWord;

};

recognition.onerror =
function(){

recordBtn.classList.remove(
"recording"
);

result.innerHTML =
"Speech Recognition Error";

};

}
);

}

// ======================
// START
// ======================

updateDashboard();

if(practiceKuralBtn){

practiceKuralBtn.addEventListener(
"click",
()=>{

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

kuralResult.innerHTML =
"Speech Recognition not supported.";

return;
}

const recognition =
new SpeechRecognition();

recognition.lang = "ta-IN";

kuralResult.innerHTML =
"🎤 Listening...";

recognition.start();

recognition.onresult =
function(event){

const spokenText =
event.results[0][0].transcript;

const scoreVal =
similarity(
spokenText,
currentKural.text
);

let message = "";

if(scoreVal >= 85){

message =
"🌟 Excellent Reading";

}
else if(scoreVal >= 65){

message =
"👍 Good Reading";

}
else{

message =
"📚 Practice Again";

}

kuralResult.innerHTML =
"<b>Kural:</b><br><br>" +
currentKural.text +
"<br><br>" +
"<b>You Said:</b><br><br>" +
spokenText +
"<br><br>" +
"<b>Score:</b> " +
scoreVal +
"%<br><br>" +
message;

};

recognition.onerror =
function(){

kuralResult.innerHTML =
"Speech recognition error.";

};

});

}
