let puzzles=[],used=[];
let difficulty="easy";

fetch('data/puzzles.json').then(r=>r.json()).then(d=>{puzzles=d;});

function startGame(){
 document.getElementById("welcome").style.display="none";
 document.getElementById("game").style.display="block";
 next();
}

function next(){
 let available=puzzles.filter(p=>p.difficulty===difficulty && !used.includes(p.id));
 if(available.length===0) used=[];
 let p=available[Math.floor(Math.random()*available.length)];
 used.push(p.id);
 window.cur=p;

 document.getElementById("category").innerText=p.category;
 document.getElementById("question").innerText=p.question;
 document.getElementById("options").innerHTML=
 p.options.map(o=>`<button onclick="check('${o}')">${o}</button>`).join("");
}

function check(ans){
 let fb=document.getElementById("feedback");
 if(ans===cur.answer){
  fb.innerText="Correct!";
 }else{
  fb.innerText=cur.explanation;
 }
 next();
}
