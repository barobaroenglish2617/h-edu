// story_view.js

const SUPABASE_URL = 'https://otygcwbxbbtsnuvhwcqt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90eWdjd2J4YmJ0c251dmh3Y3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODQ0NjcsImV4cCI6MjA3OTc2MDQ2N30.ck2UU7v2SfxXD8snUrpyek9Q6PbCjR76NWfdoEHn2Lg';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ Storage 버킷명
const IMAGE_BUCKET = 'image';
const AUDIO_BUCKET = 'audio'; 

/* =========================================================
   ✅ [1] 오디오 파일 이름 명단
   ========================================================= */
const AUDIO_FILENAMES = {
  1: "Story 1 - Made with Clipchamp.mp4",
  2: "Story 2 - Made with Clipchamp.mp4",
  3: "Story 3 - Made with Clipchamp.mp4",
  4: "Story 4 - Made with Clipchamp.mp4",
  5: "Story 5 - Made with Clipchamp.mp4",
  6: "Story 6 - Made with Clipchamp.mp4",
  7: "Story 7 - Made with Clipchamp.mp4",
  8: "Story 8 - Made with Clipchamp.mp4",
  9: "Story 9 - Made with Clipchamp.mp4",
  10: "Story 10 - Made with Clipchamp.mp4",
  11: "Story 11 - Made with Clipchamp.mp4",
  12: "Story 12 - Made with Clipchamp.mp4",
  13: "Story 13 - Made with Clipchamp.mp4",
  14: "Story 14 - Made with Clipchamp.mp4"
};

/* =========================================================
   ✅ [2] 오디오 타임스탬프 (페이지별 시작 시간: 초 단위)
   * 1번 이야기 예시: [0초, 1초, 4초, 9초, 15초, 20초]
   ========================================================= */
const AUDIO_TIMESTAMPS = {
  1: [0, 1, 4, 9, 15, 20], 
  // 나머지는 나중에 시간 재서 채워넣으세요
  2: [0, 0, 0, 0, 0],
  3: [0, 0, 0, 0, 0], 
};

/* =========================================================
   [3] 스토리 제목 리스트
   ========================================================= */
const TITLE_BY_STORY = {
  1: "The sun is up", 2: "Dad's Hat", 3: "The Quick Pet", 4: "The Red Fox", 5: "The Magic Fish",
  6: "The Pink Ring", 7: "Cook the soup", 8: "The cow and the boy", 9: "The Blue Suit",
  10: "The Flying Hamburger", 11: "The Flying Frog", 12: "The Prince and Princess",
  13: "Snake and Snowman", 14: "The Magic Drum"
};

/* =========================================================
   [4] 단어 리스트
   ========================================================= */
const WORDS_BY_STORY = {
  1: ["ant","apple","album","elf","egg","exit","it","ink","igloo","ox","owl","olive","up","upset","bus","bed","bell"],
  2: ["can","cap","cat","dad","duck","desk","fat","fan","fun","get","gum","god","hat","ham","hand","jam","job","jump"],
  3: ["kid","king","kiwi","leg","lip","lamp","mom","map","man","nut","net","not","pen","pet","pig","quiz","quick","queen"],
  4: ["red","run","rain","sad","sit","sun","ten","tent","taxi","van","vet","very","win","wind","wow","six","fox","box"],
  5: ["yes","yell","yummy","zero","zoo","zebra","visit","busy","easy","city","dance","voice","gym","magic","gel","bench","lunch","rich","shop","dish","fish"],
  6: ["thick","thank","math","this","that","they","sick","pick","neck","sell","tell","help","sing","ring","painting","sink","pink","bank"],
  7: ["see","meet","beef","eat","sea","read","book","good","cook","cool","room","moon","nose","close","home","coat","soup","road"],
  8: ["snow","window","rainbow","cow","how","now","oil","join","coin","boy","toy","joy","cake","late","name","mail","tail","brain","say","okay","day"],
  9: ["nice","like","mine","die","pie","lie","fruit","suit","juice","blue","true","glue","use","cute","tube","new","news","newspaper"],
  10: ["by","fry","sky","candy","happy","puppy","teacher","paper","weather","girl","bird","third","nurse","hamburger","Thursday"],
  11: ["black","block","blow","bring","brown","brush","clock","club","cloud","cry","cross","cream","fly","flag","flower","frog","from","front"],
  12: ["glad","glass","glasses","grass","green","grape","plan","plant","plane","prince","princess","prize","slow","slide","sleep","smell","small","smile"],
  13: ["snowman","snack","snake","ski","skirt","skate","spoon","speed","spell","story","street","study","squid","square","squeeze","swim","swing","sweet"],
  14: ["drum","drink","dream","tree","train","trash","pho","phone","photo","laugh","cough","enough","why","when","white"]
};

