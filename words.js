// words.js
// 👇 위쪽은 '코드 영역' - 건들지 말기!
(function () {
  function buildDB(raw) {
    const db = {};
    const lines = raw.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue; // 빈 줄, 주석 무시

      // 유닛 | 영어 | 한글뜻 | 영어예문 | 한글예문
      const parts = trimmed.split("|");
      if (parts.length < 5) continue;

      const [unit, word, meaning, exampleEn, exampleKo] = parts.map(p => p.trim());
      if (!db[unit]) db[unit] = [];
      db[unit].push({ word, meaning, exampleEn, exampleKo });
    }

    return db;
  }

  // 👇👇👇 여기부터가 '복붙하는 구역'이야 👇👇👇
  // 형식: 유닛|영어|한글뜻|영어예문|한글예문
  const RAW_WORDS = `
1-1|at|~에|I get up at 7 o'clock.|나는 7시 정각에 일어나.
1-1|bat|야구방망이, 박쥐|I have a bat.|나는 야구 방망이를 가지고 있어.
1-1|fat|뚱뚱한, 살찐|a fat cat|뚱뚱한 고양이
1-1|hat|모자|a yellow hat|노란색 모자
1-1|chat|이야기하다, 수다 떨다|I like to chat.|나는 이야기하는 것을 좋아해.
1-1|act|행동하다, 연기하다|act like a kid|아이처럼 행동하다
1-1|fact|사실|a clear fact|분명한 사실
1-1|fan|팬, 선풍기|a big fan|큰 선풍기
1-1|man|남자, 사람|an old man|나이 든 남자
1-1|pants|바지|blue pants|파란색 바지

1-2|map|지도|look at the map|지도를 보다
1-2|cap|모자|a blue cap|파란색 모자
1-2|fun|재미, 재밌는|Have fun.|재미있게 보내.
1-2|run|달리다|run fast|빠르게 달리다
1-2|sad|슬픈|I'm sad.|나는 슬퍼.
1-2|mad|화난|She's mad.|그녀는 화났어.
1-2|glad|기쁜, 반가운|He's glad.|그는 기뻐.
1-2|bag|가방|It’s my bag.|그것은 나의 가방이야.
1-2|pig|돼지|It's a big pig.|그것은 큰 돼지야.
1-2|leg|다리|have four legs|다리 4개

1-3|get|얻다, 사다, (잠에서) 일어나다|get a gift|선물을 받다
1-3|net|그물|a fishing net|낚시 그물
1-3|set|두다, 설정하다|set the table|상을 차리다
1-3|pet|반려동물|cute pets|귀여운 반려동물
1-3|wet|젖은|a wet towel|젖은 수건
1-3|let's|~하자|Let's go.|가자.
1-3|upset|속상한, 짜증 난|She's upset.|그녀는 속상해.
1-3|pen|펜|a black pen|검은색 펜
1-3|bed|침대|Time for bed.|잘 시간이야.
1-3|bedroom|침실|three bedrooms|침실 3개

1-4|bell|벨, 종|ring the bell|종을 울리다
1-4|sell|팔다|It sells cards.|그곳은 카드를 팔아.
1-4|tell|말하다|tell a story|이야기를 들려주다
1-4|well|잘, 건강한, 우물|very well|매우 잘
1-4|cello|(악기) 첼로|play the cello|첼로를 연주하다.
1-4|hello|안녕|Hello. I'm Jisoo.|안녕. 나는 지수야.
1-4|in|~안에|in the box|상자 안에
1-4|pin|핀|a hair pin|머리핀
1-4|win|이기다|win the prize|상을 타다.
1-4|twin|쌍둥이|cute twins|귀여운 쌍둥이

1-5|ill|아픈|He feels ill.|그는 아파해요.
1-5|bill|지폐, 청구서|coins and bills|동전과 지폐
1-5|hill|언덕|on the hill|언덕 위에
1-5|kill|죽이다|kill a bug|벌레를 죽이다.
1-5|fill|채우다|fill up|~을 가득 채우다
1-5|film|영화|I love this film.|나는 이 영화를 좋아해.
1-5|hit|때리다|hit the ball|공을 때리다
1-5|sit|앉다|sit down|앉다
1-5|up|위로|up and down|위로 아래로
1-5|cup|컵|It’s a cup.|그것은 컵이야.

1-6|but|그러나|It's small but I like it.|그것은 작지만 나는 그것이 좋아.
1-6|cut|자르다|cut the paper|종이를 자르다
1-6|shut|닫다|shut the door|문을 닫다
1-6|bug|벌레|a ladybug|무당벌레
1-6|plan|계획, 계획하다|the next plan|다음 계획
1-6|plant|식물, 심다|plant a flower|꽃을 심다
1-6|dish|접시, 요리, 반찬|a clean dish|깨끗한 접시
1-6|wish|바라다, 소원|make a wish|소원을 빌다
1-6|cash|현금|by cash|현금으로
1-6|gas|가스, 기체|gas station|주유소

1-7|and|그리고, ~와|apples and grapes.|사과와 포도
1-7|band|밴드, 악단|The band plays music.|밴드가 음악을 연주해.
1-7|hand|손|a right hand|오른손
1-7|sand|모래|a sandcastle|모래성
1-7|land|땅, 육지|the land and the sea|육지와 바다
1-7|gum|껌|bubble gum|풍선껌
1-7|album|앨범|an old album|오래된 앨범
1-7|drum|드럼|play the drums|드럼을 치다
1-7|camp|캠프(지), 캠핑하다|go camping|캠핑 가다
1-7|lamp|램프|They're lamps.|그것들은 전등이야.

1-8|back|등, 뒤로, 제자리로|Come back.|돌아와.
1-8|black|검은(색)|a black cat|검은색 고양이
1-8|rock|바위|rocks and stones|바위들과 돌멩이들
1-8|lock|잠그다, 자물쇠|lock the door|그 문을 잠그다
1-8|block|막다, 블록|two blocks|2개의 블록
1-8|clock|벽시계|a clock and a watch|벽시계와 손목시계
1-8|o'clock|~시|at 10 o'clock|10시에
1-8|luck|행운|Good luck.|행운을 빌어.
1-8|kick|차다|kick the ball|공을 차다
1-8|sick|아픈|sick children|아픈 아이들

1-9|pick|고르다, 줍다|pick up trash|쓰레기를 줍다
1-9|thick|두꺼운|thick paper|두꺼운 종이
1-9|truck|트럭|a toy truck|하나의 장난감 트럭
1-9|track|선로, 자국|long train track|긴 기차선로
1-9|neck|목|a long neck|긴 목
1-9|check|확인하다|Check the box.|박스를 확인하다
1-9|quick|빠른|a quick rabbit|빠른 토끼
1-9|quiz|퀴즈|quiz time|퀴즈 시간
1-9|fast|빠른, 빨리|run fast|빠르게 달리다
1-9|last|지난, 마지막의|last summer|지난여름

1-10|bank|은행|Where is the bank?|은행이 어디에 있어?
1-10|sink|싱크대, 가라앉다|in the bathroom|욕실에
1-10|pink|분홍색(의)|a pink pig|분홍색 돼지
1-10|milk|우유|chocolate milk|초콜릿 우유
1-10|wing|날개|four wings|날개 네 개
1-10|swing|그네, 흔들리다|I like to swing.|나는 그네 타기를 좋아한다.
1-10|swim|수영하다|I can swim.|나는 수영을 할 수 있다.
1-10|gift|선물|a small gift|작은 선물
1-10|left|왼쪽(의)|on your left|너의 왼쪽에
1-10|soft|부드러운|soft bread|부드러운 빵
  `;
  // 👆 여기까지가 네가 앞으로 수정·추가할 영역

  // 파싱해서 전역 객체에 올리기
  window.WORD_DB = buildDB(RAW_WORDS);
})();