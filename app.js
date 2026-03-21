let currentIndex = 0;
let score = 0;
let stars = 0;
let difficultyLevel = "easy";

function updateUI(){
document.getElementById("score").innerText="Score: "+score;
document.getElementById("level").innerText="Level: "+difficultyLevel.toUpperCase();
document.getElementById("stars").innerText="⭐ "+stars+" Stars";
}

function showPuzzle(){
const game=document.getElementById("game");
const nextBtn=document.getElementById("nextBtn");
nextBtn.style.display="none";

const filtered=puzzles.filter(p=>p.difficulty===difficultyLevel);

if(currentIndex>=filtered.length){showDashboard();return;}

const p=filtered[currentIndex];

game.innerHTML=`<div class="puzzle">
<h2>${p.question}</h2>
${p.options.map(o=>`<button onclick="checkAnswer('${o}')">${o}</button>`).join("")}
<p id="feedback"></p>
</div>`;

updateUI();
updateProgress();
}

function checkAnswer(sel){
const filtered=puzzles.filter(p=>p.difficulty===difficultyLevel);
const p=filtered[currentIndex];
const fb=document.getElementById("feedback");

if(sel===p.answer){
fb.innerHTML="<span class='correct'>✅ Correct!</span>";
score+=10;
stars+=1;
document.getElementById("nextBtn").style.display="inline-block";

if(score>=50 && difficultyLevel==="easy"){difficultyLevel="medium";currentIndex=0;}
else if(score>=120 && difficultyLevel==="medium"){difficultyLevel="hard";currentIndex=0;}

}else{
fb.innerHTML="<span class='wrong'>❌ Try again!</span>";
}

updateUI();
}

function nextPuzzle(){
currentIndex++;
showPuzzle();
}

document.getElementById("nextBtn").addEventListener("click",nextPuzzle);

function updateProgress(){
let progress=((currentIndex+1)/10)*100;
document.getElementById("progress").style.width=progress+"%";
}

function showDashboard(){
document.getElementById("game").innerHTML=`<h2>🎉 Game Over</h2><p>Score: ${score}</p><button onclick="restartGame()">Play Again</button>`;
}

function restartGame(){
currentIndex=0;score=0;stars=0;difficultyLevel="easy";showPuzzle();
}

showPuzzle();
