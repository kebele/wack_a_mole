//1
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const daisies = document.querySelectorAll('.daisy');
let lastHole;

//6 ses
let punch = new Audio();
punch.src ="PUNCH.wav";
let slap = new Audio();
slap.src ="slap.wav";

//5
let timeUp = false;
//6
let score = 0;

//2
function randomTime (min, max){
    return Math.round(Math.random() * (max-min) + min);
}
// console.log(randTime(20, 2000));

//3
function randomHole(holes){
    //console.log(holes.length);
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    //4
    if( hole === lastHole){
        //console.log("aynı delik çıktı");
        randomHole(holes);
    }
    //console.log(hole);
    //random hole seçer ama üst üste aynısını d seçer bunun için 4. adım
    //4
    lastHole = hole;
    return hole;
}

function peep(){
    const time = randomTime(400, 1000);
    const hole = randomHole(holes);
    let ihtimal = Math.floor(Math.random() * 2);
    //console.log(time, hole);
    //console.log(ihtimal);

    if(ihtimal == 0){
        hole.classList.add('up');
    setTimeout(()=>{
        hole.classList.remove('up');
        //5 time up true olduğunda duracak
        if(!timeUp) peep();
    }, time);
    } else {        
        hole.classList.add('yuk');
    setTimeout(()=>{
        hole.classList.remove('yuk');
        //5 time up true olduğunda duracak
        if(!timeUp) peep();
    }, time);
    }
    
} 

function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(()=> timeUp = true, 45000);
}

function bonk_mole(e){
    //console.log(e.target);
    if(!e.target) return; // hileci seni
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
    punch.play();
}

function bonk_daisy(e){
    //console.log(e.target);
    if(!e.target) return; // hileci seni
    score--;
    this.classList.remove('yuk');
    scoreBoard.textContent = score;
    slap.play();
}


/* şu anda hem click hemde mouse aktif, cepten oynama için sadece touchstart olursa daha iyi yoks abazı tıklamalarda iki sefer tıklanmış sayıyor, hem click hem touchstart */
moles.forEach(x => x.addEventListener('click', bonk_mole));
moles.forEach(x => x.addEventListener('touchstart', bonk_mole));
daisies.forEach(x => x.addEventListener('click', bonk_daisy));
daisies.forEach(x => x.addEventListener('touchstart', bonk_daisy));