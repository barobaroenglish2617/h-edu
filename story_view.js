// story_view.js (하이브리드 전자책)
// - 제목/단어/문장: JS storiesData
// - 이미지/음원: Supabase Storage (public)

const SUPABASE_URL = 'https://otygcwbxbbtsnuvhwcqt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90eWdjd2J4YmJ0c251dmh3Y3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODQ0NjcsImV4cCI6MjA3OTc2MDQ2N30.ck2UU7v2SfxXD8snUrpyek9Q6PbCjR76NWfdoEHn2Lg';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ 너 Storage 버킷명
const IMAGE_BUCKET = 'image';
const AUDIO_BUCKET = 'audio'; // ✅ 음원 올릴 버킷(예정). 버킷명이 다르면 여기만 수정

/**
 * ==========================================
 * 1) 텍스트 데이터는 JS에 (필수)
 *    + imageCount: 스토리 이미지 장수
 * ==========================================
 */
const storiesData = [
  {
    id: 1,
    title: "The sun is up",
    imageCount: 5, // ✅ Storage에 1-1.png ~ 1-5.png
    words: ["ant","apple","album","elf","egg","exit","it","ink","igloo","ox","owl","olive","up","upset","bus","bed","bell"],
    sentences: ["An ant sits on the egg.","An elf sits on the apple.","An owl sits on the bus.","An ox sits on the bus.","The sun is up.","The ant is in bed.","Bell! It is fun!","The ant is upset."]
  },
  {
    id: 2,
    title: "Dad's Hat",
    imageCount: 5, // ✅ 2-1.png ~ 2-5.png (없으면 장수 맞게 수정)
    words: ["can","cap","cat","dad","duck","desk","fat","fan","fun","get","gum","god","hat","ham","hand","jam","job","jump"],
    sentences: ["Dad has a hat.","A cat sits on the hat.","A duck sits on the cat.","Jump! The duck can jump.","Jump! The cat can jump.","The hat is on the bed.","Dad says. \"My hat!\"","The fat cat sits on Dad.","It is fun!"]
  },
  // ... 나머지 3~14도 동일하게 유지
];

/**
 * ==========================================
 * 2) 상태
 * ==========================================
 */
let state = {
  story: null,
  currentPage: 0,
  totalPages: 0
};

const bgAudio = document.getElementById('bg-audio');
const playBtn = document.getElementById('header-play-btn');

document.addEventListener('DOMContentLoaded', init);

function init() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));

  if (!id) {
    alert("잘못된 접근입니다. (URL id 없음)");
    return;
  }

  const story = storiesData.find(s => s.id === id);
  if (!story) {
    alert(`${id}번 이야기를 찾을 수 없습니다.`);
    return;
  }

  state.story = story;

  // ✅ 페이지 구조:
  // 0페이지 = 단어장(커버 이미지)
  // 1~N = 문장 페이지(각 문장에 해당 이미지)
  state.totalPages = 1 + story.sentences.length;

  renderPage(0);
}

/**
 * ==========================================
 * 3) Supabase Storage public URL 생성
 * ==========================================
 */
function getPublicUrl(bucket, path) {
  const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || '';
}

// ✅ 이미지 파일명 규칙: `${id}-${page}.png`
// page는 1부터 시작 (1-1.png, 1-2.png ...)
function getImagePath(storyId, pageNumber) {
  return `${storyId}-${pageNumber}.png`;
}

// ✅ 스토리 전체 음원 규칙: `story{id}.mp3`
function getStoryAudioPath(storyId) {
  return `story${storyId}.mp3`;
}

// ✅ 단어 음원 규칙: `{word}.mp3` (전부 소문자 추천)
function getWordAudioPath(word) {
  return `${String(word).trim().toLowerCase()}.mp3`;
}

/**
 * ==========================================
 * 4) 렌더링
 * ==========================================
 */