/* =========================================================
   [5] 페이지 설계도
   ========================================================= */
const PAGE_PLAN_TEXT = `
1-1
단어

1-2 
An ant sits on the egg.
An elf sits on the apple.

1-3
An owl sits on the bus.
An ox sits on the bus.

1-4
The sun is up.
The ant is in bed.

1-5
Bell! It is fun!
The ant is upset.

2-1
단어

2-2
Dad has a hat.
A cat sits on the hat.
A duck sits on the cat.

2-3
Jump! The duck can jump.
Jump! The cat can jump

2-4
The hat is on the bed.
Dad says. "My hat!"

2-5
The fat cat sits on Dad.
It is fun!

3-1
단어

3-2
A kid has a pet pig.
The pig is quick!

3-3
The pig sits on the map.
"Not on my map!" says mom.

3-4
The pig runs. Quick!
The pig jumps on the lamp.
The lamp is on the bed.

3-5
The kid gets a nut.
The pig eats the nut.

4-1
단어

4-2
A red fox sits in a box.
Rain falls.
The fox is sad.

4-3
A vet sits in the tent.
The vet has six cats.
"Wow!" says the fox.

4-4
The cats run.
The fox runs, too.
The fox wins!

4-5
The cats sit in the box now.
The fox is not sad!

5-1
단어

5-2
A zebra visits the zoo.
The zebra sees a magic fish.
The fish sits on a bench.

5-3
The zebra sits on the bench, too.
"Yummy lunch!" says the zebra.

5-4
The magic fish can dance!
"Wow!" says the zebra.

5-5
"It is easy. You can dance, too!" says the magic fish.

6-1
단어

6-2
A man sells rings.
"That is thin." "This is thick!" say Tom and Sally.

6-3
They pick a pink ring.
"Thank you!" says Mom.

6-4
Mom puts the ring on the sink.
"My neck!" says Mom. She is sick!

6-5
The pink ring falls.
They run and help!

7-1
단어

7-2
It is cool.
"My coat!"

7-3
The queen meets a cook.
She gives beef to him.

7-4
The cook sees a fish at the sea.
He goes home.

7-5
He reads a book.
He cooks soup.

7-6
The moon is up.
"Let's eat!" says the queen.

8-1
단어

8-2
A boy looks out the window.
It is snowing.

8-3
A cow has a coin on its tail.
The boy runs to the cow.

8-4
"Hi, I am Cow wow! Join me!" it says.
"Okay." The boy says.

8-5
The cow makes a cake.

8-6
They eat cake.
"Yummy!", they yell.

9-1
단어

9-2
A cute boy needs a new suit.
He has newspaper.

9-3
He cuts the blue suit.
"I will use glue and make my suit," he says.
"This is nice. I like it."

9-4
He gets fruit juice and pie.
"This is mine.“
"Yummy!"

9-5
"Oh no! My pie!" he yells.

10-1
단어

10-2
A girl sits by a teacher.
The teacher has paper and candy.

10-3
"Look at the sky. The weather is nice," says the teacher.
A hamburger is in the sky!

10-4
A happy puppy runs to it.
The hamburger falls.

10-5
The puppy eats the hamburger.
A nurse runs to the puppy.

11-1
단어

11-2
A frog sits by the flower.
The frog is brown.
It has a brush.

11-3
It crosses the blocks.
A black cloud comes. The wind blows.

11-4
The frog sits by the clock.
"I can fly!"
The frog is happy

11-5
A girl is crying.
"Don't cry! Ice cream for you!" says the frog.

11-6
She eats ice cream. 
The girl is happy now

12-1
단어

12-2
A small prince is sleeping.
The sun is up.

12-3
The prince slides down. 
He smiles.

12-4
A princess comes!
"Glad to meet you!" says the princess.

12-5
They make a plane on the green grass.

12-6
The princess gives magic glasses to the prince.
The prince smiles.

13-1
단어

13-2
A snake meets a snowman on the street.
"Hi!" says the snowman.

13-3
"I have a fun story!"
"Thank you!" says the snake.

13-4
"I have a snack."
The snake gives a square lunch box and a spoon.

13-5
They ski and skate.
"This is fun!" says the snake.

13-6
They swim and swing.
"Yes!" says the snowman.

14-1
단어

14-2
A boy has a white drum.
It is a magic drum.

14-3
He hits the drum. Bang!
"Juice!" 
He smiles and drinks it.

14-4
"Train!"
"Wow!" he laughs.

14-5
He hits the drum. Bang!
"Phone!"

14-6
He hits the drum. Bang!
"Tree!"

14-7
"Stop! That is enough!" says Mom.
`.trim();

