import { PROFILE, careerYear } from "./config";
import { careers } from "./careers";

// 앱 아이콘은 src/assets/apps/<path>.png 가 있는 앱만 표시한다.
const appIcons = import.meta.glob("./assets/apps/*.png", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

// 공개 문서(docs-dev-notes/yunseong-apps/apps)가 있는 앱만 링크한다
const DOC_APPS = new Set(["lottomate", "lunar", "qrscanner", "diding", "moduta", "fxrate"]);

export const apps = [
  { name: "로픽", path: "lottomate", desc: "로또 번호 관리, 당첨 확인, 통계, 당첨 푸시 알림. 종이 티켓 느낌의 Paper 컴포넌트로 화면을 통일했습니다.", chips: ["Compose", "Room", "FCM"] },
  { name: "달의 위상", path: "lunar", desc: "달 위상 대시보드와 달력, 달 이벤트 알림.", chips: ["Compose", "FCM"] },
  { name: "Q-Ring", path: "qrscanner", desc: "QR 다중 스캔, 생성, 이력 관리.", chips: ["Compose"] },
  { name: "디딩", path: "diding", desc: "알람 기반 TODO·일정 관리.", chips: ["Compose"] },
  { name: "서울버스", path: "moduta", desc: "서울시 버스 실시간 정보와 지도, 서버 프록시를 거친 대기질 정보.", chips: ["Compose"] },
  { name: "환율", path: "fxrate", desc: "환율 조회와 임계값 알림, 홈 위젯.", chips: ["Compose"] },
  { name: "airTalk", path: "airtalk", desc: "카카오·네이버·이메일 로그인 채팅 앱. 최대 10명 그룹 대화, 읽음 위치 동기화, 단일 기기 로그인.", chips: ["Compose", "Firebase RTDB", "FCM"] },
].map((a) => ({ ...a, url: DOC_APPS.has(a.path) ? `${PROFILE.docsRepo}/tree/main/yunseong-apps/apps/${a.path}` : undefined, image: appIcons[`./assets/apps/${a.path}.png`] as string | undefined }));


export const lemon = {
  company: "레몬헬스케어",
  period: "2025.07 - 현재",
  items: [
    {
      title: "의료진용 업무 앱 개발·운영, KMP 고도화",
      meta: "Android · iOS · 사내 배포",
      desc: "의료진이 업무에 쓰는 내부 앱을 개발하고 운영하며, KMP 기반으로 고도화하고 있습니다. Android와 iOS를 모두 담당합니다.",
      chips: ["KMP", "Kotlin", "Compose"],
    },
    {
      title: "환자용 앱 개발·운영, KMP 고도화",
      meta: "Android · iOS · 스토어 출시",
      desc: "계약 병원을 방문하는 환자가 진료 정보와 예약을 확인하는 앱을 개발하고 운영합니다. 레거시 앱을 KMP 기반으로 고도화하면서 클린 아키텍처 기반의 feature·core 모듈과 비즈니스 로직을 구축했습니다.",
      chips: ["KMP", "Clean Architecture", "모듈화"],
    },
    {
      title: "건강의 신",
      meta: "Android · iOS · 자사 서비스",
      desc: "클린 아키텍처와 KMP로 모듈을 조립하는 형태의 앱입니다. 화면과 기능을 독립 모듈로 나누고, 공통 모듈의 약 80%를 개발했습니다.",
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
        "Crashlytics 크래시를 주기적으로 조회해 Mattermost로 알림, 원인 분석과 수정은 개발 중",
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
  items: careers.map((c) => ({
    slug: c.slug,
    title: c.title,
    meta: c.note ? `${c.period} · ${c.note}` : c.period,
    desc: c.summary,
    chips: c.chips,
  })),
};

export const firebase = [
  { title: "FCM", desc: "푸시 알림 발송과 수신 처리" },
  { title: "Firestore", desc: "앱 데이터 저장과 동기화" },
  { title: "Remote Config", desc: "앱 배포 없이 값과 동작 조정" },
  { title: "Cloud Functions", desc: "서버 로직 실행, 알림 발송, 관리자 API" },
  { title: "Hosting", desc: "약관·정책 페이지와 관리자 웹" },
];

export const infra = [
  {
    title: "Jenkins CI/CD",
    meta: "빌드·배포·검증",
    desc: "Docker로 띄운 Jenkins에서 앱 빌드부터 배포, 검증, 알림까지 하나의 파이프라인으로 처리합니다. 파이프라인 코드도 앱 코드처럼 층을 나눠 설계했습니다.",
    bullets: [
      "Checkout, Setup, Lint(minSdk 하위 호환 게이트), 빌드, Firebase 배포, 산출물 보관 단계로 구성",
      "순수 정책 층, 파일 어댑터 층, 부수효과 서비스 층으로 분리해 Jenkins 없이도 정책을 단위 테스트",
      "배포와 CI가 같은 공용 모듈을 쓰도록 정의를 하나로 묶고, 그 계약을 테스트로 고정",
      "값과 시크릿 위치는 선언형 설정 한 곳이 소유하고, 서명 정보는 자격 증명 바인딩으로만 주입",
      "알림은 사실(facts)을 먼저 조립한 뒤 발송 정책과 폴백 순서에 따라 전달",
      "배포 직전 맥 실기기 E2E, 서명 인증서 검증과 비밀값 하드코딩 탐지 게이트",
      "개발·운영 배포 모두 버전 커밋·태그와 커밋 기반 릴리스 노트를 자동 작성",
      "매일 전 앱 헬스체크 잡(유닛·E2E)과 실패 증적 수집",
      "백엔드·프론트엔드·관리자 웹·대시보드를 같은 구조의 파이프라인으로 홈서버에 자동 배포",
    ],
    chips: ["Jenkins", "Groovy", "Docker", "Pipeline as Code", "Firebase App Distribution"],
  },
  {
    title: "ChatOps (Mattermost 연동)",
    meta: "알림·명령",
    desc: "메신저를 개발 작업의 입구로 씁니다. 슬래시 명령으로 빌드를 요청하고, 빌드·배포·리뷰·수익 같은 이벤트를 한 채널에서 받습니다.",
    bullets: [
      "/deploy 배포 팝업에서 앱, 환경, 버전 증가, 브랜치를 골라 Jenkins 빌드를 실행하고, 알림의 다시 빌드 버튼으로 재실행",
      "조회 명령 /info /crash /release 와 일일 헬스 리포트",
      "Jenkins 알림을 중계하고 실패 증적을 댓글로 첨부",
      "Firebase App Distribution, GitHub 이벤트 수신 엔드포인트, Crashlytics 크래시 주기 조회 알림",
      "Google Play 리뷰와 AdMob 수익은 주기적으로 조회해 채널에 요약",
      "Claude와 Copilot에 연결한 대화형 봇 (이벤트 스트림 수신)",
      "Mattermost 메시지를 Claude Code 세션과 주고받는 MCP 채널을 구성하고, 도구 승인 요청을 DM으로 중계",
    ],
    chips: ["Mattermost", "TypeScript", "Express", "Webhook", "WebSocket"],
  },
  {
    title: "홈서버",
    meta: "Mac mini",
    desc: "하나의 리버스 프록시 뒤에 백엔드 API, 봇, CI, 메신저, 웹 대시보드를 경로별로 나눠 올리고, 외부에서도 접속할 수 있게 운영합니다.",
    bullets: [
      "정적 프론트엔드 서빙과 API 프록시를 한 서버에서 처리하고 WebSocket 업그레이드를 지원",
      "메신저·웹훅 서비스·봇·프록시 설정을 하나의 비공개 저장소로 관리하고, 스크립트 한 번으로 새 PC에 복원 (도구 설치, 메신저, 빌드, 프록시, 프로세스 관리 순서, 여러 번 실행해도 안전)",
      "프록시 설정 적용 시 검증에 실패하면 이전 설정으로 자동 복구",
      "메신저·서비스 DB와 Jenkins 일일 백업, 로그인 시 자동 시작 구성, pm2 데몬은 launchd가 직접 관리",
    ],
    chips: ["nginx", "Docker", "pm2", "launchd", "Shell"],
  },
  {
    title: "로컬 LLM",
    meta: "MLX · Gemma4",
    desc: "실제 업무 데이터 131문항을 블라인드 채점하는 벤치마크로 모델과 설정을 고르고, 모든 호출부가 명령 하나로 로컬 모델을 부릅니다.",
    bullets: [
      "Gemma4·Qwen3.5·gpt-oss 등 11개 구성을 커밋 초안, 빌드 실패 분석, 로그 장애 정리 등 8개 분야로 비교해 Gemma4 12B 6bit를 선택",
      "구글 MTP 보조 모델(투기적 디코딩)로 품질은 유지하고 생성 속도 약 1.6배, 문항당 평균 60초에서 46초로 단축",
      "하네스 위임, Jenkins 실패 알림·자동 수정, 스크립트가 모두 local-llm 명령 하나로 호출하고 모델·서버 설정은 뒷단에서만 교체",
      "도구 사용 여부, 보조 모델 블록 크기, 프롬프트 캐시를 따로 측정해 설정을 확정",
    ],
    chips: ["MLX", "Gemma4", "Speculative Decoding", "Pi", "Benchmark"],
  },
  {
    title: "AI 개발 하네스",
    meta: "도구 중립",
    desc: "Claude Code, Codex, Copilot이 같은 스킬과 에이전트를 공유하도록 설계한 개발 하네스입니다. 모델에 맡길 일과 스크립트가 할 일을 나누는 것이 핵심 원칙입니다.",
    bullets: [
      "결정적인 작업(파싱, 집계, 규칙 검증)은 모델이 아니라 스크립트가 수행",
      "에이전트 위임은 근거를 선언한 경우에만 허용하고, 선언이 없으면 린트가 막음",
      "판단 수준(티어)과 지불 예산을 다른 축으로 분리해 예산이 바뀌어도 에이전트 파일은 그대로",
      "푸시 전 검증 게이트 8단계: 구조, 티어 정합, 버전 동기화, 매니페스트, 스크립트 문법, 단위 테스트 등",
      "런타임 가드: 과금 경로 차단, 커밋 메시지 규칙, 편집 직후 정적 검사, 작업 이력 기록",
      "스킬·에이전트·스크립트의 동작을 별도 평가(evals)와 하네스 자체 테스트로 확인",
      "Firebase 보안 규칙 점검, 배포 전 게이트, 도메인 전문가 에이전트, 기술 블로그 작성 스킬",
      "직접 만든 MCP 서버로 Mattermost 작업 보고(봇 명의 고정)와 Velog 초안 작성·시리즈 관리를 에이전트에 연결",
    ],
    chips: ["Claude Code", "Codex", "Copilot", "Skills", "Agents", "Python"],
  },
  {
    title: "앱 개발 도구 체인",
    meta: "모노레포 자동화",
    desc: "앱 6개를 모노레포로 만들면서, 반복되는 일과 실수하기 쉬운 규칙을 도구로 옮겼습니다.",
    bullets: [
      "모듈과 앱 스캐폴딩 스크립트가 코드, 테스트, 문서, 모듈 등록까지 한 번에 생성",
      "의존 방향, 하드코딩 문자열, 문서 계약, 문서 속 심볼 드리프트를 검사하는 스크립트",
      "testTag 규칙과 자체 구현한 adb 기반 실기기 E2E 엔진으로 7개 앱 화면 흐름 테스트, 기기 화면 브라우저 미러링",
      "변경된 모듈만 골라 테스트하고 결과와 커버리지를 집계",
      "공개용 문서를 소스 문서에서 추려 동기화하는 스크립트",
      "전 앱 AdMob 광고(적응형 배너, 목록 행 네이티브, 종료 팝업)와 UMP 동의를 공용 모듈로 적용",
    ],
    chips: ["Gradle", "Convention Plugin", "adb", "Python", "Shell"],
  },
  {
    title: "관리자 콘솔",
    meta: "7개 앱 운영",
    desc: "7개 앱의 운영 작업을 한 곳에서 다루는 관리자 사이트입니다. 개발과 운영 환경을 골라서 다룹니다.",
    bullets: [
      "앱별·환경별 Remote Config 조회·검사·게시와 사용자가 받을 버전 확인",
      "트리거별 Cloud Functions 테스트 실행, GA4 기반 앱 사용 통계",
      "서버·화면이 같은 계약 타입과 검사기를 공유하고, 앱 등록부 항목 하나로 앱을 추가",
      "외부 접근은 Cloudflare Tunnel과 Access를 거쳐서만 받고 서버가 JWT를 전역 검증",
    ],
    chips: ["NestJS", "React", "Vite", "Firebase Admin", "Cloudflare Access"],
  },
  {
    title: "운영 대시보드",
    meta: "홈서버·앱·AI",
    desc: "홈서버 상태, 앱 헬스체크, 빌드·배포, AI 사용량을 한 화면에 모읍니다.",
    bullets: [
      "5분마다 서비스 점검, 시스템 자원·크래시·빌드 이력 표시",
      "매일 헬스체크의 앱별 유닛·E2E 결과와 아침 리포트 연동",
      "Jenkins 빌드·배포 잡 연결, 자격증명 만료 임박 알림",
      "Claude·Copilot 사용량 집계",
    ],
    chips: ["NestJS", "React", "pm2", "Jenkins API"],
  },
];

export const automations = [
  { title: "앱 빌드·배포", desc: "Mattermost 슬래시 명령으로 모듈, 빌드 유형, 환경을 지정해 Jenkins 빌드를 실행하고 Firebase로 배포합니다.", wip: false },
  { title: "배포 태그 관리", desc: "배포 버전 태그를 자동으로 남기고 관리합니다.", wip: false },
  { title: "유닛 테스트 자동 실행", desc: "빌드와 함께 유닛 테스트를 돌려 결과를 확인합니다.", wip: false },
  { title: "백엔드·프론트엔드 배포", desc: "서버와 웹 배포를 파이프라인으로 처리합니다.", wip: false },
  { title: "빌드 결과 알림", desc: "빌드 결과를 사실 데이터로 조립해 정책과 폴백 순서에 따라 Mattermost 등으로 알립니다.", wip: false },
  { title: "빌드 실패 분석·수정", desc: "실패 로그를 로컬 LLM이 분석하고 수정을 시도합니다.", wip: false },
  { title: "크래시 감지·알림·수정", desc: "Crashlytics API를 주기적으로 조회해 신규·재발·급증 크래시를 Mattermost로 알립니다. 앱 생성 시 Firebase 프로젝트와 알림 연결도 함께 처리합니다. 원인 분석과 수정 PR 초안 생성은 개발 중입니다.", wip: true },
  { title: "UI 테스트 자동화", desc: "adb 기반 실기기 E2E로 7개 앱 화면 흐름을 배포 직전과 매일 헬스체크에서 자동으로 실행합니다.", wip: false },
  { title: "릴리스 노트 자동 작성", desc: "배포마다 커밋을 모아 릴리스 노트를 자동으로 쓰고 버전 태그와 함께 남깁니다.", wip: false },
  { title: "매일 헬스체크", desc: "전 앱 유닛·E2E 테스트를 매일 돌려 결과를 대시보드와 Mattermost 아침 리포트로 보냅니다.", wip: false },
];


export const stats = [
  { num: `${careerYear()}년차`, label: "모바일 앱 개발자" },
  { num: "7개", label: "Side Projects" },
  { num: `${automations.length}개`, label: "자동화 프로세스" },
  // 임시: ai-harness 의 skills/ + agents/ 를 센 값(2026-10-24, 스킬 22·에이전트 20). 갱신 방법은 추후 결정
  { num: "42개", label: "AI 스킬·에이전트" },
];
