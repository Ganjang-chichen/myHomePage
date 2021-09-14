
var queBox = document.querySelector(".video_ques");
var playList = {};

queBox.addEventListener('change', (e) => {
    playList = mk_playlist_data();
});

function mk_playlist_data() {
    let ques = queBox.querySelectorAll(".video_que");

    let data = { "playList" : [] };

    for(let i = 0; i < ques.length; i++) {
        let id = ques[i].querySelector(".video_id").value;
        let name = ques[i].querySelector(".video_conf").value;
        let key = id;
        let start = ques[i].querySelector(".video_start").value;
        let end = ques[i].querySelector(".video_end").value;
        
        if(id.includes("https://www.youtube.com/watch?")){
            let keyStart = id.indexOf("v=") + 2;
            let keyEnd = id.indexOf("&", keyStart);
            if(keyEnd < 0) {
                key = id.slice(keyStart);
            }else {
                key = id.slice(keyStart, keyEnd);
            }
            
        }

        if (!Number(start)){
            let _t = start.split(':');
            if(_t.length === 2) {
                if(Number(_t[0]) && Number(_t[1])) {
                    start = Number(_t[0]) * 60 + Number(_t[1]);
                }else {
                    start = 0;
                }
            }else if(_t.length === 3) {
                if(Number(_t[0]) && Number(_t[1]) && Number(_t[2])) {
                    start = Number(_t[0]) * 3600 + Number(_t[1]) * 60 + Number(_t[2]);
                }else {
                    start = 0;
                }
            }else {
                start = 0;
            }
        }

        if (!Number(end)){
            let _t = end.split(':');
            if(_t.length === 2) {
                if(Number(_t[0]) && Number(_t[1])) {
                    end = Number(_t[0]) * 60 + Number(_t[1]);
                }else {
                    end = -1;
                }
            }else if(_t.length === 3) {
                if(Number(_t[0]) && Number(_t[1]) && Number(_t[2])) {
                    end = Number(_t[0]) * 3600 + Number(_t[1]) * 60 + Number(_t[2]);
                }else {
                    end = -1;
                }
            }else {
                end = -1;
            }
        }
        
        let que_data = {
            "id" : key,
            "name" : name,
            "start" : start,
            "end" : end
        }
        data.playList.push(que_data);
    }

    return data;
}

function download_playlist() {
    let temp_a = document.createElement('a');
    temp_a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(playList)));
    temp_a.setAttribute('download', "playList.txt");
    document.body.appendChild(temp_a);
    temp_a.click();
    //document.body.removeChild(temp_a);
}

function new_list(name, id, start, end) {
    if(name === undefined || name === null){
        name = "";
    }
    if(id === undefined || id === null){
        id = "";
    }
    if(start === undefined || start === null){
        start = "";
    }
    if(end === undefined || end === null){
        end = "";
    }

    let temp_que = document.createElement('div');
    
    temp_que.setAttribute("class", "video_que");
    temp_que.innerHTML = `
        <div>
            <div class="video_que_info">
                <div>영상 상세</div>
                <input type="text" class="video_conf" value=${name}>
            </div>
            <div class="video_que_conf">
                <input type="text" class="video_id" placeholder="유튜브 링크" value=${id}>
                <input type="text" class="video_start" placeholder="시작 시간" value=${start}>
                <input type="text" class="video_end" placeholder="종료 시간" value=${end}>
            </div>
        </div>
        <button class="video_que_delete">x</button>
    `

    temp_que.querySelector(".video_que_delete").addEventListener('click', (e) => {
        let p = e.target.parentNode;
        queBox.removeChild(p);
    });

    queBox.appendChild(temp_que);
    resize_addNewBtn();
}

var playList_preset = document.querySelector(".playList_preset");
playList_preset.addEventListener('change', (e) => {
    
    let reader = new FileReader();
    reader.readAsText(e.target.files[0], "UTF-8");

    reader.onload = () => {
        
        data = JSON.parse(reader.result);
        queBox.innerHTML = '';
        for(let i = 0; i < data.playList.length; i++) {
            new_list(
                data.playList[i].name,
                data.playList[i].id,
                data.playList[i].start,
                data.playList[i].end
            );
        }
    };
});

function resize_addNewBtn() {
    let addNewBtn = document.querySelector(".video_add_new");
    addNewBtn.style.width = (document.querySelector(".video_ques").clientWidth - 2) + "px";
}
resize_addNewBtn();
window.addEventListener('resize', (e) => {
    resize_addNewBtn();
});