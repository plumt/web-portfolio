export const SITE_TITLE = '이윤성 | 모바일 앱 개발자';
export const SITE_DESCRIPTION = '모바일 앱의 기획부터 배포·운영까지 책임지며, AI 개발 자동화로 반복 업무를 줄이는 모바일 앱 개발자 이윤성의 포트폴리오입니다.';
export const GENERATE_SLUG_FROM_TITLE = true
export const TRANSITION_API = false

// 경력 시작일(첫 입사). 연차는 빌드 시점에 이 날짜로 계산한다.
export const CAREER_START = new Date('2020-12-01');
export function careerYear(now: Date = new Date()): number {
  let years = now.getFullYear() - CAREER_START.getFullYear();
  const beforeAnniversary =
    now.getMonth() < CAREER_START.getMonth() ||
    (now.getMonth() === CAREER_START.getMonth() && now.getDate() < CAREER_START.getDate());
  if (beforeAnniversary) years -= 1;
  return years + 1;
}

export const PROFILE = {
  name: '이윤성',
  email: 'dldbstjd3210@naver.com',
  github: 'https://github.com/plumt',
  velog: 'https://velog.yslee.kr',
  notion: 'https://notion.yslee.kr',
  docsRepo: 'https://github.com/plumt/docs-dev-notes',
};