function renderPage(pageIndex) {
  const story = state.story;
  state.currentPage = pageIndex;

  // 제목/페이지 표시
  document.getElementById('display-title').innerText = `Story ${story.id}. ${story.title}`;
  document.getElementById('page-indicator').innerText = `Page ${pageIndex + 1} / ${state.totalPages}`;

  // 오디오 버튼: 0페이지에서만 보이게(원하면 항상 보이게도 가능)
  if (pageIndex === 0) {
    playBtn.style.display = 'flex';
    // ✅ 스토리 전체 음원: Supabase에서 public url
    const storyAudioUrl = getPublicUrl(AUDIO_BUCKET, getStoryAudioPath(story.id));
    bgAudio.src = storyAudioUrl; // 없으면 재생 시 에러(괜찮)
  } else {
    playBtn.style.display = 'none';
    bgAudio.pause();
    playBtn.classList.remove('playing');
    playBtn.innerHTML = `<span>🔊 Story Full Audio</span>`;
  }

  // 이미지: 기본은 pageIndex에 맞춰서 선택
  // - 0페이지(단어장): 1-1.png (커버)
  // - 1페이지(첫 문장): 1-1.png 또는 1-2.png 중 택1
  //   👉 전자책 느낌이면 보통 "문장1 = 이미지1"이 편함
  //   그래서: 문장 페이지도 같은 번호로 매칭(문장1 -> 1-1.png)
  const imgEl = document.getElementById('story-img');

  let imageNumber;
  if (pageIndex === 0) {
    imageNumber = 1; // 커버 = 1-1.png
  } else {
    // 문장1 -> 이미지1, 문장2 -> 이미지2 ...
    // 근데 이미지 장수가 문장보다 적을 수도 있으니 clamp
    imageNumber = Math.min(pageIndex, story.imageCount || pageIndex);
    if (imageNumber < 1) imageNumber = 1;
  }

  const imgUrl = getPublicUrl(IMAGE_BUCKET, getImagePath(story.id, imageNumber));
  imgEl.onerror = function () {
    this.onerror = null;
    this.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
  };
  imgEl.src = imgUrl;

  // 오른쪽 내용(단어장/문장)
  const textEl = document.getElementById('text-area');

  if (pageIndex === 0) {
    // 단어장
    let html = '<div class="word-grid">';
    story.words.forEach(word => {
      const safe = String(word).replace(/'/g, "\\'");
      html += `<div class="word-card" onclick="playWordAudio('${safe}')">${word}</div>`;
    });
    html += '</div>';
    textEl.innerHTML = html;
  } else {
    const sentence = story.sentences[pageIndex - 1] || '...';
    textEl.innerHTML = `<div class="story-text">${sentence}</div>`;
  }

  // 네비 버튼
  document.getElementById('btn-prev').disabled = (pageIndex === 0);

  const nextBtn = document.getElementById('btn-next');
  if (pageIndex === state.totalPages - 1) {
    nextBtn.innerText = "Finish";
    nextBtn.onclick = () => goBack();
  } else {
    nextBtn.innerText = "Next";
    nextBtn.onclick = () => changePage(1);
  }
}

function changePage(step) {
  const next = state.currentPage + step;
  if (next >= 0 && next < state.totalPages) renderPage(next);
}

/**
 * ==========================================
 * 5) 버튼 동작
 * ==========================================
 */
function toggleFullAudio() {
  if (!bgAudio.src) {
    alert("스토리 음원이 아직 없습니다.");
    return;
  }

  if (bgAudio.paused) {
    bgAudio.play().catch(() => alert("오디오 재생 실패(파일/권한 확인)"));
    playBtn.innerHTML = "<span>⏸ Pause Audio</span>";
    playBtn.classList.add('playing');
  } else {
    bgAudio.pause();
    playBtn.innerHTML = "<span>🔊 Story Full Audio</span>";
    playBtn.classList.remove('playing');
  }
}

function playWordAudio(word) {
  // ✅ 단어 음원도 Supabase에서 public url로 재생
  const url = getPublicUrl(AUDIO_BUCKET, getWordAudioPath(word));
  if (!url) return;

  const audio = new Audio(url);
  audio.play().catch(() => console.log('단어 음원 재생 실패:', word));
}

function restartStory() {
  renderPage(0);
}

function goBack() {
  history.back();
}

function goHome() {
  window.location.href = 'index.html';
}

// HTML onclick에서 호출되도록 전역 등록
window.toggleFullAudio = toggleFullAudio;
window.playWordAudio = playWordAudio;
window.changePage = changePage;
window.restartStory = restartStory;
window.goBack = goBack;
window.goHome = goHome;
