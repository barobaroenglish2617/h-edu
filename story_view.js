/**
 * ==========================================
 * 1. 이야기 데이터 (14개)
 * ==========================================
 */
const storiesData = [
    {
        id: 1,
        title: "The sun is up",
        image: "images/story1.jpg", 
        words: ["ant", "apple", "album", "elf", "egg", "exit", "it", "ink", "igloo", "ox", "owl", "olive", "up", "upset", "bus", "bed", "bell"],
        sentences: ["An ant sits on the egg.", "An elf sits on the apple.", "An owl sits on the bus.", "An ox sits on the bus.", "The sun is up.", "The ant is in bed.", "Bell! It is fun!", "The ant is upset."]
    },
    {
        id: 2,
        title: "Dad's Hat",
        image: "images/story2.jpg",
        words: ["can", "cap", "cat", "dad", "duck", "desk", "fat", "fan", "fun", "get", "gum", "god", "hat", "ham", "hand", "jam", "job", "jump"],
        sentences: ["Dad has a hat.", "A cat sits on the hat.", "A duck sits on the cat.", "Jump! The duck can jump.", "Jump! The cat can jump.", "The hat is on the bed.", "Dad says. \"My hat!\"", "The fat cat sits on Dad.", "It is fun!"]
    },
    {
        id: 3,
        title: "The Quick Pet",
        image: "images/story3.jpg",
        words: ["kid", "king", "kiwi", "leg", "lip", "lamp", "mom", "map", "man", "nut", "net", "not", "pen", "pet", "pig", "quiz", "quick", "queen"],
        sentences: ["A kid has a pet pig.", "The pig is quick!", "The pig sits on the map.", "\"Not on my map!\" says Mom.", "The pig runs. Quick!", "The pig jumps on the lamp.", "The lamp is on the bed.", "The kid gets a nut.", "The pig eats the nut."]
    },
    {
        id: 4,
        title: "The Red Fox",
        image: "images/story4.jpg",
        words: ["red", "run", "rain", "sad", "sit", "sun", "ten", "tent", "taxi", "van", "vet", "very", "win", "wind", "wow", "six", "fox", "box"],
        sentences: ["A red fox sits in a box.", "Rain falls.", "The fox is sad.", "A vet sits in the tent.", "The vet has six cats.", "\"Wow!\" says the fox.", "The cats run.", "The fox runs, too.", "The fox wins!", "The cats sit in the box now.", "The fox is not sad!"]
    },
    {
        id: 5,
        title: "The Magic Fish",
        image: "images/story5.jpg",
        words: ["yes", "yell", "yummy", "zero", "zoo", "zebra", "visit", "busy", "easy", "city", "dance", "voice", "gym", "magic", "gel", "bench", "lunch", "rich", "shop", "dish", "fish"],
        sentences: ["A zebra visits the zoo.", "The zebra sees a magic fish.", "The fish sits on a bench.", "The zebra sits on the bench, too.", "\"Yummy lunch!\" says the zebra.", "The magic fish can dance!", "\"Wow!\" says the zebra.", "\"It is easy. You can dance, too!\" says the magic fish."]
    },
    {
        id: 6,
        title: "The Pink Ring",
        image: "images/story6.jpg",
        words: ["thick", "thank", "math", "this", "that", "they", "sick", "pick", "neck", "sell", "tell", "help", "sing", "ring", "painting", "sink", "pink", "bank"],
        sentences: ["A man sells rings.", "\"That is thin.\" \"This is thick!\" say Tom and Sally.", "They pick a pink ring.", "\"Thank you!\" says Mom.", "Mom puts the ring on the sink.", "\"My neck!\" says Mom. She is sick!", "The pink ring falls.", "They run and help!"]
    },
    {
        id: 7,
        title: "Cook the soup",
        image: "images/story7.jpg",
        words: ["see", "meet", "beef", "eat", "sea", "read", "book", "good", "cook", "cool", "room", "moon", "nose", "close", "home", "coat", "soup", "road"],
        sentences: ["It is cool.", "\"My coat!\"", "The queen meets a cook.", "She gives beef to him.", "The cook sees a fish at the sea.", "He goes home.", "He reads a book.", "He cooks soup.", "The moon is up.", "\"Let's eat!\" says the queen."]
    },
    {
        id: 8,
        title: "The cow and the boy",
        image: "images/story8.jpg",
        words: ["snow", "window", "rainbow", "cow", "how", "now", "oil", "join", "coin", "boy", "toy", "joy", "cake", "late", "name", "mail", "tail", "brain", "say", "okay", "day"],
        sentences: ["A boy looks out the window.", "It is snowing.", "A cow has a coin on its tail.", "The boy runs to the cow.", "\"Hi, I am Cow wow! Join me!\" it says.", "\"Okay.\" The boy says.", "The cow makes a cake.", "They eat cake.", "\"Yummy!\", they yell."]
    },
    {
        id: 9,
        title: "The Blue Suit",
        image: "images/story9.jpg",
        words: ["nice", "like", "mine", "die", "pie", "lie", "fruit", "suit", "juice", "blue", "true", "glue", "use", "cute", "tube", "new", "news", "newspaper"],
        sentences: ["A cute boy needs a new suit.", "He has newspaper.", "He cuts the blue suit.", "\"I will use glue and make my suit,\" he says.", "\"This is nice. I like it.\"", "He gets fruit juice and pie.", "\"This is mine.\"", "\"Yummy!\"", "\"Oh no! My pie!\" he yells."]
    },
    {
        id: 10,
        title: "The Flying Hamburger",
        image: "images/story10.jpg",
        words: ["by", "fry", "sky", "candy", "happy", "puppy", "teacher", "paper", "weather", "girl", "bird", "third", "nurse", "hamburger", "Thursday"],
        sentences: ["A girl sits by a teacher.", "The teacher has paper and candy.", "\"Look at the sky. The weather is nice,\" says the teacher.", "A hamburger is in the sky!", "A happy puppy runs to it.", "The hamburger falls.", "The puppy eats the hamburger.", "A nurse runs to the puppy."]
    },
    {
        id: 11,
        title: "The Flying Frog",
        image: "images/story11.jpg",
        words: ["black", "block", "blow", "bring", "brown", "brush", "clock", "club", "cloud", "cry", "cross", "cream", "fly", "flag", "flower", "frog", "from", "front"],
        sentences: ["A frog sits by the flower.", "The frog is brown.", "It has a brush.", "It crosses the blocks.", "A black cloud comes. The wind blows.", "The frog sits by the clock.", "\"I can fly!\"", "The frog is happy.", "A girl is crying.", "\"Don't cry! Ice cream for you!\" says the frog.", "The girl is happy.", "She eats ice cream."]
    },
    {
        id: 12,
        title: "The Prince and Princess",
        image: "images/story12.jpg",
        words: ["glad", "glass", "glasses", "grass", "green", "grape", "plan", "plant", "plane", "prince", "princess", "prize", "slow", "slide", "sleep", "smell", "small", "smile"],
        sentences: ["A small prince is sleeping.", "The sun is up.", "The prince slides down. He smiles.", "A princess comes!", "\"Glad to meet you!\" says the princess.", "They make a plane on the green grass.", "The princess gives magic glasses to the prince.", "The prince smiles."]
    },
    {
        id: 13,
        title: "Snake and Snowman",
        image: "images/story13.jpg",
        words: ["snowman", "snack", "snake", "ski", "skirt", "skate", "spoon", "speed", "spell", "story", "street", "study", "squid", "square", "squeeze", "swim", "swing", "sweet"],
        sentences: ["A snake meets a snowman on the street.", "\"Hi!\" says the snowman.", "\"I have a fun story!\"", "\"Thank you!\" says the snake.", "\"I have a snack.\"", "The snake gives a square lunch box and a spoon.", "They ski and skate.", "They swim and swing.", "\"This is fun!\" says the snake.", "\"Yes!\" says the snowman."]
    },
    {
        id: 14,
        title: "The Magic Drum",
        image: "images/story14.jpg",
        words: ["drum", "drink", "dream", "tree", "train", "trash", "pho", "phone", "photo", "laugh", "cough", "enough", "why", "when", "white"],
        sentences: ["A boy has a white drum.", "It is a magic drum.", "He hits the drum. Bang!", "\"Juice!\"", "He smiles and drinks it.", "\"Train!\"", "\"Wow!\" he laughs.", "He hits the drum. Bang!", "\"Phone!\"", "He hits the drum. Bang!", "\"Tree!\"", "\"Stop! That is enough!\" says Mom."]
    }
];

