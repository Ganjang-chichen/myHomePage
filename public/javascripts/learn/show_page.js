const titles = document.querySelector(".learn_titles");
const subtitles = document.querySelector(".learn_subtitles");
const pages = document.querySelector(".learn_page");
const page_num = document.querySelector(".learn_nextpage_num");
const modify_data = document.querySelector('.learn_input');
let MAX_page_num = 0;

function IsNotNone(value) {
    if(value === undefined || value === null || value === "") {
        return false;
    }else {
        return true;
    }
}

// 상위 과목 html 생성
function create_title(title) {
  let html = `
                <div class="learn_title" onclick="add_subtitle('${title}');">${title}</div>
            `;
  return html;
}

// 과목 목차 html 생성
function create_subtitle(title, subtitle) {
  let html = `
                <div class="learn_subtitle" onclick="open_page('${title}','${subtitle}');">${subtitle}</div>
            `;
  return html;
}

// 상세 내용 표시
function open_page(title, subtitle, page) {
  let keys = Object.keys(parseData[title]);

  if (subtitle === undefined || subtitle === null || subtitle === "") {
    subtitle = keys[0];
  }

  if (page === undefined || page === null || page === "") {
    page = 0;
  }

  CURRENT_TITLE = title;
  CURRENT_SUBTITLE = subtitle;
  CURRENT_PAGENUM = page;

  pages.innerHTML = `
            <div>${parseData[title][subtitle]["post"][page]["info"]}</div>
            `.replaceAll("\n", `<br>`);
  MAX_page_num = parseData[title][subtitle]["post"].length - 1;
  page_num.innerHTML = `${page}/${MAX_page_num}`;
  
  show_selected();
}

// 과목 목차 리스트
function add_subtitle(title, IsBoot) {
    CURRENT_TITLE = title;
    let keys = Object.keys(parseData[title]);

    let html = "";
  
    for (let i = 0; i < keys.length; i++) {
      html += create_subtitle(title, keys[i]);
    }
  
    subtitles.innerHTML = html;

    if(IsNotNone(CURRENT_TITLE) 
      && IsNotNone(CURRENT_SUBTITLE) 
      && IsNotNone(CURRENT_PAGENUM)
      && IsBoot){
      open_page(CURRENT_TITLE, CURRENT_SUBTITLE, CURRENT_PAGENUM);  
      
    }else {
      open_page(CURRENT_TITLE);  
    }
}

// 상위 과목 리스트
function add_titles() {
  let keys = Object.keys(parseData);
  let html = "";

  for (let i = 0; i < keys.length; i++) {
    html += create_title(keys[i]);
  }

  titles.innerHTML = html;
  if(IsNotNone(CURRENT_TITLE) && IsNotNone(CURRENT_SUBTITLE) && IsNotNone(CURRENT_PAGENUM)){
  }else {
    CURRENT_TITLE = keys[0];
  }
  add_subtitle(CURRENT_TITLE, true);
  
}

add_titles();

function modify_page() {
    
    let html = `
        <form action="/learn/modi_page" method="POST">
            <textarea name="learn_modify" class="learn_modify_text"
            >${parseData[CURRENT_TITLE][CURRENT_SUBTITLE]["post"][CURRENT_PAGENUM]["info"]}</textarea>
            <button type="submit">수정</button>
            <input type="password" name="learn_modify_pw">
            <span>새 페이지</span>
            <input type="checkbox" name="isNew">
            <input class="hidden" name="title" value="${CURRENT_TITLE}">
            <input class="hidden" name="subtitle" value="${CURRENT_SUBTITLE}">
            <input class="hidden" name="page" value="${CURRENT_PAGENUM}">
            
        </form>
    `

    modify_data.innerHTML = html;
}

function modify_IDX() {
    let html = `
        <form action="/learn/modi_IDX" method="POST">
            <input name="learn_modify">
            <button type="submit">수정</button>
            <input type="password" name="learn_modify_pw">
            <span>새 과목</span>
            <input type="radio" name="IDXTYPE" value="새 과목">
            <span>새 목차</span>
            <input type="radio" name="IDXTYPE" value="새 목차" checked>
            <input class="hidden" name="title" value="${CURRENT_TITLE}">
            <input class="hidden" name="subtitle" value="${CURRENT_SUBTITLE}">
            <input class="hidden" name="page" value="${CURRENT_PAGENUM}">
        </form>
    `
    modify_data.innerHTML = html;
}

function mv_page(location) {
    if (location === 0 && CURRENT_PAGENUM > 0) {
        open_page(CURRENT_TITLE, CURRENT_SUBTITLE, CURRENT_PAGENUM -1);
    }else if(location === 1 && CURRENT_PAGENUM < MAX_page_num) {
        open_page(CURRENT_TITLE, CURRENT_SUBTITLE, CURRENT_PAGENUM +1);
    }
}

// 현재 클릭상태 표시
function show_selected() {
  let title_list = document.querySelectorAll(".learn_title");
  let subtitle_list = document.querySelectorAll(".learn_subtitle");

  for(let i = 0; i < title_list.length; i++) {
    if(title_list[i].classList.contains('rotateColor')) {
      title_list[i].classList.remove('rotateColor');
    }
    if(title_list[i].innerText === CURRENT_TITLE) {
      title_list[i].classList.add('rotateColor');
    }
  }

  for(let i = 0; i < subtitle_list.length; i++) {
    if(subtitle_list[i].classList.contains('rotateColor')) {
      subtitle_list[i].classList.remove('rotateColor');
    }
    if(subtitle_list[i].innerText === CURRENT_SUBTITLE) {
      subtitle_list[i].classList.add('rotateColor');
    }
  }
}

show_selected();

function stateprint() {
  console.log(`t : ${CURRENT_TITLE}\ns : ${CURRENT_SUBTITLE}\np : ${CURRENT_PAGENUM}`);
}