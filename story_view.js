// ==========================================
// 1. Supabase 설정
// ==========================================
const SUPABASE_URL = 'https://otygcwbxbbtsnuvhwcqt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90eWdjd2J4YmJ0c251dmh3Y3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODQ0NjcsImV4cCI6MjA3OTc2MDQ2N30.ck2UU7v2SfxXD8snUrpyek9Q6PbCjR76NWfdoEHn2Lg';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 상태 변수
let state = {
    data: null,
    currentPage: 0,
    totalPages: 0,
    processedData: {}
};

// ==========================================
// 2. 초기화 및 DB 로드
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); // URL에서 ?id=1 가져옴

    if (!id) {
        alert("잘못된 접근입니다.");
        return;
    }

    await fetchFromSupabase(id);
});

async function fetchFromSupabase(id) {
    try {
        // ★ Supabase DB에서 데이터 가져오기 ★
        const { data, error } = await supabase
            .from('stories')
            .select('*')
            .eq('sort_order', id)
            .single();

        if (error || !data) {
            console.error(error);
            alert("DB에서 데이터를 불러오지 못했습니다. (관리자에게 문의하세요)");
            return;
        }

        // 데이터 가공
        const images = data.page_images ? data.page_images.split(',').map(s=>s.trim()) : [data.thumbnail_url];
        const texts = data.content ? data.content.split('|||').map(s=>s.trim()) : [];
        
        let words = [];
        if (data.words) {
             // DB에 저장된 단어 가져오기 (콤마 또는 배열)
             words = typeof data.words === 'string' ? data.words.split(',').map(w=>w.trim()) : data.words;
        }

        // 제목 중복 방지 (Story 1. Story 1... 제거)
        let cleanTitle = data.title;
        if (!cleanTitle.toLowerCase().startsWith('story')) {
            cleanTitle = `Story ${data.sort_order}. ${cleanTitle}`;
        }

        state.processedData = {
            title: cleanTitle,
            images: images,
            texts: texts,
            words: words,
            audioUrl: data.audio_url
        };

        state.totalPages = 1 + Math.max(images.length, texts.length);
        
        // 오디오 설정
        if(state.processedData.audioUrl) {
            document.getElementById('bg-audio').src = state.processedData.audioUrl;
        }

        renderView();

    } catch (e) {
        console.error(e);
        alert("오류가 발생했습니다.");
    }
}

// ==========================================
// 3. 화면 렌더링
// ==========================================
function renderView() {
    const { currentPage, totalPages, processedData } = state;

    // 제목
    document.getElementById('title-el').innerText = processedData.title;
    document.getElementById('page-el').innerText = `Page ${currentPage + 1} / ${totalPages}`;

    // 전체 듣기 버튼 (0페이지 & 오디오 있을 때만)
    const audioBtn = document.getElementById('audio-btn-el');
    if (currentPage === 0 && processedData.audioUrl) {
        audioBtn.classList.add('active');
    } else {
        audioBtn.classList.remove('active');
    }

    // 네비게이션 버튼
    document.getElementById('prev-btn').disabled = (currentPage === 0);
    const nextBtn = document.getElementById('next-btn');
    if (currentPage === totalPages - 1) {
        nextBtn.innerText = "Finish";
        nextBtn.onclick = () => {
             alert("참 잘했어요!");
             history.back(); // 목록으로
        };
    } else {
        nextBtn.innerText = "Next";
        nextBtn.onclick = () => movePage(1);
    }

    // 내용 교체
    const imgEl = document.getElementById('img-el');
    const contentBox = document.getElementById('dynamic-content');

    // 이미지
    const imgIndex = currentPage === 0 ? 0 : currentPage - 1;
    // DB에 이미지 주소가 있으면 넣고, 없으면 빈칸
    imgEl.src = processedData.images[imgIndex] || processedData.images[0] || '';
    imgEl.onerror = function() { 
        // 이미지가 깨지거나 없을 때 대체 이미지
        this.src = 'https://via.placeholder.com/600x400?text=No+Image'; 
    };

    if (currentPage === 0) {
        // [단어장]
        if (!processedData.words || processedData.words.length === 0) {
            contentBox.innerHTML = '<div style="color:#999;">단어가 없습니다.</div>';
        } else {
            let html = '<div class="mode-word-grid">';
            processedData.words.forEach(word => {
                html += `<div class="word-card" onclick="playWordSound('${word}')">${word}</div>`;
            });
            html += '</div>';
            contentBox.innerHTML = html;
        }
    } else {
        // [문장]
        const sentence = processedData.texts[currentPage - 1] || "...";
        contentBox.innerHTML = `<div class="mode-sentence">${sentence}</div>`;
    }
}

// ==========================================
// 4. 기능 함수들
// ==========================================
function movePage(step) {
    const next = state.currentPage + step;
    if (next >= 0 && next < state.totalPages) {
        state.currentPage = next;
        renderView();
    }
}

function toggleFullAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('audio-btn-el');
    
    if (!state.processedData.audioUrl) return;

    if (audio.paused) {
        audio.play();
        btn.innerHTML = "⏸ 듣기 중단";
        btn.classList.add('playing');
    } else {
        audio.pause();
        btn.innerHTML = "🔊 전체 듣기";
        btn.classList.remove('playing');
    }
}

function playWordSound(word) {
    const cleanWord = word.trim().toLowerCase();
    // 로컬 audio 폴더에서 재생
    new Audio(`audio/${cleanWord}.mp3`).play().catch(e => console.log('단어 음원 없음'));
}

// Home 버튼 클릭 시 이동할 경로
function goHome() {
    // 메인 목록 페이지 파일명이 story_list.html 이라고 가정
    window.location.href = 'story_list.html';
}