/**
 * ==========================================
 * 2. 작동 로직 (Logic)
 * ==========================================
 */
let state = { data: null, currentPage: 0, totalPages: 0 };

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    if (!id) {
        alert("잘못된 접근입니다. (URL을 확인하세요)");
        return;
    }

    // 데이터 찾기
    const story = storiesData.find(s => s.id === id);
    if (!story) {
        alert(id + "번 이야기를 찾을 수 없습니다.");
        return;
    }

    // 상태 설정
    state.data = story;
    state.totalPages = 1 + story.sentences.length; // 단어장(1) + 문장개수
    render();
});

function render() {
    const { currentPage, totalPages, data } = state;

    // 제목 업데이트
    document.getElementById('title-el').innerText = `Story ${data.id}. ${data.title}`;
    document.getElementById('page-el').innerText = `Page ${currentPage + 1} / ${totalPages}`;

    // 오디오 버튼 (0페이지에서만 보임)
    const audioBtn = document.getElementById('audio-btn-el');
    const bgAudio = document.getElementById('bg-audio');
    
    if (currentPage === 0) {
        audioBtn.classList.add('active');
        bgAudio.src = `audio/story${data.id}.mp3`;
    } else {
        audioBtn.classList.remove('active');
    }

    // 버튼 활성/비활성
    document.getElementById('prev-btn').disabled = currentPage === 0;
    const nextBtn = document.getElementById('next-btn');
    nextBtn.innerText = currentPage === totalPages - 1 ? "Finish" : "Next";
    nextBtn.onclick = currentPage === totalPages - 1 ? () => history.back() : () => movePage(1);

    // 이미지 & 내용 교체
    const imgEl = document.getElementById('img-el');
    const contentBox = document.getElementById('dynamic-content');

    // 이미지 (없으면 에러 처리)
    imgEl.src = data.image;
    imgEl.onerror = function() { this.src = 'https://via.placeholder.com/400?text=Image+Not+Found'; };

    if (currentPage === 0) {
        // [단어장 모드]
        let html = '<div class="mode-word-grid">';
        data.words.forEach(word => {
            html += `<div class="word-card" onclick="playWordSound('${word}')">${word}</div>`;
        });
        html += '</div>';
        contentBox.innerHTML = html;
    } else {
        // [문장 모드]
        const sentence = data.sentences[currentPage - 1];
        contentBox.innerHTML = `<div class="mode-sentence">${sentence}</div>`;
    }
}

function movePage(step) {
    const next = state.currentPage + step;
    if (next >= 0 && next < state.totalPages) {
        state.currentPage = next;
        render();
    }
}

function toggleFullAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('audio-btn-el');
    
    if (audio.paused) {
        audio.play().catch(e => alert("오디오 파일을 찾을 수 없습니다: audio/story" + state.data.id + ".mp3"));
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
    new Audio(`audio/${cleanWord}.mp3`).play().catch(e => console.log('단어 파일 없음'));
}