/* =========================================================
   상태 & 초기화
   ========================================================= */
let bgAudio = null;
let playBtn = null;

let storyId = 0;
let pages = []; 
let currentPage = 0;
let storyAudioUrl = '';

document.addEventListener('DOMContentLoaded', () => {
  bgAudio = document.getElementById('bg-audio');
  playBtn = document.getElementById('header-play-btn');
  init().catch(err => {
    console.error(err);
    alert('오류가 발생했습니다. 콘솔을 확인하세요.');
  });
});

/* =========================================================
   유틸 함수
   ========================================================= */
function norm(s) { return String(s ?? '').replace(/\r/g, '').trim(); }

function escapeHtml(s) {
  return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function getPublicUrl(bucket, path) {
  const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || '';
}

function getImageUrl(storyIdNum, imgNo) {
  return getPublicUrl(IMAGE_BUCKET, `${storyIdNum}-${imgNo}.png`);
}

function getStoryAudioUrl(storyIdNum) {
  const filename = AUDIO_FILENAMES[storyIdNum];
  if (!filename) return '';
  return getPublicUrl(AUDIO_BUCKET, filename);
}

function parsePagePlan(text) {
  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  const out = [];

  for (const block of blocks) {
    const lines = block.split('\n').map(l => norm(l)).filter(Boolean);
    if (!lines.length) continue;

    const head = lines[0];
    const m = head.match(/^(\d+)\s*-\s*(\d+)$/);
    if (!m) continue;

    const sid = Number(m[1]);
    const imgNo = Number(m[2]);
    const body = lines.slice(1);

    if (body.length && body[0] === '단어') {
      out.push({ storyId: sid, imgNo, type: 'words', lines: [] });
    } else {
      out.push({ storyId: sid, imgNo, type: 'text', lines: body });
    }
  }
  return out;
}

/* =========================================================
   init 함수
   ========================================================= */
async function init() {
  const params = new URLSearchParams(window.location.search);
  storyId = Number(params.get('id'));

  if (!storyId) {
    alert('잘못된 접근입니다. (URL에 id가 없음)');
    return;
  }

  const allPages = parsePagePlan(PAGE_PLAN_TEXT);
  pages = allPages.filter(p => p.storyId === storyId);

  if (!pages.length) {
    alert(`PAGE_PLAN_TEXT에서 ${storyId}번 스토리 페이지를 찾지 못했습니다.`);
    return;
  }

  storyAudioUrl = getStoryAudioUrl(storyId);
  if (storyAudioUrl) bgAudio.src = storyAudioUrl;

  renderPage(0);
}

/* =========================================================
   렌더링 함수 (renderPage)
   ========================================================= */
function renderPage(index) {
  currentPage = index;

  const title = TITLE_BY_STORY[storyId] || '';
  const fullTitle = title ? `Story ${storyId}. ${title}` : `Story ${storyId}`;

  document.getElementById('display-title').innerText = fullTitle;
  document.getElementById('page-indicator').innerText = `Page ${currentPage + 1} / ${pages.length}`;

  const page = pages[currentPage];

  // 1. 이미지
  const imgEl = document.getElementById('story-img');
  const imgUrl = getImageUrl(page.storyId, page.imgNo);

  imgEl.onerror = function () {
    this.onerror = null;
    this.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
  };
  imgEl.src = imgUrl;

  // 2. 오디오 버튼 (항상 표시)
  if (storyAudioUrl) {
    playBtn.style.display = 'flex';
  } else {
    playBtn.style.display = 'none';
  }

  // 3. 내용 (단어 or 텍스트)
  const textEl = document.getElementById('text-area');

  if (page.type === 'words') {
    const words = WORDS_BY_STORY[storyId] || [];
    if (!words.length) {
      textEl.innerHTML = `<div class="story-text">단어 목록이 없습니다.</div>`;
    } else {
      let html = '<div class="word-grid">';
      for (const w of words) {
        const safe = String(w).replace(/'/g, "\\'");
        html += `<div class="word-card" onclick="playWordAudio('${safe}')">${escapeHtml(w)}</div>`;
      }
      html += '</div>';
      textEl.innerHTML = html;
    }
  } else {
    const lines = page.lines || [];
    const safeHtml = lines.map(line => escapeHtml(line)).join('<br>');
    textEl.innerHTML = `<div class="story-text">${safeHtml}</div>`;
  }

  // ✅ [핵심 기능] 페이지 바뀔 때 오디오 시간 점프
  const timestamps = AUDIO_TIMESTAMPS[storyId];
  // 시간표가 있고, 현재 페이지에 해당하는 시간이 있다면?
  if (timestamps && timestamps.length > index && bgAudio && storyAudioUrl) {
    // 1. 시간 이동
    bgAudio.currentTime = timestamps[index];
    
    // 2. 재생 중이면 계속 재생
    if (playBtn.classList.contains('playing')) {
      bgAudio.play();
    }
  }

  // 4. 네비게이션 버튼
  document.getElementById('btn-prev').disabled = (currentPage === 0);

  const nextBtn = document.getElementById('btn-next');
  if (currentPage === pages.length - 1) {
    nextBtn.innerText = 'Finish';
    nextBtn.onclick = () => goBack();
  } else {
    nextBtn.innerText = 'Next';
    nextBtn.onclick = () => changePage(1);
  }
}

/* =========================================================
   컨트롤 함수들
   ========================================================= */
function changePage(step) {
  const next = currentPage + step;
  if (next >= 0 && next < pages.length) renderPage(next);
}

function toggleFullAudio() {
  if (!storyAudioUrl) return;

  if (bgAudio.paused) {
    bgAudio.play();
    playBtn.innerHTML = "<span>⏸ Pause Audio</span>";
    playBtn.classList.add('playing');
  } else {
    bgAudio.pause();
    playBtn.innerHTML = "<span>🔊 Story Full Audio</span>";
    playBtn.classList.remove('playing');
  }
}

function playWordAudio(word) {
  const cleanWord = String(word).trim().toLowerCase();
  const audio = new Audio(`audio/${cleanWord}.mp3`);
  audio.play();
}

function restartStory() { renderPage(0); }
function goBack() { history.back(); }
function goHome() { window.location.href = 'index.html'; }

// onclick 전역 등록
window.toggleFullAudio = toggleFullAudio;
window.playWordAudio = playWordAudio;
window.changePage = changePage;
window.restartStory = restartStory;
window.goBack = goBack;
window.goHome = goHome;
