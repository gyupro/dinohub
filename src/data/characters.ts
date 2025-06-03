export interface Character {
  id: string
  name: string
  nameKorean: string
  scientificName: string
  emoji: string
  image: string
  category: string[]
  origin: string
  catchphrase: string
  description: string
  temporalRange?: string
  detailedDescription?: string
  appearance?: string
  personality?: string[]
  abilities: string[]
  abilitiesDetails?: Array<{ name: string; description: string; icon?: string }>
  memeQuotes?: string[]
  memes?: Array<{ name: string; description: string; relatedImage?: string; exampleVideoUrl?: string }>
  relatedCharacters?: Array<{ id: string; name: string; emoji?: string; image?: string; description?: string }>
  trivia?: string[]
  tags?: string[]
  externalLinks?: Array<{ name: string; url: string; icon?: string }>
  keywords?: string[]
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
  popularity?: number
}

export const characters: Character[] = [
  {
    id: "giovanni-giorgio",
    name: "Giovanni Giorgio",
    nameKorean: "조반니 조르지오",
    scientificName: "Giovanni Giorgio",
    emoji: "🕺🎵",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=G.+Giorgio",
    category: ["밈 캐릭터", "음악 기반", "시간 능력자"],
    origin: "Daft Punk - 'Giorgio by Moroder' (음악) / TikTok 밈",
    catchphrase: "My name is Giovanni Giorgio, but everybody calls me Giorgio.",
    description: "시간을 조작하는 듯한 연출과 함께 등장하는 신비로운 이탈리아 남자. 디스코 음악이 그의 상징이다.",
    detailedDescription: "조반니 조르지오는 다프트 펑크의 명곡 'Giorgio by Moroder'에 삽입된 조르조 모로더의 독백에서 영감을 받아 탄생한 인터넷 밈 캐릭터입니다. 주로 TikTok 등의 짧은 영상 플랫폼에서 해당 음악의 특정 부분과 함께 등장하여, 시간을 멈추거나 특정 행동을 반복하는 등의 초현실적인 연출을 선보입니다. 그는 자신을 '조반니 조르지오'라고 소개하지만, 모두가 그를 간단히 '조르지오'라고 부른다고 말하며 특유의 여유와 카리스마를 발산합니다. 이 캐릭터는 실제 시간 조작 능력보다는 상황과 음악, 그리고 편집의 힘을 빌린 '밈적 허용'에 가까운 연출로 즐거움을 선사합니다.",
    appearance: "1970-80년대 디스코 시대를 연상시키는 화려하고 세련된 정장 차림이 일반적입니다. 종종 나비넥타이나 독특한 패턴의 셔츠를 착용하며, 그의 트레이드마크는 얼굴을 반쯤 가리는 빈티지 선글라스입니다. 전체적으로 신비롭고 자신감 넘치는 분위기를 풍깁니다.",
    keywords: ["giovanni", "giorgio", "시간조작", "time", "disco", "music", "italian", "레트로", "조르지오", "조반니", "tiktok", "daft punk"],
    personality: ["신비로운", "카리스마 넘치는", "여유로운", "자신감 있는", "알 수 없는", "스타일리시한"],
    abilities: ["시간 정지 (연출)", "타임 루프 (연출)", "디스코 음악과의 동기화", "상황 장악력"],
    abilitiesDetails: [
      { name: "시간 정지 (연출)", description: "주변의 시간을 완전히 멈추는 듯한 효과를 연출합니다. 이는 실제 초능력이라기보다는 음악과 편집, 그리고 밈적 상상력이 결합된 결과물입니다." },
      { name: "타임 루프 (연출)", description: "짧은 특정 구간의 시간을 반복하여 보여주는 듯한 연출을 합니다. 이 역시 밈의 재미를 위한 장치입니다." },
      { name: "디스코 음악과의 동기화", description: "등장 시 흘러나오는 디스코 음악, 특히 'Giorgio by Moroder'는 그의 능력 발현 및 캐릭터 정체성의 핵심 요소입니다." },
      { name: "상황 장악력", description: "어떤 상황에 등장하든 특유의 분위기와 대사로 순식간에 모든 이의 시선을 사로잡고 상황을 자신의 페이스로 만듭니다."}
    ],
    memeQuotes: [
      "My name is Giovanni Giorgio, but everybody calls me Giorgio.",
      "When I was 15, 16, when I started really to play the guitar...",
      "And I knew, that could be my life."
    ],
    memes: [
      { name: "조르지오 챌린지 (Giorgio Challenge)", description: "'Giorgio by Moroder' 음악에 맞춰 등장하며 시간을 멈추거나 독특한 행동을 하는 영상을 제작하는 SNS 챌린지입니다.", relatedImage: "https://placehold.co/400x250/3a3a3a/ffffff?text=Giorgio+Challenge+Example" },
      { name: "등장=시간멈춤", description: "그가 화면에 나타나면 주변의 모든 것이 멈춘다는 밈적 공식이 있습니다.", exampleVideoUrl: "https://www.youtube.com/results?search_query=giovanni+giorgio+meme" }
    ],
    relatedCharacters: [
      { id: "daft-punk", name: "Daft Punk", emoji: "🤖🎧", image: "https://placehold.co/100x100/4a4a4a/ffffff?text=Daft+Punk", description: "그의 테마곡을 만든 장본인들." },
      { id: "jojo-dio", name: "DIO (죠죠의 기묘한 모험)", emoji: "🧛⏳", image: "https://placehold.co/100x100/4a4a4a/ffffff?text=DIO", description: "시간 정지 능력의 대표적인 캐릭터." }
    ],
    trivia: [
      "캐릭터의 모티브가 된 실제 조르조 모로더는 이탈리아 출신의 전설적인 음악 프로듀서입니다.",
      "선글라스는 그의 신비주의를 극대화하는 핵심 아이템입니다.",
      "이 밈은 특정 세대에게는 익숙한 디스코 음악과 현대적인 영상 편집 기술이 만나 새로운 재미를 창출한 사례입니다."
    ],
    tags: ["iconic-meme", "time-manipulation-meme", "disco-god", "retro-chic", "tiktok-sensation", "music-inspired"],
    externalLinks: [
      { name: "나무위키: 조르조 모로더", url: "https://namu.wiki/w/%EC%A1%B0%EB%A5%B4%EC%A1%B0%20%EB%AA%A8%EB%A1%9C%EB%8D%94", icon: "🌳" },
      { name: "YouTube: Daft Punk - Giorgio by Moroder", url: "https://www.youtube.com/watch?v=zhl-Cs1-oOk", icon: "▶️" }
    ],
    rarity: "legendary",
    popularity: 99
  },
  {
    id: "peppino-spaghetti",
    name: "Peppino Spaghetti",
    nameKorean: "페피노 스파게티",
    scientificName: "Peppino Spaghetti",
    emoji: "👨‍🍳🍕",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Peppino",
    category: ["게임 캐릭터", "인디 게임", "코믹 호러"],
    origin: "Pizza Tower (게임)",
    catchphrase: "WOAG!",
    description: "피자 가게 'Peppino's Pizza 2'의 사장이자 셰프. 극도의 불안과 스트레스에 시달리지만, 가게를 지키기 위해 분투한다.",
    detailedDescription: "페피노 스파게티는 2023년 출시된 인디 게임 '피자 타워'의 주인공입니다. 그는 빚더미에 앉은 피자 가게를 운영하며, 가게를 철거하려는 Pizzaface의 음모를 막기 위해 수수께끼의 탑을 오르게 됩니다. 페피노는 매우 불안정하고 겁이 많은 성격으로 묘사되지만, 위기의 순간에는 엄청난 속도와 힘을 발휘하여 적들을 물리치고 장애물을 돌파합니다. 그의 모험은 90년대 카툰 스타일의 과장된 애니메이션과 빠른 템포의 게임플레이가 특징이며, 코믹함과 동시에 기괴한 분위기를 자아냅니다.",
    appearance: "전형적인 이탈리아인 셰프의 모습으로, 하얀 요리사 모자와 셔츠, 검은 바지를 입고 있습니다. 얼굴은 항상 불안에 떨거나 잔뜩 화가 난 표정이며, 식은땀을 줄줄 흘리는 모습이 자주 보입니다. 게임 내에서는 다양한 파워업을 통해 일시적으로 모습이 변하기도 합니다. (예: 불타는 모습, 기사 갑옷 등)",
    keywords: ["peppino", "페피노", "spaghetti", "스파게티", "pizza", "피자", "요리사", "chef", "italian", "pizza tower", "woag", "불안", "인디게임"],
    personality: ["극도로 불안정한", "쉽게 패닉하는", "다혈질적인", "예상외의 용감함", "강한 책임감", "스트레스에 취약"],
    abilities: ["마하 런 (Mach Run)", "슈퍼 점프", "벽 기어오르기", "다양한 변신", "적 붙잡고 던지기"],
    abilitiesDetails: [
      { name: "마하 런 (Mach Run)", description: "엄청난 속도로 질주하며 벽을 부수고 적들을 관통합니다. 속도가 붙으면 무적 상태가 되기도 합니다.", icon: "💨" },
      { name: "슈퍼 점프 (Super Jump)", description: "높이 점프하여 장애물을 넘거나, 아래로 강하게 내려찍어 공격할 수 있습니다.", icon: "⬆️" },
      { name: "벽 기어오르기 (Wall Climbing/Crawling)", description: "벽에 붙어 기어오르거나 빠르게 이동할 수 있습니다.", icon: "🧗" },
      { name: "다양한 변신 (Transformations)", description: "게임 내 특정 아이템이나 조건을 통해 일시적으로 다른 모습으로 변신하여 특수한 능력을 사용합니다. (예: Knight Peppino, Ghost Peppino, Firemouth Peppino)", icon: "✨" }
    ],
    memeQuotes: [
      "MAMMA MIA!",
      "It's Pizza Time!",
      "WOAG!",
      "*다양한 비명소리*",
      "You're not P-ranking this one!"
    ],
    memes: [
      { name: "페피노 비명 (Peppino Scream / WOAG)", description: "페피노가 내지르는 특유의 비명이나 감탄사 'WOAG!'는 게임의 상징적인 사운드이자 다양한 리믹스와 밈 영상에 사용됩니다.", relatedImage: "https://placehold.co/400x250/3a3a3a/ffffff?text=Peppino+WOAG!" },
      { name: "불안한 페피노 (Anxious Peppino)", description: "항상 불안에 떨고 스트레스 받는 페피노의 모습이 현대인의 공감을 사며 다양한 상황에 빗대어 사용됩니다.", exampleVideoUrl: "https://www.youtube.com/results?search_query=peppino+spaghetti+anxiety+meme" },
      { name: "Pillar John", description: "페피노와 닮았지만, 사실은 파괴 가능한 오브젝트인 'Pillar John'은 플레이어들에게 혼란과 웃음을 주며 그 자체로 밈이 되었습니다."}
    ],
    relatedCharacters: [
      { id: "gustavo-brick", name: "Gustavo & Brick", emoji: "👨🐀", image: "https://placehold.co/100x100/4a4a4a/ffffff?text=Gustavo", description: "페피노의 조력자. Gustavo는 인간, Brick은 거대한 쥐이다." },
      { id: "noise", name: "The Noise", emoji: "😈📺", image: "https://placehold.co/100x100/4a4a4a/ffffff?text=Noise", description: "페피노의 라이벌이자 시끄러운 악당. Noid에서 영감을 받은 캐릭터." },
      { id: "pizzaface", name: "Pizzaface", emoji: "🍕😠", image: "https://placehold.co/100x100/4a4a4a/ffffff?text=Pizzaface", description: "탑의 주인이자 최종 보스. 떠다니는 거대한 피자 얼굴이다." }
    ],
    trivia: [
      "페피노의 디자인과 게임 스타일은 90년대 니켈로디언 만화, 특히 '렌 & 스팀피 쇼'와 'Wario Land' 시리즈에서 큰 영향을 받았습니다.",
      "그는 심각한 불안 장애와 PTSD를 겪고 있는 것으로 묘사됩니다.",
      "게임 개발 초기에는 지금보다 훨씬 마르고 키가 큰 모습이었다고 합니다.",
      "파인애플 피자를 매우 싫어한다는 설정이 있습니다."
    ],
    tags: ["pizza-tower", "indie-game-hero", "anxious-chef", "high-speed-action", "wario-land-inspired", "cartoon-violence", "italian-rage"],
    externalLinks: [
      { name: "나무위키: Pizza Tower", url: "https://namu.wiki/w/Pizza%20Tower", icon: "🌳" },
      { name: "Steam Store: Pizza Tower", url: "https://store.steampowered.com/app/2231450/Pizza_Tower/", icon: "🎮" },
      { name: "Official Pizza Tower Wiki (Fandom)", url: "https://pizzatower.fandom.com/wiki/Peppino_Spaghetti", icon: "🌐" }
    ],
    rarity: "epic",
    popularity: 97
  },
  {
    id: "vecchio-del-sacco",
    name: "Vecchio del Sacco",
    nameKorean: "베키오 델 사코",
    scientificName: "Vecchio del Sacco",
    emoji: "👴🎒",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Vecchio",
    category: ["도시전설", "미스터리"],
    origin: "이탈리아 도시전설 / 인터넷 밈",
    catchphrase: "Nel sacco ho tutto quello che serve!",
    description: "자루를 들고 다니는 수상한 할아버지. 정체불명의 물건들을 자루에서 꺼내며 사람들을 놀라게 한다.",
    abilities: ["자루 마법", "아이템 소환", "예측 불가능함"],
    personality: ["수상한", "신비로운", "장난꾸러기", "지혜로운"],
    appearance: "낡은 자루를 든 수염 난 할아버지",
    tags: ["urban-legend", "mystery", "bag-of-holding"],
    rarity: "epic",
    popularity: 82
  },
  {
    id: "marcello-mastroianni",
    name: "Marcello Mastroianni",
    nameKorean: "마르첼로 마스트로이아니",
    scientificName: "Marcello Mastroianni",
    emoji: "🕴️🎬",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Marcello",
    category: ["영화 배우", "클래식 시네마", "아이콘"],
    origin: "이탈리아 고전 영화 / 밈",
    catchphrase: "La dolce vita, no?",
    description: "영화 속에서 나온 듯한 클래식 이탈리아 배우. 로마의 거리를 배경으로 낭만적인 대사를 읊조린다.",
    abilities: ["압도적인 연기력", "카리스마적 매력", "로맨틱한 분위기 조성"],
    personality: ["낭만적", "클래식", "우아한", "지적인", "고뇌하는 예술가"],
    appearance: "검은 선글라스와 완벽하게 재단된 수트를 입은 중년 남성. 종종 담배를 들고 있는 모습으로 그려진다.",
    tags: ["italian-cinema", "classic-actor", "la-dolce-vita", "style-icon", "romantic"],
    rarity: "legendary",
    popularity: 94
  },
  {
    id: "antonio-margherita",
    name: "Antonio Margherita",
    nameKorean: "안토니오 마르게리타",
    scientificName: "Antonio Margherita",
    emoji: "👨‍🍳🍕",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Antonio",
    category: ["음식 밈", "셰프", "전통주의자"],
    origin: "피자 역사 관련 밈 / 가상 캐릭터",
    catchphrase: "La vera pizza è Margherita!",
    description: "피자 마르게리타를 발명했다고 주장하는 자칭 피자 마스터. 토마토와 모차렐라에 대한 순수한 열정을 보인다.",
    abilities: ["정통 피자 만들기", "최고급 재료 감별", "피자 도우 돌리기 장인"],
    personality: ["열정적인", "자부심 강한", "전통을 중시하는", "약간의 고집"],
    appearance: "빨간색 또는 이탈리아 국기색 앞치마를 두른 푸근한 인상의 피자 셰프.",
    tags: ["pizza-master", "margherita-lover", "traditional-cuisine", "food-meme", "italian-chef"],
    rarity: "epic",
    popularity: 86
  },
  {
    id: "gino-dacampo",
    name: "Gino D'Acampo",
    nameKorean: "지노 다캄포",
    scientificName: "Gino D'Acampo",
    emoji: "👨‍🍳😄",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Gino",
    category: ["방송인", "셰프", "코미디언"],
    origin: "영국 TV쇼 / 인터넷 밈",
    catchphrase: "If my grandmother had wheels, she would have been a bike!",
    description: "영국 TV에서 활동하는 유쾌한 이탈리아인 셰프. 특유의 과장된 몸짓과 발언으로 웃음을 자아낸다.",
    abilities: ["이탈리아 요리 시연", "예능감 넘치는 입담", "긍정 에너지 발산"],
    personality: ["유머러스한", "과장된 제스처", "열정적인", "낙천적인", "가족을 사랑하는"],
    appearance: "깔끔한 셰프 복장 또는 캐주얼한 복장. 항상 밝고 익살스러운 표정을 짓는다.",
    tags: ["celebrity-chef", "tv-personality", "italian-humor", "cooking-show", "funny-quotes"],
    rarity: "rare",
    popularity: 90
  },
  {
    id: "ezio-auditore",
    name: "Ezio Auditore da Firenze",
    nameKorean: "에지오 아우디토레 다 피렌체",
    scientificName: "Ezio Auditore da Firenze",
    emoji: "🗡️🦅",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Ezio",
    category: ["게임 캐릭터", "역사 판타지", "암살자"],
    origin: "Assassin's Creed (게임 시리즈)",
    catchphrase: "Requiescat in pace.",
    description: "르네상스 시대 이탈리아의 귀족 출신 암살자. 가족의 복수를 위해 시작된 그의 여정은 자유와 정의를 위한 투쟁으로 이어진다.",
    abilities: ["뛰어난 암살 기술", "프리러닝 (파쿠르)", "이글 비전", "다양한 무기 사용"],
    personality: ["카리스마 있는", "정의로운", "복수심에 불타는 (초기)", "성장하는 영웅", "냉철한 판단력"],
    appearance: "특유의 흰색 암살자 후드와 복장. 시간이 지남에 따라 복장이 변화한다.",
    tags: ["assassins-creed", "renaissance-italy", "master-assassin", "freedom-fighter", "video-game-icon"],
    rarity: "legendary",
    popularity: 96
  },
  {
    id: "mario-mario",
    name: "Mario Mario",
    nameKorean: "마리오 마리오",
    scientificName: "Mario Mario",
    emoji: "🍄👨‍🔧",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Mario",
    category: ["게임 캐릭터", "플랫포머", "닌텐도 아이콘"],
    origin: "Super Mario Bros. (게임 시리즈)",
    catchphrase: "It's-a me, Mario!",
    description: "세계에서 가장 유명한 이탈리아인 배관공. 쿠파에게 납치된 피치 공주를 구하기 위해 버섯 왕국을 모험한다.",
    abilities: ["뛰어난 점프 실력", "다양한 파워업 (슈퍼버섯, 파이어플라워 등)", "운동 신경", "배관 수리(?)"],
    personality: ["용감한", "낙천적인", "정의로운", "끈기 있는", "모험을 즐기는"],
    appearance: "빨간 모자와 파란 멜빵바지, 갈색 구두, 흰 장갑, 그리고 인상적인 콧수염.",
    tags: ["nintendo-mascot", "super-mario", "platform-hero", "gaming-legend", "italian-plumber"],
    rarity: "mythic",
    popularity: 100
  },
  {
    id: "luigi-mario",
    name: "Luigi Mario",
    nameKorean: "루이지 마리오",
    scientificName: "Luigi Mario",
    emoji: "👻💚",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Luigi",
    category: ["게임 캐릭터", "플랫포머", "영원한 2인자"],
    origin: "Super Mario Bros. (게임 시리즈)",
    catchphrase: "Okie dokie!",
    description: "마리오의 쌍둥이 동생. 형보다 키가 크고 점프력이 높지만, 겁이 많고 소심한 성격이다. 유령을 매우 무서워한다.",
    abilities: ["높은 점프 (Slippery Jump)", "유령 퇴치 (폴터가이스트)", "때로는 형보다 나은 능력"],
    personality: ["겁 많은", "소심한", "충성스러운", "은근히 질투심 있는", "마음씨 착한"],
    appearance: "초록 모자와 파란 멜빵바지 (또는 초록 셔츠). 형과 비슷하지만 더 마른 체형.",
    tags: ["nintendo", "luigis-mansion", "eternal-sidekick", "green-hero", "ghostbuster"],
    rarity: "legendary",
    popularity: 93
  },
  {
    id: "salvatore-ganacci",
    name: "Salvatore Ganacci",
    nameKorean: "살바토레 가나치",
    scientificName: "Salvatore Ganacci",
    emoji: "🎧🕺🤪",
    image: "https://placehold.co/350x500/2a2a2a/ffffff?text=Salvatore",
    category: ["DJ/프로듀서", "음악 퍼포머", "인터넷 밈"],
    origin: "음악 페스티벌 퍼포먼스 / 뮤직비디오",
    catchphrase: "*기괴한 춤과 사운드*",
    description: "보스니아계 스웨덴인 DJ이자 음악 프로듀서. 독특하고 기괴한 무대 퍼포먼스와 뮤직비디오로 유명하며, 그 자체가 하나의 밈이 되었다.",
    abilities: ["DJing", "음악 프로듀싱", "예측불허의 퍼포먼스", "관객 조련"],
    personality: ["기괴한", "유머러스한 (블랙코미디)", "예술적인", "자유분방한", "도발적인"],
    appearance: "다양하고 실험적인 패션. 때로는 우스꽝스러운 가발이나 의상을 착용한다.",
    tags: ["dj-life", "performance-art", "absurdist-humor", "electronic-music", "viral-sensation"],
    rarity: "epic",
    popularity: 88
  }
]

