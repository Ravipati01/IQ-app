function rand(n){return Math.floor(Math.random()*n);}

function genMath(d){
let max=d==="hard"?50:d==="medium"?20:10;
let a=rand(max),b=rand(max);
return {type:"math",q:`🍎 ${a}+${b}?`,o:[a+b,a+b+1,a+b-1].map(String),a:String(a+b),concept:"math",exp:`${a}+${b}=${a+b}`};
}

function genVisual(){
let sets=[{o:["⬛","⬛","⬜","⬛"],a:"⬜"},{o:["🐶","🐶","🐱","🐶"],a:"🐱"}];
let s=sets[rand(sets.length)];
return {type:"visual",o:s.o,a:s.a,concept:"visual",exp:"One is different 👀"};
}

function genStory(){
let a=rand(5)+5,b=rand(3)+1;
return {type:"story",q:`🍎 ${a} apples give ${b}`,o:[a-b,a-b+1,a-b-1].map(String),a:String(a-b),concept:"story",exp:`${a}-${b}=${a-b}`};
}

function getPuzzle(d){
let arr=["math","visual","story"];
let t=arr[rand(arr.length)];
if(t==="math")return genMath(d);
if(t==="visual")return genVisual();
if(t==="story")return genStory();
}
