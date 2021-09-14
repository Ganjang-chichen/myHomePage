var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let MODE = "rotate";
let CURRENT_IDX = 0;
let ISCHANGING = false;

var player;

let RANDCHECK = document.querySelector('.video_rand');
RANDCHECK.addEventListener('click', (e) => {
    
    if(RANDCHECK.checked){
        MODE = 'rand';
    }else {
        MODE = 'rotate';
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    //event.target.playVideo();
}

function onPlayerStateChange(event) {

    if(event.data === 0 && MODE === "rotate" && !ISCHANGING){
        ISCHANGING = true;
        CURRENT_IDX++;
        if(CURRENT_IDX > playList.playList.length - 1) {
            CURRENT_IDX = 0;
        }
        setTimeout((e) => {
            start_play();
        }, 500)
        setTimeout((e) => {
            ISCHANGING = false;
        }, 2000);
    }
    if(event.data === 0 && MODE === "rand" && !ISCHANGING){
        ISCHANGING = true;
        CURRENT_IDX = getRandomInt(0, playList.playList.length);
        setTimeout((e) => {
            start_play();
        }, 500)
        setTimeout((e) => {
            ISCHANGING = false;
        }, 2000);
    }
}

async function change_video(id, start, end) {
  
    if(end < 0) {
        await player.loadVideoById({'videoId': id,
               'startSeconds': start,
               'suggestedQuality': 'large'});
    }else {
        await player.loadVideoById({'videoId': id,
               'startSeconds': start,
               'endSeconds': end,
               'suggestedQuality': 'large'});
    }
}

function start_play() {
    
    playList = mk_playlist_data();
    change_video(playList.playList[CURRENT_IDX].id, playList.playList[CURRENT_IDX].start, playList.playList[CURRENT_IDX].end);
    let ques = document.querySelectorAll(".video_que");
    for(let i = 0; i < ques.length; i++) {
        ques[i].classList.remove("video_playing");

        if(i === CURRENT_IDX) {
            ques[i].classList.add("video_playing");
        }
    }
}
