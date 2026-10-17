import { PROFILE } from "./config";

export const apps = [
  { name: "Lottomate", path: "lottomate", desc: "로또 번호 관리, 당첨 확인, 통계, 당첨 푸시 알림. 종이 티켓 느낌의 Paper 컴포넌트로 화면을 통일했습니다.", chips: ["Compose", "Room", "FCM"], live: true },
  { name: "Lunar", path: "lunar", desc: "달 위상 대시보드와 달력, 달 이벤트 알림.", chips: ["Compose", "FCM"], live: true },
  { name: "QRScanner (Q-Ring)", path: "qrscanner", desc: "QR 다중 스캔, 생성, 이력 관리.", chips: ["Compose"] },
  { name: "Diding", path: "diding", desc: "알람 기반 TODO·일정 관리.", chips: ["Compose"] },
  { name: "Moduta", path: "moduta", desc: "서울시 버스 실시간 정보와 지도.", chips: ["Compose"] },
  { name: "Fxrate", path: "fxrate", desc: "환율 조회와 임계값 알림, 홈 위젯.", chips: ["Compose"] },
].map((a) => ({ ...a, url: `${PROFILE.docsRepo}/tree/main/apps/${a.path}` }));

export const stats = [
  { num: "5년+", label: "모바일 앱 개발 경력" },
  { num: "6개", label: "직접 만든 Android 앱" },
  { num: "135개", label: "Gradle 모듈 (모노레포)" },
  { num: "KMP", label: "AOS · iOS 공통 모듈 개발" },
];

export const lemon = {
  company: "레몬헬스케어",
  period: "2025.07 - 현재",
  items: [
    {
      title: "의료진용 업무 앱",
      meta: "Android · iOS · 사내 전용(스토어 미공개)",
      desc: "의료진이 업무에 쓰는 내부 앱을 KMP로 개발하고 운영합니다. Android와 iOS를 모두 담당합니다.",
      chips: ["KMP", "Kotlin", "Compose"],
    },
    {
      title: "환자용 앱 KMP 고도화",
      meta: "Android · iOS · 스토어 출시",
      desc: "계약 병원을 방문하는 환자가 진료 정보와 예약을 확인하는 앱입니다. 레거시 앱을 KMP 기반으로 전환하는 과정에서 클린 아키텍처 기반의 feature·core 모듈과 비즈니스 로직을 구축했습니다.",
      chips: ["KMP", "Clean Architecture", "모듈화"],
    },
    {
      title: "건강의 신",
      meta: "Android · iOS · 자사 서비스",
      desc: "클린 아키텍처와 KMP로 모듈을 조립하는 형태의 앱입니다. 화면과 기능을 독립 모듈로 나누고, 공통 모듈의 약 80%를 직접 개발했습니다.",
      chips: ["KMP", "Clean Architecture", "모듈화"],
    },
    {
      title: "SI 프로젝트",
      meta: "Android · iOS",
      desc: "회사로 들어오는 앱 개발 의뢰를 수행했습니다. 일부 프로젝트에는 같은 KMP 모듈형 아키텍처를 적용했습니다.",
      chips: ["KMP", "SI"],
    },
    {
      title: "AI 기반 개발 자동화",
      meta: "진행 중",
      desc: "반복되는 개발 업무를 AI가 처리하는 구조를 설계하고 만들고 있습니다.",
      bullets: [
        "Slack으로 빌드와 배포를 요청하고, 배포는 Jenkins가 수행",
        "Crashlytics 크래시를 수집하고 원인 분석과 수정까지 자동 진행",
        "유닛 테스트와 UI 테스트를 AI로 작성하고 실행",
        "AI 코딩 에이전트용 하네스 구조 설계",
      ],
      chips: ["Jenkins", "Slack", "Crashlytics", "LLM"],
    },
  ],
};

