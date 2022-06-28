let timerTxt = document.getElementById("timer")
let pauseBtn = document.getElementById("pauseBtn")

let seg=0
let min=0
let hrs=0

let interval

let isPaused=false

function start(segP=0, minP=0, hrsP=0){
    pauseBtn.disabled=false
    isPaused=false
    seg = segP
    min = minP
    hrs = hrsP

    interval = setInterval(()=>{
        seg++
        if(seg>=60){
            seg=0
            min++
        }
        if(min>=60){
            min=0
            hrs++
        }
    
        if(min==3){
            pause()
        }
        timerTxt.innerHTML = `${String(seg).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(hrs).padStart(2, '0')}`
    }, 1000)
}

function stop(){
    pauseBtn.disabled=true
    seg=0
    min=0
    hrs=0
    timerTxt.innerHTML = `00:00:00`
    clearInterval(interval)
}
function pause(){
    if(!isPaused){
        clearInterval(interval)
        isPaused=true
    }else{
        start(seg, min, hrs)
        isPaused=false
    }
}