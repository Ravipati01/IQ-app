let xp=0,streak=0,difficulty="easy";
let stats={math:{c:0,w:0},visual:{c:0,w:0},story:{c:0,w:0}};
let weak=[];

function startGame(){show();}

function show(){
let p=getPuzzle(difficulty);
window.current=p;

if(p.type==="math"||p.type==="story"){
document.getElementById("game").innerHTML=`<div class="puzzle">
<h2>${p.q}</h2>
${p.o.map(o=>`<button onclick="check('${o}',this)">${o}</button>`).join("")}
<div id="fb"></div></div>`;
}
else if(p.type==="visual"){
document.getElementById("game").innerHTML=`<div class="puzzle">
<h2>👀 Find different</h2>
${p.o.map(o=>`<button onclick="check('${o}',this)">${o}</button>`).join("")}
<div id="fb"></div></div>`;
}
}

function check(ans,btn){
let p=window.current;
let fb=document.getElementById("fb");
let char=document.getElementById("character");

if(ans===p.a){
btn.classList.add("correct");
xp+=5;streak++;stats[p.concept].c++;weak=[];
char.innerText="😄";
fb.innerHTML="🎉 Great!";
}else{
btn.classList.add("wrong");
streak=0;stats[p.concept].w++;weak=[p.concept];
char.innerText="😢";
fb.innerHTML=`❌ ${p.exp}`;
}

adapt();
save();
updateUI();
setTimeout(()=>{char.innerText="🐵";show();},1000);
}

function adapt(){
let total=Object.values(stats).reduce((a,b)=>a+b.c,0);
if(total>5)difficulty="medium";
if(total>15)difficulty="hard";
document.getElementById("level").innerText="Level:"+difficulty;
}

function save(){
localStorage.setItem("stats",JSON.stringify(stats));
}

function updateUI(){
document.getElementById("xp").innerText="XP:"+xp;
document.getElementById("streak").innerText="🔥"+streak;
}

function openDashboard(){
let s=JSON.parse(localStorage.getItem("stats"))||stats;
document.getElementById("dashboard").innerHTML=`<canvas id="chart"></canvas>`;
new Chart(document.getElementById("chart"),{
type:"bar",
data:{
labels:Object.keys(s),
datasets:[
{label:"Correct",data:Object.values(s).map(x=>x.c)},
{label:"Wrong",data:Object.values(s).map(x=>x.w)}
]
}
});
}

show();
