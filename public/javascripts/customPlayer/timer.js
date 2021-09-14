let startBtn = document.querySelector(".video_timer_start");
let pauseBtn = document.querySelector(".video_timer_pause");

function sleep(sec) {
    return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
    });
}

let PAUSE = false;
pauseBtn.hidden = true;

async function timer() {
    //await sleep(1);
    PAUSE = false;
    let s = document.querySelector(".video_timer").value;

    startBtn.hidden = true;
    pauseBtn.hidden = false;

    let h = 0;
    let m = 0;

    if (!Number(s)){
        let _t = s.toString().split(':');
        
        if(_t.length === 2) {
            if(Number(_t[0]) >= 0 && Number(_t[1]) >= 0) {
                m = Number(_t[0]);
                s = Number(_t[1]);
            }else {
                s = 0;
            }
        }else if(_t.length === 3) {
            if(Number(_t[0]) >= 0 && Number(_t[1]) >= 0 && Number(_t[2]) >= 0) {
                h = Number(_t[0]);
                m = Number(_t[1]);
                s = Number(_t[2]);
            }else {
                s = 0;
            }
        }else {
            s = 0;
        }
    }else {
        h = parseInt(s / 3600);
        m = parseInt((s - h * 3600) / 60);
        s = s % 60;
    }

    while(h >= 0 && m >= 0 && s >= 0 && !PAUSE){
        
        await sleep(1);
        s--;
        if(s < 0) {
            s = 59;
            m--;
        }
        if(m < 0) {
            m = 59;
            h--;
        }
        document.querySelector(".video_timer").value = `${h}:${m}:${s}`;
    }
    if(!PAUSE) {
        startBtn.hidden = false;
        pauseBtn.hidden = true;
        document.querySelector(".video_timer").value = `0:0:0`;
        play_alarm();
    }
    
}

function pause_timer() {
    console.log("pause");
    startBtn.hidden = false;
    pauseBtn.hidden = true;

    PAUSE = true;
}

function play_alarm(){

    player.pauseVideo();
    var w = window.open("./html/popup.html", "a", `alarm shutdown, width=300, height=200`);

    async function repeat_sound(){
        while(true) {
            if(w.closed) {
                player.playVideo();
                break;
            }

            var audio = new Audio('./sound/MP_Blop.mp3');
            audio.play();
    
            await sleep(2);
        }
    }

    repeat_sound();
    
}

