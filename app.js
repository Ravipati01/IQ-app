let xp=0,streak=0;
let difficulty="easy";
let stats={math:{c:0,w:0},story:{c:0,w:0},logic:{c:0,w:0},emotion:{c:0,w:0}};

const types=["math","story","logic","emotion"];

function nextType(){
return types[Math.floor(Math.random()*types.length)];
}

function show(){
let type=nextType();
let p=getPuzzle(type,difficulty);
window.current=p;

document.getElementById("game").innerHTML=`
<div class="puzzle">
<h2>${p.q}</h2>
${p.o.map(o=>`<button onclick="check('${o}')">${o}</button>`).join("")}
<div id="fb"></div>
</div>`;
}

function check(ans){
let p=window.current;
let fb=document.getElementById("fb");

if(ans===p.a){
xp+=5;streak++;
stats[p.concept].c++;
fb.innerHTML="🎉 Correct!";
}else{
streak=0;
stats[p.concept].w++;
fb.innerHTML="❌ Try again!";
}

adapt();
updateUI();
save();
setTimeout(show,1000);
}

function adapt(){
let totalCorrect=Object.values(stats).reduce((a,b)=>a+b.c,0);

if(totalCorrect>5)difficulty="medium";
if(totalCorrect>15)difficulty="hard";

document.getElementById("level").innerText="Level:"+difficulty;
}

function save(){
localStorage.setItem("stats",JSON.stringify(stats));
}

function updateUI(){
document.getElementById("xp").innerText="XP:"+xp;
document.getElementById("streak").innerText="🔥"+streak;
showReport();
}

function showReport(){
let html="<div class='report'><h3>Progress</h3>";
for(let k in stats){
html+=`${k}: ✔ ${stats[k].c} ❌ ${stats[k].w}<br>`;
}
html+="</div>";
document.getElementById("report").innerHTML=html;
}

show();
