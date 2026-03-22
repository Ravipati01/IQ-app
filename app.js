let used=[],xp=0,streak=0,difficulty="easy";

function startGame(){
 document.getElementById("welcome").style.display="none";
 document.getElementById("game").style.display="block";
 next();
}

function getPuzzle(){
 let available=puzzles.filter(p=>p.difficulty===difficulty && !used.includes(p.id));
 if(available.length===0) used=[];
 let p=available[Math.floor(Math.random()*available.length)];
 used.push(p.id);
 return p;
}

function next(){
 let p=getPuzzle();
 window.cur=p;
 document.getElementById("category").innerText=p.category;
 document.getElementById("question").innerText=p.question;
 document.getElementById("options").innerHTML=
 p.options.map(o=>`<button onclick="check('${o}')">${o}</button>`).join("");
}

function setMonkey(state){
 let m=document.getElementById("monkeyContainer");
 m.className="";
 if(state==="happy") m.classList.add("happy");
 if(state==="sad") m.classList.add("sad");
}

function check(ans){
 let fb=document.getElementById("feedback");
 if(ans===cur.answer){
  xp+=10;streak++;
  setMonkey("happy");
  fb.innerText="🎉 Correct!";
 }else{
  streak=0;
  setMonkey("sad");
  fb.innerText=cur.explanation;
 }

 if(xp>50) difficulty="medium";
 if(xp>100) difficulty="hard";

 next();
}