// NLP 검색을 위한 유틸리티 함수들
export function calculateSimilarity(query: string, text: string): number {
  const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 0);
  const textWords = text.toLowerCase().split(' ');
  
  let score = 0;
  for (const queryWord of queryWords) {
    for (const textWord of textWords) {
      if (textWord.includes(queryWord) || queryWord.includes(textWord)) {
        score += 1;
      }
      if (textWord.length > 2 && queryWord.length > 2) {
        const similarity = getEditDistance(queryWord, textWord);
        if (similarity > 0.7) {
          score += similarity * 0.5;
        }
      }
    }
  }
  return queryWords.length > 0 ? score / queryWords.length : 0;
}

function getEditDistance(a: string, b: string): number {
  if (a.length === 0) return b.length; 
  if (b.length === 0) return a.length;

  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 1;
  return 1 - matrix[a.length][b.length] / maxLength;
}

export function searchCharacters(query: string): Character[] {
  if (!query.trim()) {
    return characters;
  }
  
  const results = characters.map(character => {
    const searchableText = [
      character.name,
      character.nameKorean,
      character.scientificName,
      character.description,
      character.detailedDescription || '',
      character.origin,
      character.catchphrase,
      ...(character.keywords || []),
      ...character.category,
      ...(character.personality || []),
      ...(character.abilities || []),
      ...(character.abilitiesDetails?.map(ad => `${ad.name} ${ad.description}`) || []),
      ...(character.memeQuotes || []),
      ...(character.memes?.map(m => `${m.name} ${m.description}`) || []),
      ...(character.trivia || []),
      ...(character.tags || [])
    ].join(' ').toLowerCase();
    
    return {
      character,
      score: calculateSimilarity(query, searchableText)
    };
  });
  
  return results
    .filter(result => result.score > 0.2)
    .sort((a, b) => b.score - a.score)
    .map(result => result.character);
}

export function getCharactersByCategory(category: string): Character[] {
  if (category === 'all') return characters;
  return characters.filter(char => char.category.includes(category));
}

export function getRandomCharacters(count: number = 4): Character[] {
  const shuffled = [...characters].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
} 