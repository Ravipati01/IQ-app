function rand(n){return Math.floor(Math.random()*n);}

function math(d){
let max = d==="hard"?50:d==="medium"?20:10;
let a=rand(max),b=rand(max);
return {type:"math",q:`${a}+${b}?`,o:[a+b,a+b+1,a+b-1].map(String),a:String(a+b),concept:"math"};
}

function story(){
let a=rand(10)+3,b=rand(5)+1;
return {type:"story",q:`🍎 ${a} apples give ${b}?`,o:[a-b,a-b+1,a-b-1].map(String),a:String(a-b),concept:"story"};
}

function logic(){
return {type:"logic",q:"1,3,5,?",o:["6","7","8"],a:"7",concept:"logic"};
}

function emotion(){
return {type:"emotion",q:"Friend sad 😢?",o:["Help","Ignore","Laugh"],a:"Help",concept:"emotion"};
}

function getPuzzle(type,d){
if(type==="math")return math(d);
if(type==="story")return story();
if(type==="logic")return logic();
if(type==="emotion")return emotion();
}