export const openit = {
  company: "오픈잇",
  period: "2020.12 - 2025.04",
  duration: "4년 5개월",
  items: [
    {
      title: "트래빗 TRAVIT (React Native)",
      meta: "2023.09 - 2025.04 · 스토어 출시",
      desc: "춘천 지역 AR 스마트 안경 길 안내, 관광지 도슨트, 전기 자전거 대여 앱. 길 안내 정보를 AR 안경으로 전송하는 네이티브 모듈을 만들고, FCM 푸시와 Crashlytics 오류 모니터링 체계를 구축했습니다.",
      chips: ["React Native", "TypeScript", "Zustand", "React Query", "Firebase"],
    },
    {
      title: "트래빗 TRAVIT (Android)",
      meta: "2023.03 - 2023.11",
      desc: "관광지 정보, 실시간 길 안내, AR 안경 연동 앱. 모듈화로 빌드 시간을 줄이고, Foreground Service로 백그라운드에서도 길 안내가 끊기지 않게 했습니다.",
      chips: ["Kotlin", "MVVM", "Clean Architecture", "Hilt", "Coroutine/Flow", "Room"],
    },
    {
      title: "강원·춘천 세계태권도문화축제",
      meta: "2023.05 - 2023.08",
      desc: "강원도, 춘천시, 세계태권도연맹과 협력한 공식 행사 앱. 일정·공지 실시간 알림, 경기장·관광지 지도, 다국어를 지원했습니다.",
      chips: ["React Native", "TypeScript", "Zustand", "Firebase", "CodePush"],
    },
    {
      title: "혈압다이어리 BPdiary",
      meta: "2022.07 - 2024.08",
      desc: "건강 관리 앱의 기능 개선과 신규 기능을 맡은 장기 유지보수. 의존성이 적은 부분부터 Java를 Kotlin으로 단계적으로 옮기고, 본인 인증·다국어·체성분 차트·데이터 동기화를 개선했습니다.",
      chips: ["Java", "Kotlin", "BluetoothGatt", "Retrofit", "Hilt"],
    },
    {
      title: "트램 Tram",
      meta: "2021.08 - 2021.10",
      desc: "BLE 비콘 신호와 GPS로 트램 승차·하차·주행 상태를 판단하는 앱. 비콘 스캔과 RSSI 패턴 분석 알고리즘을 구현했습니다.",
      chips: ["Kotlin", "MVVM", "Koin", "BluetoothGatt", "FusedLocation"],
    },
    {
      title: "안면인식 어린이집 출결관리",
      meta: "2021.01 - 2021.06",
      desc: "안면인식 SDK 기반 등하원 관리 앱. 오프라인에서도 동작하는 로컬 우선 데이터 구조와 가로·세로 듀얼 레이아웃을 설계했습니다.",
      chips: ["Kotlin", "MVVM", "Koin", "RxJava", "Room", "CameraX"],
    },
  ],
};

export const firebase = [
  { title: "FCM", desc: "로또 당첨 확인, 달 이벤트 같은 푸시 알림" },
  { title: "Firestore", desc: "최신 당첨번호 등 앱 데이터 저장" },
  { title: "Remote Config", desc: "앱 배포 없이 값과 동작 조정" },
  { title: "Cloud Functions", desc: "당첨 확인·알림 발송, 관리자 API" },
  { title: "Hosting", desc: "약관·정책 페이지와 관리자 웹" },
];

export const infra = [
  {
    title: "Jenkins CI/CD",
    meta: "직접 구성·운영",
    bullets: [
      "앱 빌드와 배포, 유닛 테스트, 배포 태그 관리, 알림",
      "백엔드와 프론트엔드 배포 파이프라인",
      "빌드 실패 시 로컬 LLM이 원인을 분석하고 수정까지 시도",
      "UI 테스트 단계 추가 예정",
    ],
    chips: ["Jenkins", "Docker", "Pipeline"],
  },
  {
    title: "홈서버",
    meta: "Mac mini",
    desc: "nginx 리버스 프록시 뒤에 백엔드 API, 봇, Jenkins, 메신저를 경로별로 나눠 올리고 외부에서 접속할 수 있게 직접 운영합니다.",
    chips: ["nginx", "Docker", "PostgreSQL"],
  },
  {
    title: "Mattermost와 봇",
    meta: "자체 설치·운영",
    desc: "팀 메신저를 직접 설치해 쓰고, Claude 연동 봇과 Jenkins 알림 봇을 만들어 연결했습니다.",
    chips: ["Mattermost", "TypeScript", "Webhook"],
  },
  {
    title: "로컬 LLM",
    meta: "Ollama",
    desc: "gpt-oss, gemma, qwen, deepseek-coder 등 여러 모델을 직접 비교하고, 코딩 보조와 서비스 기능에 활용합니다.",
    bullets: [
      "서브 에이전트로 간단한 작업 위임",
      "Jenkins 실패 로그 분석",
      "예정: 유닛·UI 테스트와 헬스 체크를 24시간 반복 실행",
    ],
    chips: ["Ollama", "gpt-oss", "Gemma", "Qwen"],
  },
  {
    title: "AI 개발 하네스",
    meta: "도구 중립",
    desc: "Claude Code, Codex 등 여러 AI 코딩 도구가 같은 스킬과 에이전트를 공유하는 하네스를 설계했습니다.",
    bullets: [
      "결정적인 작업은 모델이 아니라 스크립트가 수행 (script-first)",
      "에이전트 위임은 근거가 있을 때만, 비용은 티어로 제어",
      "검증 게이트와 런타임 가드를 먼저 세우고 스킬을 쌓는 구조",
    ],
    chips: ["Claude Code", "Codex", "Skills", "Agents"],
  },
];
