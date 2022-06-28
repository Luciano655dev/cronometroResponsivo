/* Timer normal */
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
        timerTxt.innerHTML = `${String(hrs).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`
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

/* Histórico do timer */
let counter = document.getElementById('historicMain').childElementCount-1

function mark(){
    counter++

    // Div config
    let div = document.createElement('div')
    div.classList.add('markDiv')
    div.id = `mark${String(counter).padStart(2, '0')}`
    document.getElementById('historicMain').appendChild(div)

    // Text Config
    let text = document.createElement('p')
    text.innerHTML = `${String(counter).padStart(2, '0')} -> ${String(hrs).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`
    document.getElementById(`mark${String(counter).padStart(2, '0')}`).appendChild(text)

    // Delete Button Config
    let deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.onclick = ()=>{
        div.classList.add('markDivDelete')
        setTimeout(()=>{
            deleteBtn.parentElement.remove()
            if((document.getElementById('historicMain').childElementCount) == 1){ counter=0 }
        }, 300)

    }
    document.getElementById(`mark${String(counter).padStart(2, '0')}`).appendChild(deleteBtn)
}

function resetMark(){
    counter = 0
    document.getElementById('historicMain').innerHTML='<button class="resetMarkBtn" onclick="resetMark()">Reset</button>'
}