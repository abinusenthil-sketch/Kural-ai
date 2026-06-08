// ELEMENTS
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

// DATA
let attempts = 0;
let correct = 0;

const words = ["வணக்கம்","நன்றி","அம்மா","அப்பா","தமிழ்","கல்வி"];

let currentWord = words[Math.floor(Math.random()*words.length)];

if(expectedWord){
    expectedWord.innerHTML = currentWord;
}

// AI similarity
function similarity(a,b){
    let max = Math.max(a.length,b.length);
    let match = 0;

    for(let i=0;i<Math.min(a.length,b.length);i++){
        if(a[i]===b[i]) match++;
    }

    return Math.round((match/max)*100);
}

// SPEECH
if(recordBtn){
recordBtn.addEventListener("click",()=>{

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(!SpeechRecognition){
        result.innerHTML="Not supported";
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang="ta-IN";

    recordBtn.classList.add("recording");
    result.innerHTML="Listening...";
    recognition.start();

    recognition.onresult=function(event){

        recordBtn.classList.remove("recording");

        let text = event.results[0][0].transcript.toLowerCase();

        let scoreVal = similarity(text,currentWord.toLowerCase());

        result.innerHTML="You said: "+text;

        if(scoreVal>85){
            correct++;
            feedback.innerHTML="Excellent!";
        }else if(scoreVal>60){
            feedback.innerHTML="Good try";
        }else{
            feedback.innerHTML="Try again";
        }

        attempts++;

        score.innerHTML=scoreVal+"%";
        accentScoreEl.innerHTML=(scoreVal-5)+"%";
        fluencyScoreEl.innerHTML=(scoreVal+3)+"%";

        let acc = Math.round((correct/attempts)*100);

        attemptsEl.innerHTML="Attempts: "+attempts;
        correctEl.innerHTML="Correct: "+correct;
        accuracyEl.innerHTML="Accuracy: "+acc+"%";

        progressBar.style.width=acc+"%";

        levelEl.innerHTML =
        acc>80?"Expert":acc>50?"Intermediate":"Beginner";

        currentWord = words[Math.floor(Math.random()*words.length)];
        expectedWord.innerHTML=currentWord;
    };

});
}

// THIRUKKURAL
if(kuralBtn){
kuralBtn.addEventListener("click",()=>{

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang="ta-IN";

    kuralResult.innerHTML="Listening Thirukkural...";

    recognition.start();

    recognition.onresult=function(event){

        let text = event.results[0][0].transcript.toLowerCase();

        let kural="அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு";

        let scoreVal = similarity(text,kural.toLowerCase());

        kuralResult.innerHTML=
        "Score: "+scoreVal+"%<br>"+
        (scoreVal>85?"Excellent":"Needs Practice");
    };

});
}
