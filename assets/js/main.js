/* =========================================================
   ZETTABILLER UI SYSTEM
========================================================= */

/* Always start page from top on refresh */

window.addEventListener("beforeunload", () => {
  window.scrollTo(0,0);
});


document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
   PARTNER SIGN-IN MODAL
========================================================= */

const signInModal = document.getElementById("signInModal");
const openSignIn = document.getElementById("openSignIn");
const closeSignIn = document.getElementById("closeSignIn");

const companyInput = document.getElementById("companyInput");
const continueBtn = document.getElementById("continueBtn");
const browserNote = document.getElementById("browserNote");


/* OPEN MODAL */

if(openSignIn && signInModal){

openSignIn.addEventListener("click",(e)=>{
e.preventDefault();

signInModal.style.display="flex";

if(companyInput){
companyInput.value="";
companyInput.focus();
}

});

}


/* CLOSE MODAL ONLY FROM X */

if(closeSignIn && signInModal){

closeSignIn.addEventListener("click",()=>{
signInModal.style.display="none";
});

}


/* CONTINUE BUTTON */

if(continueBtn){

continueBtn.addEventListener("click", goToWorkspace);

}


function goToWorkspace(){

const tenant = companyInput.value.trim().toLowerCase();

if(!tenant){
companyInput.focus();
return;
}

continueBtn.textContent="Loading...";
continueBtn.disabled=true;

setTimeout(()=>{
window.location.href="https://"+tenant+".zettabiller.com";
},400);

}


/* =========================================================
   BROWSER DETECTION
========================================================= */

function detectBrowser(){

const ua = navigator.userAgent;

let name="Browser";
let version="";

if(/Edg\/(\d+)/.test(ua)){
name="Microsoft Edge";
version=ua.match(/Edg\/(\d+)/)[1];
}

else if(/Chrome\/(\d+)/.test(ua)){
name="Chrome";
version=ua.match(/Chrome\/(\d+)/)[1];
}

else if(/Firefox\/(\d+)/.test(ua)){
name="Firefox";
version=ua.match(/Firefox\/(\d+)/)[1];
}

else if(/Safari/.test(ua) && /Version\/(\d+)/.test(ua)){
name="Safari";
version=ua.match(/Version\/(\d+)/)[1];
}

return {name,version};

}


/* =========================================================
   IP DETECTION
========================================================= */

function detectIP(){

return fetch("https://api.ipify.org?format=json")
.then(r=>r.json())
.then(d=>d.ip)
.catch(()=>null);

}


/* =========================================================
   RENDER BROWSER NOTE
========================================================= */

function renderNote(browser,ip){

if(!browserNote) return;

browserNote.textContent=
"You are using "+
browser.name+
" "+
browser.version+
(ip ? " · IP "+ip : "");

}


/* INIT BROWSER NOTE */

if(browserNote){

const browser = detectBrowser();

detectIP().then(ip=>{
renderNote(browser,ip);
});

}
/* =========================================================
   CONTINUE BUTTON CLICK
========================================================= */

continueBtn.addEventListener("click", () => {

const tenant = companyInput.value.trim().toLowerCase();

if(!tenant){
companyInput.focus();
return;
}

continueBtn.textContent="Connecting...";
continueBtn.disabled=true;

redirectMsg.textContent =
"Redirecting you to https://" + tenant + ".zettabiller.com";

setTimeout(()=>{
window.location.href="https://" + tenant + ".zettabiller.com";
},1200);

});

/* =========================================================
   REQUEST DEMO MODAL
========================================================= */

const demoModal = document.getElementById("demoModal");
const openDemo = document.getElementById("openDemo");
const closeDemo = document.getElementById("closeDemo");

const demoForm = document.getElementById("demoForm");
const demoSuccess = document.getElementById("demoSuccess");


/* OPEN MODAL */

if(openDemo && demoModal){

openDemo.addEventListener("click",()=>{
demoModal.style.display="flex";
});

}


/* CLOSE MODAL ONLY FROM X */

if(closeDemo && demoModal){

closeDemo.addEventListener("click",()=>{
demoModal.style.display="none";
});

}


/* Demo form submit */

if(demoForm){

demoForm.addEventListener("submit",(e)=>{

e.preventDefault();

demoForm.style.display="none";

if(demoSuccess){
demoSuccess.style.display="block";
}

});

}

/* =========================================================
   HERO CANVAS NETWORK ANIMATION
========================================================= */

const canvas = document.getElementById("engine-canvas");

if(canvas){

const ctx = canvas.getContext("2d");

function resizeCanvas(){

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

const nodes=[];

for(let i=0;i<50;i++){

nodes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.5,
vy:(Math.random()-0.5)*0.5

});

}


function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<nodes.length;i++){

let n=nodes[i];

n.x+=n.vx;
n.y+=n.vy;

if(n.x<0 || n.x>canvas.width) n.vx*=-1;
if(n.y<0 || n.y>canvas.height) n.vy*=-1;

ctx.beginPath();
ctx.arc(n.x,n.y,3,0,Math.PI*2);
ctx.fillStyle="#5a7cff";
ctx.fill();

for(let j=i+1;j<nodes.length;j++){

let m=nodes[j];

let dx=n.x-m.x;
let dy=n.y-m.y;

let dist=dx*dx+dy*dy;

if(dist<20000){

ctx.beginPath();
ctx.moveTo(n.x,n.y);
ctx.lineTo(m.x,m.y);
ctx.strokeStyle="rgba(90,120,255,0.2)";
ctx.stroke();

}

}

}

requestAnimationFrame(draw);

}

draw();

}

});


/* =========================================================
 EVENT ANIMATION
========================================================= */
const target = new Date("April 28, 2026 18:00:00").getTime();

setInterval(function(){

const now = new Date().getTime();

const distance = target - now;

const days = Math.floor(distance/(1000*60*60*24));
const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
const seconds = Math.floor((distance%(1000*60))/1000);

document.getElementById("days").innerHTML=days;
document.getElementById("hours").innerHTML=hours;
document.getElementById("minutes").innerHTML=minutes;
document.getElementById("seconds").innerHTML=seconds;

},1000);